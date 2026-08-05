const { test, expect } = require('@playwright/test');

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
  await page.goto(`${app}#/study/curriculum`);
  await expect(page.locator('#pageTitle')).toHaveText('Books & Curriculum');
  await expect(page.locator('[data-book-card]')).toHaveCount(9);
  await expect(page.locator('#content')).toContainText('Physics Part I');
  await expect(page.locator('#content')).toContainText('Flamingo');
  await expect(page.locator('#content')).toContainText('Computer Science');

  await page.locator('[data-learner="p4"]').click();
  await expect(page.locator('[data-book-card]')).toHaveCount(9);
  await expect(page.locator('#content')).toContainText('Ganita Prakash Part I');
  await expect(page.locator('#content')).toContainText('Curiosity');
  await expect(page.locator('#content')).toContainText('Poorvi');
  await expect(page.locator('#content')).toContainText('Kaushal Bodh');
  await expect(page.locator('#content')).toContainText('PDF not added on this device');
});

test('a private PDF can be read, bookmarked and reviewed without upload', async ({ page }) => {
  await page.goto(`${app}#/study/curriculum`);
  await page.locator('[data-learner="p4"]').click();
  await page.locator('#bookFileInput').evaluate(input => {
    input.dataset.bookId = 'g7-science';
    input.dataset.studentId = 'p4';
  });
  await page.locator('#bookFileInput').setInputFiles({
    name: 'curiosity-family-copy.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF')
  });

  await expect(page.locator('#bookReaderDialog')).toBeVisible();
  await expect(page.locator('#bookReaderTitle')).toHaveText('Curiosity');
  await page.locator('#bookTotalPages').fill('100');
  await page.locator('#bookTotalPages').press('Tab');
  await page.locator('#bookCurrentPage').fill('12');
  await page.locator('#bookCurrentPage').press('Tab');
  await page.locator('#bookBookmark').click();
  await page.locator('#bookNote').fill('Explain the experiment and revise the key observation.');
  await page.locator('#saveBookNote').click();
  await page.locator('#bookReviewed').click();
  await expect(page.locator('#bookNotes')).toContainText('Explain the experiment');
  await page.getByRole('button', { name: 'Close textbook reader' }).click();

  await expect(page.locator('[data-book-card="g7-science"] [data-book-state]')).toContainText('Ready offline');
  await page.locator('[data-book-open="g7-science"]').click();
  await expect(page.locator('#bookCurrentPage')).toHaveValue('12');
  await expect(page.locator('#bookTotalPages')).toHaveValue('100');
  await expect(page.locator('#bookBookmark')).toContainText('Remove bookmark');
  await expect(page.locator('#bookReviewed')).toContainText('Reviewed');
  const progress = await page.evaluate(() => HM.data.state.readingProgress.find(item => item.bookId === 'g7-science' && item.studentId === 'p4'));
  expect(progress).toMatchObject({ currentPage: 12, totalPages: 100, status: 'reviewed', bookmarks: [12] });
  expect(progress.notes).toHaveLength(1);
});

test('textbook library and reader fit a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${app}#/study/curriculum`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator('.book-shelf')).toHaveCSS('grid-template-columns', /370px|[0-9.]+px/);
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
  await expect(page.locator('.integration-queue')).toContainText('Family train booking');
  await expect(page.locator('.integration-queue')).toContainText('School exam timetable');
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
  await page.locator('.inbox-decision [data-sync-apply]').first().click();
  await page.locator('[data-status-filter]').selectOption('applied');
  await expect(page.locator('.inbox-history tbody tr:visible')).toHaveCount(1);
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

test('Android SMS backup is analysed locally with OTP exclusion and review apply', async ({ page }) => {
  await page.goto(`${app}#/settings/app`);
  await page.locator('#smsConsent').check();
  await page.locator('#phoneSmsSettings button[type="submit"]').click();
  const smsXml = `<?xml version="1.0" encoding="UTF-8"?><smses count="4">
    <sms address="TNEB" date="1785920400000" body="Electricity bill Rs. 1,850 due for account 1234567890" contact_name="Power provider" />
    <sms address="PEEPAL" date="1785924000000" body="School exam timetable is published for Class 7" contact_name="Peepal School" />
    <sms address="COURIER" date="1785927600000" body="Your order is out for delivery today" contact_name="Courier" />
    <sms address="BANK" date="1785931200000" body="Your OTP is 874221 and expires in 5 minutes" contact_name="Bank" />
  </smses>`;
  await page.locator('#smsImport').setInputFiles({ name: 'phone-sms.xml', mimeType: 'application/xml', buffer: Buffer.from(smsXml) });
  await expect(page.locator('.integration-queue')).toContainText('3 pending');
  await expect(page.locator('.integration-queue')).toContainText('Electricity bill');
  await expect(page.locator('.integration-queue')).not.toContainText('874221');
  await expect(page.locator('.integration-queue')).toContainText('...7890');
  const billSuggestion = page.locator('.sync-suggestion').filter({ hasText: 'Electricity bill' });
  await billSuggestion.getByRole('button', { name: 'Apply' }).click();
  const imported = await page.evaluate(() => ({
    sms: HM.data.state.settings.phoneSms.importedCount,
    bill: HM.data.state.lifeRecords.find(item => item.domain === 'bills' && item.provider === 'Power provider'),
    pending: HM.data.state.syncSuggestions.filter(item => item.status === 'pending').length
  }));
  expect(imported.sms).toBe(4);
  expect(imported.bill).toMatchObject({ domain: 'bills', amount: 1850, status: 'pending' });
  expect(imported.pending).toBe(2);
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
