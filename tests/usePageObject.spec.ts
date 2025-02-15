import { test } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";

test.describe("Login to the dashboard and navigate to the vendor page", () => {
  test.use({ storageState: ".auth/login.json" });
  test("should navigate to the all products page", async ({ page }) => {
    await page.context().storageState({ path: ".auth/login.json" });
    await page.goto("/vendor");
    const pm = new PageManager(page);
    await pm.navigateTo().productsRoute();
    await pm.productPage.addProduct();
  });
});
