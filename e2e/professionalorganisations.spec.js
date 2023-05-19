// @ts-check
import { test, expect } from '@playwright/test';

test('home has the right title', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Inicio");
});

test('navigate to professional organisations page', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // Click the get started link.
  await page.getByRole('link', { name: 'Estadisticas Colegios Profesionales' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Colegios Profesionales");

  // Click to get data.
  await page.getByRole('button', { name: 'Insertar datos de prueba' }).click();

  // Wait to avoid false negatives.
  await page.waitForTimeout(2000); // waits for 2 seconds


  //expect to have data.
  await expect((await page.locator(".organisationRow").all()).length).toBeGreaterThan(5);
});
