const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const app = 'http://127.0.0.1:8765/';

async function choosePersona(page, personaId) {
  if (await page.locator('#personaSwitcher').getAttribute('aria-expanded') !== 'true') {
    await page.locator('#personaSwitcher').click();
  }
  await page.locator(`#personaMenu [data-persona="${personaId}"]`).click();
}

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

test('household identity drives the shell, map link and browser title', async ({ page }) => {
  await expect(page.locator('#brandName')).toHaveText('Lotus Naga Home');
  await expect(page.locator('#brandAddress')).toHaveText('32 SSS Jaya Enclave, Kovaipudur, Coimbatore, 641042');
  await expect(page.locator('#brandAddress')).toHaveAttribute('href', /google\.com\/maps\/search/);
  await expect(page).toHaveTitle('Today - Lotus Naga Home');
  const shellSurface = await page.evaluate(() => ({
    body: getComputedStyle(document.body).backgroundImage,
    sidebar: getComputedStyle(document.querySelector('#sidebar')).backgroundImage,
    header: getComputedStyle(document.querySelector('.app-header')).backgroundImage,
    headerBlur: getComputedStyle(document.querySelector('.app-header')).backdropFilter,
    utility: getComputedStyle(document.querySelector('#utilityRail')).backgroundImage,
    contentInset: {
      top: getComputedStyle(document.body, '::after').top,
      right: getComputedStyle(document.body, '::after').right,
      left: getComputedStyle(document.body, '::after').left,
      radius: getComputedStyle(document.body, '::after').borderTopLeftRadius
    },
    title: getComputedStyle(document.querySelector('#pageTitle')).color
  }));
  expect(shellSurface.body).toContain('radial-gradient');
  expect(shellSurface.sidebar).toBe('none');
  expect(shellSurface.header).toBe(shellSurface.body);
  expect(shellSurface.headerBlur).toBe('none');
  expect(shellSurface.utility).toBe('none');
  expect(shellSurface.contentInset).toEqual({ top: '56px', right: '64px', left: '252px', radius: '20px' });
  expect(shellSurface.title).toBe('rgb(255, 255, 255)');
  const breadcrumbLayout = await page.evaluate(() => {
    const section = document.querySelector('#breadcrumb');
    const title = document.querySelector('#pageTitle');
    const sectionBox = section.getBoundingClientRect();
    const titleBox = title.getBoundingClientRect();
    return {
      display: getComputedStyle(section.parentElement).display,
      separator: getComputedStyle(section, '::after').content,
      centerDelta: Math.abs((sectionBox.top + sectionBox.height / 2) - (titleBox.top + titleBox.height / 2))
    };
  });
  expect(breadcrumbLayout.display).toBe('flex');
  expect(breadcrumbLayout.separator).toContain('›');
  expect(breadcrumbLayout.centerDelta).toBeLessThan(2);
  expect(await page.locator('.page-identity').evaluate(element => [...element.children].map(child => child.id || child.className))).toEqual(['persona-crumb', 'breadcrumb', 'pageTitle']);

  await page.goto(`${app}#/settings/household`);
  await page.locator('#householdSettings [name="householdName"]').fill('Jaya Community Home');
  await page.locator('#householdSettings [name="primaryAddress"]').fill('Kovaipudur, Coimbatore');
  await page.locator('#householdSettings button[type="submit"]').click();
  await expect(page.locator('#brandName')).toHaveText('Jaya Community Home');
  await expect(page.locator('#brandAddress')).toHaveText('Kovaipudur, Coimbatore');
  await expect(page).toHaveTitle('Household profile - Jaya Community Home');
});

test('global persona persists and scopes owned content while preserving shared records', async ({ page }) => {
  await expect(page.locator('#personaSwitcher')).toHaveAccessibleName(/Current view: Family/);
  await page.click('#personaSwitcher');
  await expect(page.locator('#personaMenu')).toBeVisible();
  await expect(page.locator('.persona-option')).toHaveCount(5);
  await expect(page.locator('#personaMenu [data-persona="family"]')).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#personaMenu')).toBeHidden();
  await page.locator('#personaSwitcher').press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.locator('#personaName')).toHaveText('Father');

  await page.evaluate(() => {
    HM.data.state.tasks.push(
      { id: 'persona-p3', context: 'home', type: 'task', title: 'P3 private sentinel', category: 'Test', assignee: 'Ananya', dueAt: '2026-08-20', priority: 'medium', status: 'todo' },
      { id: 'persona-p4', context: 'home', type: 'task', title: 'P4 private sentinel', category: 'Test', assignee: 'Arjun', dueAt: '2026-08-20', priority: 'medium', status: 'todo' },
      { id: 'persona-shared', context: 'home', type: 'task', title: 'Shared family sentinel', category: 'Test', assignee: 'Family', dueAt: '2026-08-20', priority: 'medium', status: 'todo' }
    );
    HM.data.save();
  });

  await page.click('#personaSwitcher');
  await page.click('[data-persona="p4"]');
  await expect(page.locator('body')).toHaveAttribute('data-active-persona', 'p4');
  await expect(page.locator('#content')).toHaveAttribute('data-active-persona', 'p4');
  await expect(page.locator('#personaName')).toHaveText('Arjun');
  expect(await page.evaluate(() => localStorage.getItem(HM.persona.KEY))).toBe('p4');

  await page.goto(`${app}#/home/tasks`);
  await expect(page.locator('#content')).toContainText('P4 private sentinel');
  await expect(page.locator('#content')).toContainText('Shared family sentinel');
  await expect(page.locator('#content')).not.toContainText('P3 private sentinel');

  await page.reload();
  await expect(page.locator('#personaName')).toHaveText('Arjun');
  await expect(page.locator('#content')).toContainText('P4 private sentinel');
  await expect(page.locator('#content')).not.toContainText('P3 private sentinel');

  await page.goto(`${app}#/study/curriculum`);
  await expect(page.locator('body')).toHaveAttribute('data-active-persona', 'p4');
  await expect(page.locator('.learner-switch')).toHaveCount(0);
  await expect(page.locator('#educationHeaderTabs [data-learning-subject="Tamil"]')).toBeVisible();

  await page.locator('.curriculum-chapter-card').first().click({ position: { x: 18, y: 90 } });
  await expect(page.locator('#chapterWorkspace')).toBeVisible();
  await page.click('#personaSwitcher');
  await page.click('[data-persona="p3"]');
  await expect(page.locator('#chapterWorkspace')).toBeHidden();
  await expect(page.locator('body')).toHaveAttribute('data-active-persona', 'p3');
  await expect(page.locator('#educationHeaderTabs [data-learning-subject="Physics"]')).toBeVisible();

  await page.click('#personaSwitcher');
  await page.click('[data-persona="family"]');
  await page.goto(`${app}#/home/tasks`);
  await expect(page.locator('#content')).toContainText('P3 private sentinel');
  await expect(page.locator('#content')).toContainText('P4 private sentinel');

  await page.evaluate(() => localStorage.setItem(HM.persona.KEY, 'deleted-person'));
  await page.reload();
  await expect(page.locator('#personaName')).toHaveText('Family');
  await expect(page.locator('body')).toHaveAttribute('data-active-persona', 'family');
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
    ['home/travel', 'Travel'],
    ['home/web', 'Web Life'],
    ['home/entertainment', 'Entertainment'],
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
  expect(await page.locator('#sectionNav button').count()).toBeLessThanOrEqual(7);
  await page.goto(`${app}#/home/care`);
  expect(await page.locator('#sectionNav button').count()).toBeLessThanOrEqual(7);
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
  await page.locator('.book-subject-switch [data-learning-subject="Physics"]').click();
  await expect(page.locator('.inline-book-identity')).toContainText('Physics Part I');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph101\.pdf/);
  await page.getByRole('button', { name: 'Tools' }).click();
  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookReaderSubjects button')).toHaveCount(5);
  await page.locator('#bookReaderSubjects [data-book-reader-subject="Chemistry"]').click();
  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookReaderTitle')).toHaveText('Chemistry Part I');
  await page.locator('[data-close-dialog="bookReaderDialog"]').click();
  await page.locator('.book-subject-switch [data-learning-subject="Chemistry"]').click();
  await expect(page.locator('.inline-book-identity')).toContainText('Chemistry Part I');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/lech1\/lech101\.pdf/);

  await choosePersona(page, 'p4');
  await expect(page.locator('.subject-tabs button')).toHaveCount(7);
  await expect(page.locator('[data-book-card]')).toHaveCount(1);
  await expect(page.locator('#content')).toContainText('Ganita Prakash Part I');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-7\/gegp1\/gegp1ps\.pdf/);
  await expect(page.locator('[data-inline-book-chapter]')).toHaveCount(9);
  await expect(page.locator('[data-book-state]')).toContainText('Bundled offline');
  await page.locator('.book-subject-switch [data-learning-subject="Science"]').click();
  await expect(page.locator('.inline-book-identity')).toContainText('Curiosity');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-7\/gecu1\/gecu1ps\.pdf/);
});

test('Travel, Web Life and Entertainment are independent complete menus', async ({ page }) => {
  await page.goto(`${app}#/home/travel`);
  await expect(page.locator('#sectionNav button')).toHaveCount(7);
  await expect(page.locator('#sectionNav')).toContainText('Transportation');
  await expect(page.locator('#sectionNav')).toContainText('Hotels & stays');
  await expect(page.locator('#sectionNav')).toContainText('Insurance & documents');
  await expect(page.locator('#content')).toContainText('Travel command centre');

  await page.goto(`${app}#/home/web`);
  await expect(page.locator('#sectionNav button')).toHaveCount(7);
  await expect(page.locator('#sectionNav')).toContainText('Email & accounts');
  await expect(page.locator('#sectionNav')).toContainText('AI services');
  await expect(page.locator('#content')).toContainText('Never save passwords');

  await page.goto(`${app}#/home/entertainment`);
  await expect(page.locator('#sectionNav button')).toHaveCount(7);
  await expect(page.locator('#sectionNav')).toContainText('Watch');
  await expect(page.locator('#sectionNav')).toContainText('Outings & events');

  const labels = await page.evaluate(() => Object.fromEntries(Object.entries(HM.views.groups).map(([key, group]) => [key, group.items.map(item => item[0])])));
  expect(labels.household).not.toContain('Vehicles');
  expect(labels.family).not.toContain('Travel');
});

test('every declared offline textbook section is a real local PDF', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  const sections = await page.evaluate(() => HM.views.textbookCatalog.flatMap(book => (book.pdfFiles || []).map(part => ({ book: book.title, label: part.label, url: part.url }))));
  expect(sections).toHaveLength(173);
  for (const section of sections) {
    expect(section.label, `${section.book} needs its published section title`).toBeTruthy();
    expect(section.label, `${section.book} still has a generic chapter label`).not.toMatch(/^Chapter \d+$/);
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

test('GitHub Pages streams bundled textbooks from the Divine Nest source repository', async ({ page }) => {
  await page.goto(app);
  const source = await page.evaluate(() => HM.views.textbookAsset('assets/textbooks/class-7/gecu1/gecu101.pdf', 'shishyan.github.io'));
  const localSource = await page.evaluate(() => HM.views.textbookAsset('assets/textbooks/class-7/gecu1/gecu101.pdf', '127.0.0.1'));
  expect(source).toBe('https://raw.githubusercontent.com/shishyan/Our-Divine-Nest/main/assets/textbooks/class-7/gecu1/gecu101.pdf');
  expect(localSource).toBe('assets/textbooks/class-7/gecu1/gecu101.pdf');
});

test('every real book chapter and JEE unit has a rich specialist teaching record', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  const coverage = await page.evaluate(() => {
    const content = HM.geniusContent;
    const ignored = /^(prelims|answers|appendix|complete book|प्रारंभिक पृष्ठ)/i;
    const bookKeys = HM.views.textbookCatalog.flatMap(book => (book.pdfFiles || []).filter(part => !ignored.test(part.label)).map(part => `${book.subject}::${part.label}`));
    const jeeKeys = HM.genius.jeeSyllabus.map(unit => `${unit.subject}::${unit.title}`);
    const invalid = value => !value?.insight || value.concepts?.length !== 3 || !value.worked?.steps?.length || value.guidedQuestions?.length !== 2;
    return {
      bookCount: bookKeys.length,
      jeeCount: jeeKeys.length,
      missingBooks: bookKeys.filter(key => invalid(content.school[key])),
      missingJee: jeeKeys.filter(key => invalid(content.jee[key]))
    };
  });
  expect(coverage.bookCount).toBe(147);
  expect(coverage.jeeCount).toBe(54);
  expect(coverage.missingBooks).toEqual([]);
  expect(coverage.missingJee).toEqual([]);
});

test('Education uses the page header for persona, subjects and exam tracks', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  await expect(page.locator('.learning-command-bar')).toBeHidden();
  await expect(page.locator('.learning-track-tabs')).toContainText('CBSE');
  await expect(page.locator('.learning-track-tabs')).toContainText('JEE Main');
  await expect(page.locator('#headerKpis')).toBeHidden();
  await expect(page.locator('#sectionNav')).toBeVisible();
  await expect(page.locator('.subject-tabs')).toContainText('Physics');
  await expect(page.locator('#nav')).toContainText('Education');
  await expect(page.locator('#educationHeaderTabs')).toBeVisible();
  await expect(page.locator('.learner-switch')).toHaveCount(0);
  await expect(page.locator('#personaSwitcher')).toBeVisible();
  const headerLayout = await page.evaluate(() => {
    const header = document.querySelector('.topbar').getBoundingClientRect();
    const persona = document.querySelector('#personaSwitcher').getBoundingClientRect();
    return { headerHeight: header.height, personaTop: persona.top, headerTop: header.top };
  });
  expect(headerLayout.headerHeight).toBeLessThanOrEqual(58);
  expect(headerLayout.personaTop).toBeGreaterThanOrEqual(headerLayout.headerTop);
  await page.locator('#educationHeaderTabs').getByRole('button', { name: 'Physics', exact: true }).click();
  await expect(page.locator('[data-book-card]')).toHaveCount(1);
  await expect(page.locator('.book-volume-tabs')).toHaveCount(0);
  await expect(page.locator('.inline-book-volume-head')).toHaveCount(2);
  await expect(page.locator('.inline-book-volume-head').nth(0)).toContainText('Part I');
  await expect(page.locator('.inline-book-volume-head').nth(1)).toContainText('Part II');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph101\.pdf/);
  await expect(page.locator('.inline-book-chapters')).toBeVisible();
  await expect(page.locator('[data-inline-book-chapter]')).toHaveCount(10);
  await expect(page.locator('.inline-book-chapters')).toContainText('Electric Charges and Fields');
  await page.locator('[data-inline-book-chapter]').filter({ hasText: 'Moving Charges and Magnetism' }).click();
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph104\.pdf#view=FitH/);
  await expect(page.locator('[data-book-card="g12-physics-1"] [data-book-state]')).toContainText('Bundled offline');
  await page.locator('[data-book-open="g12-physics-1"]').click();
  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookPart option')).toHaveCount(10);
  await expect(page.locator('#bookFrame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph1\/leph104\.pdf/);
  await page.locator('#bookReaderDialog [data-close-dialog]').click();
  await page.locator('.inline-book-volume-head').filter({ hasText: 'Part II' }).click();
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /assets\/textbooks\/class-12\/leph2\/leph201\.pdf/);
  await expect(page.locator('.inline-book-chapters')).toContainText('Ray Optics and Optical Instruments');
  await page.reload();
  await expect(page.locator('#educationHeaderTabs').getByRole('button', { name: 'Physics', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await page.goto(`${app}#/study/reports`);
  await expect(page.getByRole('button', { name: 'Physics', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.exam-track')).toHaveCount(2);
  await expect(page.locator('.exam-readiness-grid')).toContainText('CBSE Class XII readiness');
  await expect(page.locator('.exam-readiness-grid')).toContainText('JEE Main readiness');
});

test('Class 12 and Class 7 use a curriculum-first learning path', async ({ page }) => {
  for (const learnerId of ['p3', 'p4']) {
    await page.goto(`${app}#/study/books`);
    await choosePersona(page, learnerId);
    await expect(page.locator('.learning-section-tabs button')).toHaveCount(5);
    await expect(page.locator('#sectionNav')).toContainText('Genius Mind');
    await expect(page.locator('.inline-book-reader')).toBeVisible();
    await expect(page.locator('.curriculum-summary')).toBeHidden();
    await expect(page.locator('.reflection-grid')).toHaveCount(0);

    await page.goto(`${app}#/study/curriculum`);
    await expect(page.locator('.curriculum-journey-list')).toBeVisible();
    await expect(page.locator('.curriculum-progress-strip')).toContainText('Stages complete');
    await expect(page.locator('.curriculum-progress-strip')).toContainText('Summaries reviewed');
    await expect(page.locator('.curriculum-progress-strip')).not.toContainText('One complete learning journey');
    await expect(page.locator('.curriculum-journey-row').first()).toContainText('%');
    await expect(page.locator('.chapter-primary-action')).toHaveCount(0);
    await expect(page.locator('.curriculum-journey-row').first()).toHaveAttribute('role', 'button');
    await expect(page.locator('.curriculum-journey-row').first()).toHaveAttribute('tabindex', '0');
    await expect(page.locator('.curriculum-journey-row').first().locator('.chapter-seven-track i')).toHaveCount(7);
  }
});

test('curriculum chapters render as modern responsive cards', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  const cards = page.locator('.curriculum-chapter-card');
  await expect(cards.first()).toBeVisible();
  await expect(cards.first().locator('.curriculum-card-head')).toBeVisible();
  await expect(cards.first().locator('.chapter-card-visual svg')).toHaveCount(1);
  await expect(cards.first().locator('.chapter-card-title h2')).toBeVisible();
  await expect(cards.first().locator('.chapter-card-metrics > *')).toHaveCount(2);
  await expect(cards.first().locator('.chapter-card-footer')).toContainText('Next step');
  await expect(page.getByPlaceholder('Find a chapter')).toHaveCount(0);
  await expect(page.locator('.curriculum-journey-tools')).toHaveCount(0);
  const cardColors = await cards.evaluateAll(items => items.slice(0, 3).map(item => getComputedStyle(item.querySelector('.chapter-sequence')).backgroundColor));
  expect(new Set(cardColors).size).toBe(1);
  const matchingTheme = await page.evaluate(() => ({
    card: getComputedStyle(document.querySelector('.curriculum-chapter-card .chapter-sequence')).color,
    numberGradient: getComputedStyle(document.querySelector('.curriculum-chapter-card .chapter-sequence')).backgroundImage,
    tab: getComputedStyle(document.querySelector('#educationHeaderTabs [data-learning-subject].active')).backgroundColor
  }));
  expect(matchingTheme.card).toBe(matchingTheme.tab);
  expect(matchingTheme.numberGradient).toContain('linear-gradient');
  const shellTheme = await page.locator('#sidebar').evaluate(element => ({ background: getComputedStyle(element).backgroundImage, canvas: getComputedStyle(document.body).backgroundImage, color: getComputedStyle(element).color }));
  expect(shellTheme.background).toBe('none');
  expect(shellTheme.canvas).toContain('linear-gradient');
  expect(shellTheme.canvas).toContain('rgb(36, 29, 54)');
  expect(shellTheme.color).toBe('rgb(248, 250, 252)');
  const menuIconColors = await page.locator('#nav > .nav-tree-item > .nav-parent .nav-icon').evaluateAll(items => items.slice(0, 6).map(item => getComputedStyle(item).color));
  expect(new Set(menuIconColors).size).toBeGreaterThan(3);
  const cardPalette = await cards.first().evaluate(card => ({
    primary: getComputedStyle(card.querySelector('.chapter-sequence')).color,
    complement: getComputedStyle(card.querySelector('.chapter-card-visual')).color,
    third: getComputedStyle(card.querySelector('.section-kicker')).color,
    surfaceGradient: getComputedStyle(card).backgroundImage,
    shadow: getComputedStyle(card).boxShadow,
    titleGradient: getComputedStyle(card.querySelector('.chapter-card-title h2')).backgroundImage
  }));
  expect(cardPalette.primary).not.toBe(cardPalette.complement);
  expect(new Set([cardPalette.primary, cardPalette.complement, cardPalette.third]).size).toBe(3);
  expect(cardPalette.surfaceGradient).toContain('linear-gradient');
  expect(cardPalette.shadow).not.toBe('none');
  expect(cardPalette.titleGradient).toContain('linear-gradient');
  const themeSurfaces = await page.evaluate(() => ({
    topbar: getComputedStyle(document.querySelector('.topbar')).backgroundColor,
    progress: getComputedStyle(document.querySelector('.curriculum-progress-strip')).backgroundColor
  }));
  expect(themeSurfaces.topbar).toBe('rgba(0, 0, 0, 0)');
  expect(themeSurfaces.progress).not.toBe('rgb(23, 32, 51)');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const frozenEducationHeader = await page.evaluate(() => ({
    top: document.querySelector('.app-header').getBoundingClientRect().top,
    subjectVisible: document.querySelector('#educationHeaderTabs [data-learning-subject].active').getBoundingClientRect().height > 0
  }));
  expect(Math.abs(frozenEducationHeader.top)).toBeLessThanOrEqual(1);
  expect(frozenEducationHeader.subjectVisible).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  const firstMastery = cards.first().locator('[data-card-mastery]');
  await firstMastery.selectOption('80');
  await expect(page.locator('body')).not.toHaveClass(/chapter-workspace-open/);
  await expect(cards.first().locator('[data-card-mastery]')).toHaveValue('80');
  await page.reload();
  await expect(cards.first().locator('[data-card-mastery]')).toHaveValue('80');
  const desktopColumns = await page.locator('.curriculum-journey-list').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(desktopColumns).toBeGreaterThan(1);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(cards.first()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('one full-screen chapter workspace connects teaching, book, practice, assignments and progress', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.locator('.curriculum-chapter-card').first().click({ position: { x: 18, y: 90 } });
  await expect(page.locator('#chapterWorkspace')).toBeVisible();
  await expect(page.locator('.chapter-workspace-tabs button')).toHaveCount(7);
  await expect(page.locator('.chapter-workspace-tabs button').first()).toContainText('Summary');
  await expect(page.locator('.chapter-workspace-tabs button').first()).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.chapter-workspace-tabs')).not.toContainText('Exam Ready');
  await expect(page.locator('[data-chapter-stage-toggle="summary"]')).toBeVisible();
  await expect(page.locator('#nav .chapter-workspace-tabs')).toHaveCount(0);
  await expect(page.locator('#chapterWorkspace .chapter-workspace-tabs')).toBeVisible();
  await expect(page.locator('.chapter-browser-item')).toHaveCount(14);
  await expect(page.locator('.chapter-browser-item').first()).toContainText('Electric Charges and Fields');
  await expect(page.locator('#sidebar')).toHaveCSS('visibility', 'visible');
  await expect(page.locator('#nav')).toHaveClass(/chapter-nav-mode/);
  await expect(page.locator('.chapter-workspace-close')).toHaveText('Back to Curriculum');
  await expect(page.locator('#sidebar .sidebar-bottom')).toBeHidden();
  const backPlacement = await page.locator('.chapter-workspace-close').evaluate(button => {
    const control = button.getBoundingClientRect();
    const sidebar = document.querySelector('#sidebar').getBoundingClientRect();
    return { leftGap: control.left - sidebar.left, bottomGap: sidebar.bottom - control.bottom };
  });
  expect(backPlacement.leftGap).toBeLessThan(24);
  expect(backPlacement.bottomGap).toBeLessThan(24);
  await expect(page.locator('.chapter-workspace-sidebar')).toHaveCount(0);
  await expect(page.locator('.app-header')).toBeVisible();
  const chapterShellSurface = await page.evaluate(() => ({
    body: getComputedStyle(document.body).backgroundImage,
    sidebar: getComputedStyle(document.querySelector('#sidebar')).backgroundImage,
    header: getComputedStyle(document.querySelector('.app-header')).backgroundImage,
    headerBlur: getComputedStyle(document.querySelector('.app-header')).backdropFilter
  }));
  expect(chapterShellSurface.body).toContain('radial-gradient');
  expect(chapterShellSurface.sidebar).toBe('none');
  expect(chapterShellSurface.header).toBe(chapterShellSurface.body);
  expect(chapterShellSurface.headerBlur).toBe('none');
  await expect(page.locator('#chapterWorkspace')).toHaveCSS('border-top-left-radius', '20px');
  await expect(page.locator('#educationHeaderTabs [data-learning-subject="Physics"]')).toBeVisible();
  const shellWidths = await page.evaluate(() => ({ configured: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sidebar')), shell: document.querySelector('#sidebar').getBoundingClientRect().width, workspaceLeft: document.querySelector('#chapterWorkspace').getBoundingClientRect().left }));
  expect(shellWidths.shell).toBe(shellWidths.configured);
  expect(shellWidths.workspaceLeft).toBe(shellWidths.shell);
  await expect(page.locator('.chapter-summary')).toContainText('Bring these ideas with you');
  await expect(page.locator('.chapter-summary')).toContainText('New words, in plain words');
  await expect(page.locator('.chapter-summary')).toContainText('The chapter’s central idea');
  await expect(page.locator('.chapter-summary')).toContainText('How the pieces connect');
  await expect(page.locator('.chapter-summary')).toContainText('Facts and formulas that carry the chapter');
  await expect(page.locator('.chapter-summary')).toContainText('Watch one idea become an answer');
  await expect(page.locator('.chapter-summary')).toContainText('How to work through a question');
  await expect(page.locator('.chapter-summary')).toContainText('Mistakes to watch for');
  await expect(page.locator('.chapter-summary')).toContainText('How to write a strong exam answer');
  await expect(page.locator('.chapter-summary')).toContainText('What can you explain without looking?');
  await expect(page.locator('.chapter-summary h1')).toHaveText('Electric Charges and Fields');
  await expect(page.locator('.chapter-foundation .chapter-slow-steps article')).toHaveCount(3);
  await expect(page.locator('.chapter-word-cards article')).not.toHaveCount(0);
  await expect(page.locator('.chapter-relationship-visual')).toBeVisible();
  await expect(page.locator('.chapter-relationship-visual figcaption')).not.toBeEmpty();
  await expect(page.locator('.chapter-formula-card').first()).toBeVisible();
  await expect(page.locator('.chapter-support-rail')).toBeVisible();
  await expect(page.locator('.chapter-support-rail')).not.toContainText('Common Mistakes');
  await expect(page.locator('.chapter-support-card.is-active')).toHaveCount(1);
  await expect(page.locator('.chapter-support-card.is-active')).toContainText('Memorization Techniques');
  const summaryColumns = await page.evaluate(() => {
    const layout = document.querySelector('.chapter-summary-layout').getBoundingClientRect();
    const rail = document.querySelector('.chapter-support-rail').getBoundingClientRect();
    return { ratio: rail.width / layout.width, railTop: rail.top };
  });
  expect(summaryColumns.ratio).toBeGreaterThan(.26);
  expect(summaryColumns.ratio).toBeLessThan(.34);
  await page.locator('.chapter-picture-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.chapter-support-card.is-active')).toHaveCount(1);
  await expect(page.locator('.chapter-support-card.is-active')).toContainText('Common Patterns');
  await page.locator('.chapter-summary-results').scrollIntoViewIfNeeded();
  await expect(page.locator('.chapter-support-card.is-active')).toHaveCount(2);
  await expect(page.locator('.chapter-support-card.memory.is-active')).toContainText('Memorization Techniques');
  await expect(page.locator('.chapter-support-card.remember.is-active')).toContainText('Do Not Forget This');
  await page.locator('.chapter-summary-traps').scrollIntoViewIfNeeded();
  await expect(page.locator('.chapter-support-card.is-active')).toHaveCount(1);
  await expect(page.locator('.chapter-support-card.is-active')).toContainText('How to Catch Errors');
  expect(await page.locator('.chapter-summary').innerText()).not.toMatch(/do not rush|take (?:these|it) slowly|go slowly|pause and|before moving down|do not reread/i);
  const lessonReadability = await page.locator('.chapter-summary').evaluate(summary => ({
    height: summary.scrollHeight,
    storyFont: parseFloat(getComputedStyle(summary.querySelector('.chapter-summary-story')).fontSize),
    stepFont: parseFloat(getComputedStyle(summary.querySelector('.chapter-slow-steps p')).fontSize),
    formulaFont: parseFloat(getComputedStyle(summary.querySelector('.chapter-formula-card p')).fontSize),
    formulaFamily: getComputedStyle(summary.querySelector('.chapter-formula-card p')).fontFamily,
    viewportHeight: innerHeight
  }));
  expect(lessonReadability.height).toBeGreaterThan(lessonReadability.viewportHeight * 2);
  expect(lessonReadability.storyFont).toBeGreaterThanOrEqual(16);
  expect(lessonReadability.stepFont).toBeGreaterThanOrEqual(16);
  expect(lessonReadability.formulaFont).toBeGreaterThanOrEqual(18);
  expect(lessonReadability.formulaFamily).toContain('Cambria Math');
  const firstSummary = await page.locator('.chapter-summary-bigidea').textContent();
  await page.locator('.chapter-browser-item').nth(1).click();
  await expect(page.locator('.chapter-browser-item').nth(1)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.chapter-summary')).toContainText('Potential');
  expect(await page.locator('.chapter-summary-bigidea').textContent()).not.toBe(firstSummary);
  await page.locator('.chapter-browser-item').first().click();
  await page.locator('[data-chapter-workspace-tab="understand"]').click();
  await expect(page.locator('.chapter-learning-grid')).toContainText('THE IDEA THAT UNLOCKS THIS CHAPTER');
  await expect(page.locator('.chapter-understand-layout .chapter-support-rail')).toBeVisible();
  await page.locator('[data-chapter-stage-toggle="understand"]').click();
  await expect(page.locator('.chapter-workspace-status')).toContainText('2/7');
  const horizontalTabs = await page.locator('.chapter-workspace-tabs button').evaluateAll(buttons => buttons.slice(0, 2).map(button => button.getBoundingClientRect()).map(rect => ({ x: rect.x, y: rect.y })));
  expect(horizontalTabs[1].x).toBeGreaterThan(horizontalTabs[0].x);
  expect(Math.abs(horizontalTabs[1].y - horizontalTabs[0].y)).toBeLessThan(2);
  await page.locator('[data-chapter-workspace-tab="book"]').click();
  await expect(page.locator('.chapter-book-panel iframe')).toHaveAttribute('src', /leph101\.pdf/);
  const viewportUse = await page.evaluate(() => {
    const workspace = document.querySelector('#chapterWorkspace').getBoundingClientRect();
    const pdf = document.querySelector('.chapter-book-panel iframe').getBoundingClientRect();
    const sidebarWidth = document.querySelector('#sidebar').getBoundingClientRect().width;
    return { workspaceWidth: workspace.width, workspaceHeight: workspace.height, sidebarWidth, pdfWidth: pdf.width, pdfHeight: pdf.height, viewportWidth: innerWidth, viewportHeight: innerHeight };
  });
  expect(viewportUse.workspaceWidth).toBe(viewportUse.viewportWidth - viewportUse.sidebarWidth);
  expect(viewportUse.workspaceHeight).toBe(viewportUse.viewportHeight - 56);
  expect(Math.abs(viewportUse.pdfWidth - viewportUse.workspaceWidth)).toBeLessThan(2);
  expect(viewportUse.pdfHeight / viewportUse.viewportHeight).toBeGreaterThanOrEqual(.9);
  await page.locator('[data-chapter-workspace-tab="practice"]').click();
  await expect(page.locator('.chapter-guided-practice')).toContainText('Why B is correct');
  await expect(page.locator('.chapter-guided-practice input, .chapter-guided-practice textarea')).toHaveCount(0);
  await page.locator('[data-chapter-workspace-tab="assignments"]').click();
  await expect(page.locator('.chapter-assignment-panel')).toContainText('Assignments connected to this subject');
  await page.locator('[data-chapter-workspace-tab="progress"]').click();
  await expect(page.locator('.chapter-seven-status article')).toHaveCount(7);
  await page.locator('[data-chapter-mastery="80"]').click();
  await expect(page.locator('.chapter-mastery-ring')).toContainText('80%');
  await page.locator('#educationHeaderTabs [data-learning-subject="Chemistry"]').click();
  await expect(page.locator('#chapterWorkspace')).toBeHidden();
  await expect(page.locator('.curriculum-journey-list')).toBeVisible();
});

test('every real CBSE and JEE chapter has a substantive authored summary', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  const audit = await page.evaluate(() => {
    const root = HM.chapterSummaries || {};
    const frontMatter = /^(prelims|answers|appendix|complete book|प्रारंभिक पृष्ठ)/i;
    const normalized = (subject, title) => `${subject}|${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const resolve = (id, subject, title, jee = false) => {
      const track = jee ? (root.jee || {}) : (root.school || {});
      return track[id] || track[`${subject}::${title}`] || root[id] || root[`${subject}::${title}`] || root[normalized(subject, title)];
    };
    const valid = item => item && String(item.bigIdea || '').length >= 35 && String(item.story || '').length >= 55 && ['essentialResults', 'problemFlow', 'examTraps', 'rapidRecall'].every(key => Array.isArray(item[key]) && item[key].length >= 2 && item[key].every(value => String(value).trim().length >= 3));
    const school = HM.views.textbookCatalog.flatMap(book => (book.pdfFiles || []).filter(part => !/ps\.pdf(?:$|[?#])/i.test(part.url) && !frontMatter.test(part.label)).map((part, index) => ({ id: `book-${book.id}-${part.order || index + 1}`, subject: book.subject, title: part.label })));
    const jee = HM.genius.jeeSyllabus.map(item => ({ ...item, jee: true }));
    const chapters = [...school, ...jee];
    const missing = chapters.filter(item => !valid(resolve(item.id, item.subject, item.title, item.jee))).map(item => `${item.id}: ${item.subject} / ${item.title}`);
    return { school: school.length, jee: jee.length, missing };
  });
  expect(audit.school).toBe(147);
  expect(audit.jee).toBe(54);
  expect(audit.missing).toEqual([]);
});

test('chapter foundations and relationship pictures remain readable on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${app}#/study/curriculum`);
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.locator('.curriculum-chapter-card').first().click({ position: { x: 18, y: 90 } });
  await expect(page.locator('.chapter-foundation')).toBeVisible();
  await expect(page.locator('.chapter-support-rail')).toBeHidden();
  await page.locator('.chapter-picture-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.chapter-relationship-visual')).toBeInViewport();
  const fit = await page.evaluate(() => {
    const diagram = document.querySelector('.chapter-relationship-visual').getBoundingClientRect();
    return { overflow: document.documentElement.scrollWidth - innerWidth, left: diagram.left, right: diagram.right, width: innerWidth };
  });
  expect(fit.overflow).toBeLessThanOrEqual(1);
  expect(fit.left).toBeGreaterThanOrEqual(0);
  expect(fit.right).toBeLessThanOrEqual(fit.width + 1);
});

test('every real CBSE and JEE chapter teaches its foundations before the new lesson', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  const audit = await page.evaluate(() => {
    const root = HM.chapterFoundations || {};
    const frontMatter = /^(prelims|answers|appendix|complete book|à¤ªà¥à¤°à¤¾à¤‚à¤­à¤¿à¤• à¤ªà¥ƒà¤·à¥à¤ )/i;
    const normalized = (subject, title) => `${subject}|${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const resolve = (id, subject, title, jee = false) => {
      const track = jee ? (root.jee || {}) : (root.school || {});
      return track[id] || track[`${subject}::${title}`] || root[id] || root[`${subject}::${title}`] || root[normalized(subject, title)];
    };
    const valid = item => {
      if (!item || !Array.isArray(item.remember) || item.remember.length < 2 || !Array.isArray(item.newWords) || item.newWords.length < 3) return false;
      if (!item.newWords.every(word => String(word.term || '').length > 1 && String(word.plain || '').length > 8)) return false;
      if (!item.firstExample || !String(item.firstExample.prompt || '').trim() || !Array.isArray(item.firstExample.steps) || item.firstExample.steps.length < 2 || !String(item.firstExample.answer || '').trim()) return false;
      const nodes = item.visual?.nodes || [];
      const ids = new Set(nodes.map(node => node.id));
      return nodes.length >= 2 && (item.visual.edges || []).every(edge => ids.has(edge.from) && ids.has(edge.to));
    };
    const school = HM.views.textbookCatalog.flatMap(book => (book.pdfFiles || []).filter(part => !/ps\.pdf(?:$|[?#])/i.test(part.url) && !frontMatter.test(part.label)).map((part, index) => ({ id: `book-${book.id}-${part.order || index + 1}`, subject: book.subject, title: part.label })));
    const jee = HM.genius.jeeSyllabus.map(item => ({ ...item, jee: true }));
    const chapters = [...school, ...jee];
    const missing = chapters.filter(item => !valid(resolve(item.id, item.subject, item.title, item.jee))).map(item => `${item.id}: ${item.subject} / ${item.title}`);
    return { school: school.length, jee: jee.length, missing };
  });
  expect(audit.school).toBe(147);
  expect(audit.jee).toBe(54);
  expect(audit.missing).toEqual([]);
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
  await expect(page.locator('.genius-section-tabs')).toContainText('Exam Tips');
  await expect(page.locator('.genius-section-tabs')).not.toContainText('Test Yourself');
  await page.locator('[data-practice-open]').last().click();
  await expect(page.locator('.mcq-workspace')).toBeVisible();
  await expect(page.locator('.practice-recall')).toContainText('ANSWER GUIDE');

  await page.goto(`${app}#/study/genius`);
  await choosePersona(page, 'p4');
  await page.getByRole('button', { name: 'Science', exact: true }).click();
  await expect(page.locator('.genius-lessons > button')).toHaveCount(12);
  await page.getByRole('button', { name: /Heat Transfer in Nature/ }).click();
  await expect(page.locator('.genius-teach-panel')).toContainText('heat');
});

test('Genius Mind adds a chapter-wise JEE Main workflow for Class 12 PCM', async ({ page }) => {
  await page.goto(`${app}#/study/jee`);
  await expect(page.locator('#pageTitle')).toHaveText('JEE Main');
  await expect(page.locator('.subject-master-tabs button.active')).toHaveText('Physics');
  await expect(page.locator('.subject-master-tabs button')).toHaveCount(3);
  await expect(page.locator('.genius-lessons > button')).toHaveCount(20);
  await page.locator('[data-genius-lesson]').filter({ hasText: 'Kinematics' }).click();
  await expect(page.locator('.genius-teach-panel')).toContainText('Motion Graphs');
  await expect(page.locator('.genius-concept-lessons')).toContainText('Slope of x–t is v');
  await expect(page.locator('.genius-teach-panel')).toContainText('KEY CONCEPTS');
  await expect(page.locator('.teacher-talk')).toContainText('Choose the frame before chasing the object');
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
  await expect(page.locator('.genius-teach-panel')).toContainText('Argand Geometry');
});

test('Practice and assessments are one chapter-based MCQ workspace', async ({ page }) => {
  await page.goto(`${app}#/study/practice`);
  await expect(page.locator('.learning-section-tabs')).toContainText('Curriculum');
  const questions = page.locator('.mcq-question');
  expect(await questions.count()).toBeGreaterThanOrEqual(7);
  await expect(questions.first()).toContainText('no inverse function');
  await expect(page.locator('.mcq-workspace textarea')).toHaveCount(0);
  await questions.first().locator('[data-mcq-answer="0"]').click();
  await expect(page.locator('.mcq-feedback')).toContainText('Repair this exact idea');
  await expect(questions.first().locator('.mcq-option.correct')).toContainText('not one-to-one');
  await questions.last().scrollIntoViewIfNeeded();
  await expect(questions.last()).toBeInViewport();
  await expect(page.locator('.app-header')).toBeInViewport();
  const minimumCoverage = await page.evaluate(() => {
    const lessons = [...HM.data.state.syllabusItems, ...HM.genius.jeeSyllabus];
    return Math.min(...lessons.map(item => HM.genius.questions(item).length));
  });
  expect(minimumCoverage).toBeGreaterThanOrEqual(7);
  await expect(page.locator('.assessment-drawer')).toContainText('School assessments and mock-test record');
  await page.goto(`${app}#/study/assessments`);
  await expect(page.locator('.mcq-workspace')).toBeVisible();
});

test('the supplied unified Class 7 Tamil book exposes its verified units inside one real offline PDF', async ({ page }) => {
  await page.goto(`${app}#/study/books`);
  await choosePersona(page, 'p4');
  await page.locator('.book-subject-switch').getByRole('button', { name: 'Tamil', exact: true }).click();
  await expect(page.locator('#content')).toContainText('Class 7 Tamil — Complete Book');
  await expect(page.locator('[data-inline-book-chapter]')).toHaveCount(9);
  await expect(page.locator('.inline-book-chapters')).toContainText('அமுதத் தமிழ்');
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /tamil7-cbse-complete\.pdf#page=11/);
  await page.locator('[data-inline-book-chapter]').filter({ hasText: 'மானுடம் வெல்லும்' }).click();
  await expect(page.locator('.inline-book-frame')).toHaveAttribute('src', /tamil7-cbse-complete\.pdf#page=201/);
  await expect(page.locator('[data-book-card="g7-tamil"] [data-book-state]')).toContainText('Bundled offline - 9 sections');
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
  let gmailFullFormat = false;
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
    gmailFullFormat ||= url.searchParams.get('format') === 'full';
    const attempt = (gmailAttempts.get(messageId) || 0) + 1;
    gmailAttempts.set(messageId, attempt);
    if (messageId === 'gmail-1' && attempt === 1) return route.fulfill({ status: 429, headers: { 'Retry-After': '0' }, contentType: 'application/json', body: JSON.stringify({ error: { message: 'Too many concurrent requests' } }) });
    activeGmailDetails += 1;
    maxGmailDetails = Math.max(maxGmailDetails, activeGmailDetails);
    return new Promise(resolve => setTimeout(resolve, 20)).then(() => {
      activeGmailDetails -= 1;
      const financial = messageId === 'gmail-9';
      const messageText = financial ? 'Payment successful. Your account was debited ₹4,200 at Grocery Mart. Receipt retained for your records.' : 'Class 7 exam timetable and fee Rs 2,500 due 12 August 2026.';
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: messageId, internalDate: '1785920400000', snippet: messageText, payload: { mimeType: 'text/plain', body: { data: Buffer.from(messageText).toString('base64url') }, headers: [{ name: 'Subject', value: financial ? `Payment receipt ${messageId}` : `School exam timetable ${messageId}` }, { name: 'From', value: financial ? 'Family Bank' : 'Peepal School' }] } }) });
    });
  });
  await page.goto(`${app}#/settings/app`);
  const sidebarScrollbar = await page.locator('#nav').evaluate(element => ({
    firefox: getComputedStyle(element).scrollbarWidth,
    canStillScroll: element.scrollHeight >= element.clientHeight
  }));
  expect(sidebarScrollbar.firefox).toBe('none');
  expect(sidebarScrollbar.canStillScroll).toBe(true);
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
    await expect(row).toContainText('Gmail synced this session');
  }
  await expect(page.locator('#googleSyncSettings')).toContainText('4 active this session');
  await expect(page.locator('[data-google-sync]')).toContainText('Sync all accounts');
  await page.locator('[data-google-sync]').click();
  await expect.poll(() => page.evaluate(() => HM.data.state.syncSuggestions.length)).toBe(10);
  await expect(page.locator('.integration-queue')).toContainText('0 pending');
  expect(maxGmailDetails).toBeLessThanOrEqual(3);
  expect(gmailFullFormat).toBe(true);
  expect(gmailAttempts.get('gmail-1')).toBe(2);
  await page.goto(`${app}#/global/intelligence`);
  await expect.poll(() => page.evaluate(() => HM.data.state.settings.googleSync.accounts.length)).toBe(4);
  await expect(page.locator('.inbox-history tbody tr')).toHaveCount(9);
  await expect(page.locator('.inbox-metrics')).toContainText('9');
  await expect(page.locator('.inbox-history')).toContainText('Action 12 Aug');
  await expect(page.locator('.inbox-history')).toContainText('₹2,500');
  await page.locator('[data-category-filter]').selectOption('school');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(8);
  await page.locator('[data-category-filter]').selectOption('');
  await page.locator('[data-filter]').fill('gmail-9');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(1);
  await page.locator('[data-filter]').fill('');
  await page.locator('[data-status-filter]').selectOption('applied');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(9);
  const appliedSchoolEvent = await page.evaluate(() => HM.data.state.events.find(item => item.title.includes('School exam timetable')));
  expect(appliedSchoolEvent.startAt).toContain('2026-08-12');
  const gmailExpense = await page.evaluate(() => HM.data.state.expenses.find(item => item.sourceRef?.includes('gmail-9')));
  expect(gmailExpense).toMatchObject({ amount: 4200, source: 'Gmail' });
  await page.goto(`${app}#/home/money/budget`);
  await expect(page.locator('.module-inbox-brief')).toContainText('Payment receipt gmail-9');
  await expect(page.locator('.module-inbox-brief')).toContainText('₹4,200');
  await expect(page.locator('.module-inbox-brief')).toContainText('Grocery Mart');
  await page.goto(`${app}#/home/money/reports`);
  await expect(page.locator('.module-inbox-brief')).toContainText('Bills, payments and renewals');
  await page.goto(`${app}#/study/reports`);
  await expect(page.locator('.module-inbox-brief')).toBeVisible();
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
