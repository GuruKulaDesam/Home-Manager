const { test, expect } = require('@playwright/test');

const app = 'http://127.0.0.1:8765/';

test.beforeEach(async ({ page }) => {
  await page.goto(app);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('all non-learning suites render without runtime errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const routes = [
    ['global/overview', 'Today'],
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
