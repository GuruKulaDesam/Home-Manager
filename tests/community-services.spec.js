const { test, expect } = require('@playwright/test');
const app = 'http://127.0.0.1:8765/';

test.beforeEach(async ({ page }) => {
  await page.goto(app);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.goto(`${app}?services=1#/community/directory`);
});

test('local services prioritize Kovaipudur and expose verified sources', async ({ page }) => {
  await expect(page.locator('.local-service-card')).toHaveCount(20);
  await expect(page.locator('.local-service-card').first()).toContainText('Kovaipudur');
  await expect(page.locator('.emergency-dial-strip a')).toHaveCount(4);
  await expect(page.locator('.local-service-card .service-source')).toHaveCount(20);
  await page.locator('[data-status-filter]').selectOption('Kovaipudur');
  await expect(page.locator('.local-service-card:visible')).toHaveCount(8);
});

test('family can add and edit a trusted home professional', async ({ page }) => {
  await page.locator('[data-create="contact"]').click();
  await page.locator('#entityForm [name="name"]').fill('Trusted plumber');
  await page.locator('#entityForm [name="category"]').fill('Plumber');
  await page.locator('#entityForm [name="phone"]').fill('99999 11111');
  await page.locator('#entityForm [name="hours"]').fill('Family verified');
  await page.locator('#entityForm button[value="default"]').click();
  await expect(page.locator('.trusted-provider-grid')).toContainText('Trusted plumber');
  await page.locator('[data-edit="contact"]').click();
  await page.locator('#entityForm [name="name"]').fill('Our plumber');
  await page.locator('#entityForm button[value="default"]').click();
  await expect(page.locator('.trusted-provider-grid')).toContainText('Our plumber');
});
