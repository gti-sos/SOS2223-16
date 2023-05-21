// @ts-check 
import { test, expect } from '@playwright/test'; 
 
test('home has the right title', async({ page }) =>{ 
    await page.goto('http://localhost:8080'); 
 
    await expect(page).toHaveTitle("Inicio"); 
}); 
 
test('navigate to phoses page', async ({page}) => { 
    await page.goto('http://localhost:8080'); 
 
    await page.getByRole('link', {name:'Civil war andalusian phoses'}).click(); 
 
 
    await page.getByRole('button', {name: 'Insertar datos de prueba'}).click(); 
 
    await page.waitForTimeout(2000); 
 
   
});
