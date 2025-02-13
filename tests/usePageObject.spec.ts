import { test } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";

test.describe("Login to the dashboard and navigate to the vendor page", () => {
  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm
      .loginTo()
      .useLogin(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  });


  test('should navigate to the all products page', async ({ page }) => {
    await page.goto('/vendor')
    const pm = new PageManager(page);
    await pm.navigateTo().productsRoute();
    await pm.productPage.addProduct()
  });
});
