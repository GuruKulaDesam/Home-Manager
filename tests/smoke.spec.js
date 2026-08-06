const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const app = 'http://127.0.0.1:8765/';

test.beforeEach(async ({ page }) => {
  await page.goto(app);
  await page.evaluate(async () => {
    localStorage.clear();
    await new Promise(resolve => {
      const request = indexedDB.deleteDatabase('home-manager-books-v1');
      request.onsuccess = request.onerror = request.onblocked = () => resolve();
    });
  });
  await page.reload();
});

test('offline assistant selects safe domain roles and ships its local runtime', async ({ page }) => {
  await expect.poll(() => page.evaluate(() => Boolean(window.HomeAI))).toBe(true);
  await page.click('#offlineAssistant');
  await expect(page.locator('#offlineAiContext')).toHaveText('TODAY · PRIVATE');
  await page.click('[data-close-dialog="offlineAiDialog"]');

  await page.evaluate(() => { location.hash = '#/home/finance'; });
  await page.click('#offlineAssistant');
  await expect(page.locator('#offlineAiContext')).toHaveText('MONEY · EXPLANATION ONLY');
  await expect(page.locator('#offlineAiSuggestions')).toContainText('budget variance');
  await page.click('[data-close-dialog="offlineAiDialog"]');

  await page.evaluate(() => { location.hash = '#/home/life/medicines'; });
  await page.click('#offlineAssistant');
  await expect(page.locator('#offlineAiContext')).toHaveText('CARE · NO DIAGNOSIS');
  await expect(page.locator('#offlineAiBoundary')).toContainText('Review suggestions');

  const wasm = await page.request.get(`${app}vendor/wllama/esm/wasm/wllama.wasm`);
  const model = await page.request.head(`${app}assets/models/home-assistant-smollm2-360m-q8_0.gguf`);
  expect(wasm.ok()).toBeTruthy();
  expect(model.ok()).toBeTruthy();
});

test('learning planner combines an in-place week calendar with a movable Kanban', async ({ page }) => {
  await page.goto(`${app}#/study/planner`);
  await expect(page.locator('.study-week-calendar > section')).toHaveCount(7);
  await expect(page.locator('.study-plan-column')).toHaveCount(3);

  const firstDate = await page.locator('.study-week-calendar > section').first().locator('[data-date]').first().getAttribute('data-date');
  const browserToday = await page.evaluate(() => { const value = new Date(); return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`; });
  expect(firstDate).toBe(browserToday);
  await page.locator('.study-week-calendar > section').first().locator('[data-date]').first().click();
  await expect(page.locator('#formDialog')).toBeVisible();
  await expect(page.locator('#entityForm [name="date"]')).toHaveValue(firstDate);
  await page.locator('[data-close-dialog="formDialog"]').first().click();

  const plannedCard = page.locator('.study-plan-column.planned .study-plan-card').first();
  if (await plannedCard.count()) {
    const id = await plannedCard.getAttribute('data-study-plan');
    await plannedCard.locator(`[data-plan-move="${id}"][data-status="done"]`).click();
    await expect(page.locator(`.study-plan-column.done [data-study-plan="${id}"]`)).toBeVisible();
  }

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test('all non-learning suites render without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const routes = [
    ['global/overview', 'Today'],
    ['global/intelligence', 'Inbox Intelligence'],
    ['home/overview', 'Home Overview'],
    ['home/family', 'Family'],
    ['home/family/protection', 'Protection & Legacy'],
    ['home/care', 'Care Overview'],
    ['home/finance', 'Money Overview'],
    ['community/overview', 'Community Overview']
  ];
  for (const [route, title] of routes) {
    await page.goto(`${app}#/${route}`);
    await expect(page.locator('#pageTitle')).toHaveText(title);
    await expect(page.locator('#content')).not.toBeEmpty();
  }
  expect(errors).toEqual([]);
});

test('Munnar sunrise is the default and another background choice still persists', async ({ page }) => {
  await page.goto(`${app}#/global/overview`);
  await expect(page.locator('body')).toHaveAttribute('data-nature', 'sunrise');
  const surfaceTokens = await page.evaluate(() => ({
    glass: getComputedStyle(document.documentElement).getPropertyValue('--glass').trim(),
    shell: getComputedStyle(document.body).getPropertyValue('--shell-bg').trim()
  }));
  expect(surfaceTokens.glass).toContain('.93');
  expect(surfaceTokens.shell).toContain('.94');

  await page.goto(`${app}#/settings/app`);
  await page.locator('[name="appBackground"][value="waterfall"]').check({ force: true });
  await expect(page.locator('body')).toHaveAttribute('data-nature', 'waterfall');
  await page.reload();
  await expect(page.locator('body')).toHaveAttribute('data-nature', 'waterfall');
});

test('Family and Care expose at most seven clear child routes', async ({ page }) => {
  await page.goto(`${app}#/home/family`);
  await expect(page.locator('#sectionNav button')).toHaveCount(7);
  await page.goto(`${app}#/home/care`);
  await expect(page.locator('#sectionNav button')).toHaveCount(7);
  await expect(page.locator('#sectionNav')).toContainText('Medicines');
  await expect(page.locator('#sectionNav')).toContainText('Elder care');
});

test('medicine entry stays in Medicines and remains searchable', async ({ page }) => {
  await page.goto(`${app}#/home/life/medicines`);
  await page.getByRole('button', { name: /Add medicine plan/i }).first().click();
  await expect(page.locator('#formTitle')).toHaveText('Add medicine plan');
  await page.locator('[name="title"]').fill('Vitamin D refill');
  await page.locator('[name="owner"]').fill('Mother');
  await page.locator('[name="dueDate"]').fill('2026-08-20');
  await page.locator('[name="frequency"]').selectOption('Monthly');
  await page.locator('[name="status"]').selectOption('active');
  await page.getByRole('button', { name: 'Save item' }).click();
  await expect(page.locator('#content')).toContainText('Vitamin D refill');
  const storedDomain = await page.evaluate(() => HM.data.state.lifeRecords.find(item => item.title === 'Vitamin D refill')?.domain);
  expect(storedDomain).toBe('medicines');
  await page.locator('#globalSearch').click();
  await page.locator('#searchInput').fill('Vitamin D');
  await expect(page.locator('#searchResults')).toContainText('Vitamin D refill');
});

test('Care entry points open the correct domain-specific drawer', async ({ page }) => {
  await page.goto(`${app}#/home/care`);
  await page.getByRole('button', { name: /Appointment Add to/i }).click();
  await expect(page.locator('#formTitle')).toHaveText('Add appointment');
  await expect(page.locator('[name="category"] option')).toHaveCount(6);
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: /Elder support Add to/i }).click();
  await expect(page.locator('#formTitle')).toHaveText('Add care plan');
});

test('four family perspectives can reach their primary answer', async ({ page }) => {
  await page.goto(`${app}#/home/overview`);
  await expect(page.getByRole('heading', { name: 'Run the home next' })).toBeVisible();
  await expect(page.locator('#content').getByRole('button', { name: /Food & supplies/i })).toBeVisible();

  await page.goto(`${app}#/home/finance`);
  await expect(page.getByText('Consolidated reporting only')).toBeVisible();
  await expect(page.locator('#content [data-create]')).toHaveCount(0);

  await page.goto(`${app}#/home/family`);
  await expect(page.locator('#content').getByRole('button', { name: /Shared calendar/i })).toBeVisible();
  await expect(page.locator('#content').getByRole('button', { name: /Protection & legacy/i })).toBeVisible();

  await page.goto(`${app}#/home/care`);
  await page.locator('#emergency').click();
  await expect(page.locator('#emergencyDialog')).toContainText('112');
  await expect(page.locator('#emergencyDialog')).toContainText('Home Manager does not dispatch assistance');
});

test('mobile Care page has no horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${app}#/home/care`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Class 7 and Class 12 have separate official textbook libraries', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  await expect(page.locator('#pageTitle')).toHaveText('Books');
  await expect(page.locator('.subject-tabs button')).toHaveCount(5);
  await expect(page.locator('[data-book-card]')).toHaveCount(1);
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/lemh1\/lemh101\.pdf/);

  await page.locator('[data-learner="p4"]').click();
  await expect(page.locator('.subject-tabs button')).toHaveCount(7);
  await expect(page.locator('[data-book-card]')).toHaveCount(1);
  await expect(page.locator('#content')).toContainText('Ganita Prakash Part I');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-7\/gegp1\/gegp1ps\.pdf/);
  await expect(page.locator('[data-inline-book-part] option')).toHaveCount(9);
  await expect(page.locator('[data-book-state]')).toContainText('Bundled offline');
});

test('every declared offline textbook section is a real local PDF', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  const sections = await page.evaluate(() => HM.views.textbookCatalog.flatMap(book => (book.pdfFiles || []).map(part => ({ book: book.title, url: part.url }))));
  expect(sections).toHaveLength(165);
  for (const section of sections) {
    const file = path.join(process.cwd(), ...section.url.split('/'));
    expect(fs.existsSync(file), `${section.book}: ${section.url}`).toBe(true);
    const descriptor = fs.openSync(file, 'r');
    const header = Buffer.alloc(4);
    fs.readSync(descriptor, header, 0, 4, 0);
    fs.closeSync(descriptor);
    expect(header.toString(), `${section.book}: ${section.url}`).toBe('%PDF');
    expect(fs.statSync(file).size, `${section.book}: ${section.url}`).toBeGreaterThan(10_000);
  }
});

test('Learning pages use persistent subject tabs and show CBSE and JEE readiness', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  await expect(page.locator('.learning-section-tabs button')).toHaveCount(7);
  await expect(page.locator('.learning-track-tabs')).toContainText('CBSE');
  await expect(page.locator('.learning-track-tabs')).toContainText('JEE Main');
  await expect(page.locator('#headerKpis')).toBeHidden();
  await expect(page.locator('#sectionNav')).toBeVisible();
  await expect(page.locator('.subject-tabs')).toContainText('Physics');
  const tabOrder = await page.evaluate(() => ({ subjects: document.querySelector('.subject-tabs').getBoundingClientRect().top, activities: document.querySelector('.learning-section-tabs').getBoundingClientRect().top }));
  expect(tabOrder.subjects).toBeLessThan(tabOrder.activities);
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await expect(page.locator('[data-book-card]')).toHaveCount(1);
  await expect(page.locator('.book-volume-tabs button')).toHaveCount(2);
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph101\.pdf/);
  await expect(page.locator('[data-book-card="g12-physics-1"] [data-book-state]')).toContainText('Bundled offline');
  await page.locator('[data-book-open="g12-physics-1"]').click();
  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookPart option')).toHaveCount(10);
  await expect(page.locator('#bookFrame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph101\.pdf/);
  await page.locator('#bookReaderDialog [data-close-dialog]').click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Physics', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await page.goto(`${app}#/study/reports`);
  await expect(page.getByRole('button', { name: 'Physics', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.exam-track')).toHaveCount(2);
  await expect(page.locator('.exam-readiness-grid')).toContainText('CBSE Class XII readiness');
  await expect(page.locator('.exam-readiness-grid')).toContainText('JEE Main readiness');
});

test('Class 12 and Class 7 learning tabs keep books and curriculum focused', async ({ page }) => {
  for (const learnerId of ['p3', 'p4']) {
    await page.goto(`${app}#/study/books`);
    await page.locator(`[data-learner="${learnerId}"]`).click();
    await expect(page.locator('.learning-section-tabs button')).toHaveCount(7);
    await expect(page.locator('.inline-book-reader')).toBeVisible();
    await expect(page.locator('.curriculum-summary')).toBeHidden();
    await expect(page.locator('.reflection-grid')).toHaveCount(0);

    await page.goto(`${app}#/study/curriculum`);
    await expect(page.locator('.textbook-section')).toBeHidden();
    await expect(page.locator('.curriculum-summary')).toBeVisible();

    await page.getByRole('button', { name: 'Assignments', exact: true }).click();
    await expect(page.locator('.learning-integrations')).not.toHaveAttribute('open', '');
  }
});

test('Genius Mind provides subject and chapter-specific recall guidance', async ({ page }) => {
  await page.goto(`${app}#/study/genius`);
  await expect(page.locator('#pageTitle')).toHaveText('Genius Mind');
  await expect(page.locator('.genius-teach-panel')).toContainText('THE IDEA THAT UNLOCKS THE CHAPTER');
  await page.getByRole('button', { name: 'Chemistry', exact: true }).click();
  await expect(page.locator('.genius-lessons > button')).toHaveCount(10);
  await page.getByRole('button', { name: /Electrochemistry/ }).click();
  await expect(page.locator('.genius-teach-panel')).toContainText('Nernst');
  await page.locator('[data-genius-section="notes"]').click();
  await page.locator('[data-genius-note]').fill('Nernst quotient: write the balanced cell reaction before Q.');
  await page.locator('[data-genius-note-save]').click();
  await page.getByRole('button', { name: /Solutions/ }).click();
  await page.getByRole('button', { name: /Electrochemistry/ }).click();
  await expect(page.locator('[data-genius-note]')).toHaveValue('Nernst quotient: write the balanced cell reaction before Q.');
  await page.locator('[data-genius-section="exam"]').click();
  await expect(page.locator('.genius-teach-panel')).toContainText('MARK-LOSING TRAPS');
  await page.locator('[data-genius-section="test"]').click();
  await expect(page.locator('.genius-check-list details')).toHaveCount(3);

  await page.locator('[data-learner="p4"]').click();
  await page.getByRole('button', { name: 'Science', exact: true }).click();
  await expect(page.locator('.genius-lessons > button')).toHaveCount(10);
  await page.getByRole('button', { name: /Heat and temperature/ }).click();
  await expect(page.locator('.genius-teach-panel')).toContainText('Science explains an observation');
});

test('Genius Mind adds a chapter-wise JEE Main workflow for Class 12 PCM', async ({ page }) => {
  await page.goto(`${app}#/study/jee`);
  await expect(page.locator('#pageTitle')).toHaveText('JEE Main');
  await expect(page.locator('.subject-master-tabs button.active')).toHaveText('Physics');
  await expect(page.locator('.subject-master-tabs button')).toHaveCount(3);
  await expect(page.locator('.genius-lessons > button')).toHaveCount(20);
  await page.locator('[data-genius-lesson]').filter({ hasText: 'Kinematics' }).click();
  await expect(page.locator('.genius-teach-panel')).toContainText('motion graphs and relative motion');
  await expect(page.locator('.genius-teach-panel')).toContainText('KEY CONCEPTS');
  await expect(page.locator('.teacher-talk')).toContainText('Position, velocity and acceleration are three different stories');
  await expect(page.locator('.genius-teacher-hero')).toHaveCount(0);
  await page.locator('[data-genius-section="worked"]').click();
  await expect(page.locator('#content')).toContainText('TIMED DRILL');
  await expect(page.locator('#content')).toContainText('ERROR LOG');
  await expect(page.locator('.genius-source-drawer')).toContainText('Official JEE Main syllabus');
  await page.locator('[data-learning-subject="Chemistry"]').click();
  await expect(page.locator('.genius-lessons > button')).toHaveCount(20);
  await page.locator('[data-genius-lesson]').filter({ hasText: 'Electrochemistry' }).click();
  await page.locator('[data-genius-section="understand"]').click();
  await expect(page.locator('.genius-teach-panel')).toContainText('Nernst');
  await page.locator('[data-genius-section="exam"]').click();
  await expect(page.locator('.genius-teach-panel')).toContainText('NCERT exception');
  await page.locator('[data-learning-subject="Mathematics"]').click();
  await expect(page.locator('.genius-lessons > button')).toHaveCount(14);
  await page.locator('[data-genius-lesson]').filter({ hasText: 'Complex Numbers' }).click();
  await page.locator('[data-genius-section="understand"]').click();
  await expect(page.locator('.genius-teach-panel')).toContainText('Argand plane');
});

test('Practice and assessments are one chapter-based MCQ workspace', async ({ page }) => {
  await page.goto(`${app}#/study/practice`);
  await expect(page.locator('.learning-section-tabs')).toContainText('Practice & Tests');
  await expect(page.locator('.mcq-question')).toContainText('no inverse function');
  await page.locator('[data-mcq-answer="0"]').click();
  await expect(page.locator('.mcq-feedback')).toContainText('Repair this exact idea');
  await expect(page.locator('.mcq-option.correct')).toContainText('not one-to-one');
  await page.locator('[data-mcq-next]').click();
  await expect(page.locator('.mcq-stage')).toContainText('Question 2 of 3');
  await expect(page.locator('.assessment-drawer')).toContainText('School assessments and mock-test record');
  await page.goto(`${app}#/study/assessments`);
  await expect(page.locator('.mcq-workspace')).toBeVisible();
});

test('the supplied unified Class 7 Tamil book is bundled as one real offline PDF', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  await page.locator('[data-learner="p4"]').click();
  await page.getByRole('button', { name: 'Tamil', exact: true }).click();
  await expect(page.locator('#content')).toContainText('Class 7 Tamil — Complete Book');
  await expect(page.locator('[data-inline-book-part] option')).toHaveCount(1);
  await expect(page.locator('[data-inline-book-part]')).toContainText('Complete book — 2024 revised edition');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /tamil7-cbse-complete\.pdf/);
  await expect(page.locator('[data-book-card="g7-tamil"] [data-book-state]')).toContainText('Bundled offline - 1 sections');
  await page.locator('[data-book-open="g7-tamil"]').click();
  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookReaderTitle')).toHaveText('Class 7 Tamil — Complete Book');
});

test('textbook library and reader fit a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${app}#/study/books`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator('.inline-book-reader')).toBeVisible();
  await expect(page.locator('.inline-book-frame')).toBeVisible();
});

test('four Google accounts authorize and sync directly without a connector', async ({ page }) => {
  let activeGmailDetails = 0;
  let maxGmailDetails = 0;
  const gmailAttempts = new Map();
  await page.route('https://accounts.google.com/gsi/client', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.route('https://openidconnect.googleapis.com/v1/userinfo', route => {
    const email = route.request().headers().authorization.replace('Bearer token:', '');
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ email }) });
  });
  await page.route('https://www.googleapis.com/calendar/v3/calendars/primary/events**', route => {
    const email = route.request().headers().authorization.replace('Bearer token:', '');
    const items = email === 'father@example.com' ? [{ id: 'cal-1', updated: '2026-08-05T08:00:00Z', summary: 'Family train booking', description: 'Journey departs on 12 August', start: { dateTime: '2026-08-12T09:00:00Z' }, status: 'confirmed' }] : [];
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items }) });
  });
  await page.route('https://gmail.googleapis.com/gmail/v1/users/me/messages**', route => {
    const request = route.request();
    const email = request.headers().authorization.replace('Bearer token:', '');
    const url = new URL(request.url());
    if (url.pathname.endsWith('/messages')) {
      const secondPage = url.searchParams.get('pageToken') === 'page-2';
      const messages = email !== 'mother@example.com' ? [] : Array.from({ length: secondPage ? 4 : 5 }, (_, index) => ({ id: `gmail-${index + (secondPage ? 6 : 1)}` }));
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ messages, nextPageToken: email === 'mother@example.com' && !secondPage ? 'page-2' : undefined }) });
    }
    const messageId = url.pathname.split('/').pop();
    const attempt = (gmailAttempts.get(messageId) || 0) + 1;
    gmailAttempts.set(messageId, attempt);
    if (messageId === 'gmail-1' && attempt === 1) return route.fulfill({ status: 429, headers: { 'Retry-After': '0' }, contentType: 'application/json', body: JSON.stringify({ error: { message: 'Too many concurrent requests' } }) });
    activeGmailDetails += 1;
    maxGmailDetails = Math.max(maxGmailDetails, activeGmailDetails);
    return new Promise(resolve => setTimeout(resolve, 20)).then(() => {
      activeGmailDetails -= 1;
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: messageId, internalDate: '1785920400000', snippet: 'Class 7 exam timetable and fee Rs 2,500 due 12 August 2026', payload: { headers: [{ name: 'Subject', value: `School exam timetable ${messageId}` }, { name: 'From', value: 'Peepal School' }] } }) });
    });
  });
  await page.goto(`${app}#/settings/app`);
  await page.evaluate(() => {
    window.google = { accounts: { oauth2: {
      initTokenClient: config => ({ requestAccessToken: () => setTimeout(() => config.callback({ access_token: `token:${config.login_hint}`, expires_in: 3600 }), 0) }),
      revoke: () => {}
    } } };
  });
  await page.locator('#googleClientId').fill('123456789-example.apps.googleusercontent.com');
  const familyEmails = ['father@example.com', 'mother@example.com', 'ananya@example.com', 'arjun@example.com'];
  for (let index = 0; index < familyEmails.length; index += 1) {
    const row = page.locator(`[data-google-account="google-${index + 1}"]`);
    await row.locator('[data-google-email]').fill(familyEmails[index]);
    await row.locator('[data-google-consent]').check();
  }
  await page.locator('#googleSyncSettings button[type="submit"]').click();
  for (let index = 0; index < familyEmails.length; index += 1) {
    const row = page.locator(`[data-google-account="google-${index + 1}"]`);
    await row.locator('[data-google-connect]').click();
    await expect(row).toContainText('Gmail sync active');
  }
  await expect(page.locator('#googleSyncSettings')).toContainText('4 active this session');
  await expect(page.locator('[data-google-sync]')).toContainText('Sync all accounts');
  await page.locator('[data-google-sync]').click();
  await expect.poll(() => page.evaluate(() => HM.data.state.syncSuggestions.length)).toBe(10);
  await expect(page.locator('.integration-queue')).toContainText('0 pending');
  expect(maxGmailDetails).toBeLessThanOrEqual(3);
  expect(gmailAttempts.get('gmail-1')).toBe(2);
  await page.goto(`${app}#/global/intelligence`);
  await expect.poll(() => page.evaluate(() => HM.data.state.settings.googleSync.accounts.length)).toBe(4);
  await expect(page.locator('.inbox-history tbody tr')).toHaveCount(9);
  await expect(page.locator('.inbox-metrics')).toContainText('9');
  await expect(page.locator('.inbox-history')).toContainText('Action 12 Aug');
  await expect(page.locator('.inbox-history')).toContainText('₹2,500');
  await page.locator('[data-category-filter]').selectOption('school');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(9);
  await page.locator('[data-filter]').fill('gmail-9');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(1);
  await page.locator('[data-filter]').fill('');
  await page.locator('[data-status-filter]').selectOption('applied');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(9);
  const appliedSchoolEvent = await page.evaluate(() => HM.data.state.events.find(item => item.title.includes('School exam timetable')));
  expect(appliedSchoolEvent.startAt).toContain('2026-08-12');
  await page.goto(`${app}#/home/money/reports`);
  await expect(page.locator('.module-inbox-brief')).toContainText('Bills, payments and renewals');
  await page.goto(`${app}#/study/reports`);
  await expect(page.locator('.module-inbox-brief')).toContainText('Parent decisions from school messages');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${app}#/global/intelligence`);
  const intelligenceOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(intelligenceOverflow).toBeLessThanOrEqual(1);
  const accounts = await page.evaluate(() => HM.data.state.settings.googleSync.accounts.map(account => ({ personId: account.personId, status: account.status })));
  expect(accounts).toEqual([
    { personId: 'p1', status: 'connected' },
    { personId: 'p2', status: 'connected' },
    { personId: 'p3', status: 'connected' },
    { personId: 'p4', status: 'connected' }
  ]);
});

test('Android SMS backup excludes OTPs and auto-applies trusted family updates', async ({ page }) => {
  await page.goto(`${app}#/settings/app`);
  await expect(page.getByRole('link', { name: 'Download Android APK' })).toHaveAttribute('href', 'assets/downloads/our-divine-nest-sms.apk');
  await page.locator('#smsConsent').check();
  await page.locator('#phoneSmsSettings button[type="submit"]').click();
  const smsXml = `<?xml version="1.0" encoding="UTF-8"?><smses count="4">
    <sms address="TNEB" date="1785920400000" body="Electricity bill Rs. 1,850 due for account 1234567890" contact_name="Power provider" />
    <sms address="PEEPAL" date="1785924000000" body="School exam timetable is published for Class 7" contact_name="Peepal School" />
    <sms address="COURIER" date="1785927600000" body="Your order is out for delivery today" contact_name="Courier" />
    <sms address="BANK" date="1785931200000" body="Your OTP is 874221 and expires in 5 minutes" contact_name="Bank" />
  </smses>`;
  await page.locator('#smsImport').setInputFiles({ name: 'phone-sms.xml', mimeType: 'application/xml', buffer: Buffer.from(smsXml) });
  await expect.poll(() => page.evaluate(() => HM.data.state.settings.phoneSms.importedCount)).toBe(4);
  await expect(page.locator('.integration-queue')).toContainText('0 pending');
  await expect(page.locator('.integration-queue')).not.toContainText('874221');
  const imported = await page.evaluate(() => ({
    sms: HM.data.state.settings.phoneSms.importedCount,
    bill: HM.data.state.lifeRecords.find(item => item.domain === 'bills' && item.provider === 'Power provider'),
    pending: HM.data.state.syncSuggestions.filter(item => item.status === 'pending').length,
    billSummary: HM.data.state.syncSuggestions.find(item => item.source === 'sms' && item.category === 'bills')?.summary
  }));
  expect(imported.sms).toBe(4);
  expect(imported.bill).toMatchObject({ domain: 'bills', amount: 1850, status: 'pending' });
  expect(imported.pending).toBe(0);
  expect(imported.billSummary).toContain('...7890');
});

test('Google Workspace tools live in the family modules that own them', async ({ page }) => {
  await page.goto(`${app}#/settings/app`);
  await page.evaluate(() => {
    HM.data.state.settings.googleSync.clientId = '123456789-example.apps.googleusercontent.com';
    HM.data.state.settings.googleSync.accounts = [{ slotId: 'google-1', personId: 'p1', email: 'father@example.com', consent: true, status: 'pending', lastSync: '' }];
    HM.data.save();
  });

  const routes = [
    ['home/tasks', 'tasks', 'Google Tasks'],
    ['home/calendar', 'calendar', 'Google Calendar & Meet'],
    ['home/life/documents', 'drive', 'Family documents in Drive'],
    ['home/directory', 'contacts', 'Google Contacts'],
    ['home/money/reports', 'sheets', 'Google Sheets report'],
    ['home/wisdom', 'docs', 'Google Docs family book'],
    ['study/assignments', 'classroom', 'Google Classroom'],
    ['study/assignments', 'slides', 'Google Slides project deck']
  ];
  for (const [route, service, heading] of routes) {
    await page.goto(`${app}#/${route}`);
    await expect(page.locator(`[data-google-service="${service}"]`)).toContainText(heading);
  }

  await page.goto(`${app}#/global/overview`);
  await page.locator('[data-google-note-text]').fill('Confirm the school transport timing');
  await page.locator('[data-google-action="note-add"]').click();
  await expect(page.locator('[data-google-service="notes"]')).toContainText('Confirm the school transport timing');
  expect(await page.evaluate(() => HM.data.state.quickNotes.length)).toBe(1);

  await page.goto(`${app}#/settings/app`);
  await expect(page.locator('#googleSyncSettings')).toContainText('Family account mapping');
  await expect(page.locator('#googleSyncSettings')).not.toContainText('10-in-1');
});

test('Calendar creates a real Google event with an optional Meet conference', async ({ page }) => {
  let createRequest;
  await page.route('https://accounts.google.com/gsi/client', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.route('https://openidconnect.googleapis.com/v1/userinfo', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ email: 'father@example.com' }) }));
  await page.route('https://www.googleapis.com/calendar/v3/calendars/primary/events**', async route => {
    if (route.request().method() === 'POST') {
      createRequest = { url: route.request().url(), body: route.request().postDataJSON() };
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'event-1', summary: createRequest.body.summary, start: createRequest.body.start, hangoutLink: 'https://meet.google.com/abc-defg-hij' }) });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [] }) });
  });
  await page.goto(`${app}#/home/calendar`);
  await page.evaluate(() => {
    HM.data.state.settings.googleSync.clientId = '123456789-example.apps.googleusercontent.com';
    HM.data.state.settings.googleSync.accounts = [{ slotId: 'google-1', personId: 'p1', email: 'father@example.com', consent: true, status: 'pending', lastSync: '' }];
    HM.data.save();
  });
  await page.reload();
  await page.evaluate(() => { window.google = { accounts: { oauth2: { initTokenClient: config => ({ requestAccessToken: () => config.callback({ access_token: 'calendar-token', expires_in: 3600 }) }), revoke: () => {} } } }; });
  await page.locator('[data-google-event-title]').fill('Family study review');
  await page.locator('[data-google-event-start]').fill('2026-08-10T18:30');
  await page.locator('[data-google-action="calendar-meet"]').click();
  await expect(page.locator('[data-google-service="calendar"]')).toContainText('Meet ready');
  expect(createRequest.url).toContain('conferenceDataVersion=1');
  expect(createRequest.body.summary).toBe('Family study review');
  expect(createRequest.body.conferenceData.createRequest.conferenceSolutionKey.type).toBe('hangoutsMeet');
});

test('Contacts and Tasks review Google data before importing local records', async ({ page }) => {
  await page.route('https://accounts.google.com/gsi/client', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.route('https://openidconnect.googleapis.com/v1/userinfo', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ email: 'mother@example.com' }) }));
  await page.route('https://people.googleapis.com/v1/people/me/connections**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ connections: [{ resourceName: 'people/1', names: [{ displayName: 'School Office' }], emailAddresses: [{ value: 'office@school.test' }], phoneNumbers: [{ value: '+91 422 123 4567' }], organizations: [{ name: 'Peepal Prodigy School' }] }] }) }));
  await page.route('https://tasks.googleapis.com/tasks/v1/users/@me/lists**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [{ id: 'list-1', title: 'Family' }] }) }));
  await page.route('https://tasks.googleapis.com/tasks/v1/lists/list-1/tasks**', route => {
    if (route.request().method() === 'PATCH') return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'gt-1', title: 'Renew library card', status: 'completed' }) });
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [{ id: 'gt-1', title: 'Renew library card', status: 'needsAction', due: '2026-08-15T00:00:00.000Z' }] }) });
  });
  await page.goto(`${app}#/settings/app`);
  await page.evaluate(() => {
    HM.data.state.settings.googleSync.clientId = '123456789-example.apps.googleusercontent.com';
    HM.data.state.settings.googleSync.accounts = [{ slotId: 'google-2', personId: 'p2', email: 'mother@example.com', consent: true, status: 'pending', lastSync: '' }];
    HM.data.save();
  });
  await page.reload();
  await page.evaluate(() => { window.google = { accounts: { oauth2: { initTokenClient: config => ({ requestAccessToken: () => config.callback({ access_token: 'workspace-token', expires_in: 3600 }) }), revoke: () => {} } } }; });

  await page.goto(`${app}#/home/directory`);
  await page.locator('[data-google-action="contacts-list"]').click();
  await expect(page.locator('[data-google-service="contacts"]')).toContainText('School Office');
  await page.locator('[data-google-action="contact-import"]').click();
  await expect(page.locator('#content')).toContainText('Peepal Prodigy School');
  expect(await page.evaluate(() => HM.data.state.contacts.some(contact => contact.email === 'office@school.test'))).toBe(true);

  await page.goto(`${app}#/home/tasks`);
  await page.locator('[data-google-action="tasks-list"]').click();
  await expect(page.locator('[data-google-service="tasks"]')).toContainText('Renew library card');
  await page.locator('[data-google-action="task-import"]').click();
  await expect(page.locator('#content')).toContainText('Renew library card');
  expect(await page.evaluate(() => HM.data.state.tasks.some(task => task.googleTaskId === 'gt-1' && task.assignee === 'Mother'))).toBe(true);
});
