import { test, expect } from '@playwright/test';

test('home loads and shows links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=프로그램')).toBeVisible();
  await expect(page.locator('text=E-Sports')).toBeVisible();
});
