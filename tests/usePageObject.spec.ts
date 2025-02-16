import { expect, test } from "@playwright/test";
import { PageManager } from "./page-objects/pageManager";

// must be logged in to run this test means there must be a login.json file in the .auth folder you can create this file by running the login.setup.ts file
test.use({ storageState: ".auth/login.json" });

test.describe("Login to the dashboard and navigate to the vendor page", () => {
  test("should navigate to the all products page and create a product successfully..", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().productsRoute();
    await pm.productPage.addProduct();
  });
});

test("go to the store and order latest product", async ({ page }) => {
  let storeName = "store9";
  const pm = new PageManager(page);
  await pm.navigateTo().storeRoute(storeName);
  await pm.makeCheckout().addToCartAndCheckout(storeName);
});


test("go order confirmation page and confirm order", async ({ page }) => {
  const pm = new PageManager(page);
   await pm.navigatePage.orderRoute();
   await pm.confirmOrder.confirmOrderStatus();

});
