const { test, expect } = require('@playwright/test');
const app = 'http://127.0.0.1:8765/';

test.beforeEach(async ({ page }) => {
  await page.goto(app);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('Kitchen provides 100 recipes and seven editable weekly menus', async ({ page }) => {
  await page.locator('#languageSwitcher [data-language="ta"]').click();
  await page.goto(`${app}#/kitchen/recipes`);
  await expect(page.locator('.kitchen-recipe-card')).toHaveCount(100);
  await expect(page.locator('.kitchen-recipe-card .recipe-photo')).toHaveCount(100);
  await expect.poll(() => page.locator('.recipe-photo').first().evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.locator('[data-filter]').fill('காய்ச்சல்');
  await expect(page.locator('.kitchen-recipe-card:visible').first()).toContainText(/காய்ச்சல்/);
  await expect(page.locator('#content')).not.toContainText(/[௦-௯]/);
  const kitchenTheme = await page.locator('.kitchen-hero').evaluate(hero => ({
    background: getComputedStyle(hero).backgroundImage,
    headingColor: getComputedStyle(hero.querySelector('h2')).color,
    headingFont: getComputedStyle(hero.querySelector('h2')).fontFamily
  }));
  expect(kitchenTheme.background).toContain('linear-gradient');
  expect(kitchenTheme.headingColor).toBe('rgb(23, 32, 58)');
  expect(kitchenTheme.headingFont.toLowerCase()).not.toContain('georgia');

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
  page.once('dialog', dialog => dialog.accept('புளி சாதம் · சுண்டல்'));
  await page.locator('[data-edit-menu="0:0:lunch"]').click();
  await expect(page.locator('[data-edit-menu="0:0:lunch"] b')).toHaveText('புளி சாதம் · சுண்டல்');

  await page.evaluate(() => localStorage.setItem('home-manager-active-persona-v1', 'p2'));
  await page.reload();
  await expect(page.locator('[data-edit-menu="0:0:lunch"] b')).toHaveText('சாம்பார் சாதம் · பீன்ஸ் பொரியல்');
  page.once('dialog', dialog => dialog.accept('எலுமிச்சை சாதம் · பச்சைப்பயறு சுண்டல்'));
  await page.locator('[data-edit-menu="0:0:lunch"]').click();
  await page.locator('[data-finalize-menu="0"]').click();
  await expect(page.locator('[data-menu-panel="0"] .finalized-stamp')).toContainText('தாய்');

  await page.evaluate(() => localStorage.setItem('home-manager-active-persona-v1', 'p1'));
  await page.reload();
  await expect(page.locator('[data-menu-panel="0"]')).toContainText('எலுமிச்சை சாதம் · பச்சைப்பயறு சுண்டல்');
  await expect(page.locator('[data-edit-menu="0:0:lunch"]')).toBeDisabled();
});
