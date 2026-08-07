const { test, expect } = require('@playwright/test');
const app = 'http://127.0.0.1:8765/';

test.beforeEach(async ({ page }) => {
  await page.goto(app);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Kitchen provides 100 recipes and seven editable weekly menus', async ({ page }) => {
  await page.goto(`${app}#/kitchen/recipes`);
  await expect(page.locator('.kitchen-recipe-card')).toHaveCount(100);
  await page.locator('[data-filter]').fill('fever');
  await expect(page.locator('.kitchen-recipe-card:visible').first()).toContainText(/fever/i);

  await page.goto(`${app}#/kitchen/menus`);
  await expect(page.locator('[data-menu-tab]')).toHaveCount(7);
  await page.locator('[data-menu-tab="6"]').click();
  await expect(page.locator('[data-menu-panel="6"]')).toHaveClass(/active/);
});

test('Kitchen pantry editing drives the refill list', async ({ page }) => {
  await page.goto(`${app}#/kitchen/pantry`);
  await expect(page.locator('.pantry-grid article')).toHaveCount(3);
  await page.locator('[data-edit="inventory"][data-id="n1"]').click();
  await page.locator('#entityForm [name="quantity"]').fill('1');
  await page.locator('#entityForm button[value="default"]').click();
  await page.goto(`${app}#/kitchen/shopping`);
  await expect(page.locator('.shopping-line')).toHaveCount(3);
});

test('persona drafts stay separate and the Home Manager finalizes the month', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('home-manager-active-persona-v1', 'p1'));
  await page.goto(`${app}#/kitchen/menus`);
  page.once('dialog', dialog => dialog.accept('Puli Saadham + sundal'));
  await page.locator('[data-edit-menu="0:0:lunch"]').click();
  await expect(page.locator('[data-menu-panel="0"]')).toContainText('Puli Saadham + sundal');

  await page.evaluate(() => localStorage.setItem('home-manager-active-persona-v1', 'p2'));
  await page.reload();
  await expect(page.locator('[data-edit-menu="0:0:lunch"] b')).toHaveText('Sambar Saadham + beans poriyal');
  page.once('dialog', dialog => dialog.accept('Lemon Saadham + pachai payaru sundal'));
  await page.locator('[data-edit-menu="0:0:lunch"]').click();
  await page.locator('[data-finalize-menu="0"]').click();
  await expect(page.locator('[data-menu-panel="0"]')).toContainText('Finalized by Mother');

  await page.evaluate(() => localStorage.setItem('home-manager-active-persona-v1', 'p1'));
  await page.reload();
  await expect(page.locator('[data-menu-panel="0"]')).toContainText('Lemon Saadham + pachai payaru sundal');
  await expect(page.locator('[data-edit-menu="0:0:lunch"]')).toBeDisabled();
});
