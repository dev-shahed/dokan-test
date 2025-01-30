const { expect, describe, beforeEach, test } = require("@playwright/test");

// Login to the vendor dashboard
test.beforeEach(async ({ page }) => {
  await page.goto("https://e-ticket.staging.dokandev.com/vendor/login");
  // Fill in email and password and login
  await page.fill("#login-email", "shahedthedev@gmail.com");
  await page.fill("#login-password", "Shahed999#");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
});

describe("Handle add a product with the require information within the vendor dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.waitForSelector(".sidebar");
    await page.locator(".sidebar-link-title", { hasText: "Products" }).click();
    await page
      .locator(".sidebar-dropdown-link", { hasText: "All Products" })
      .click();
    await page.waitForNavigation();
  });

  // randomly generate a product name
  let productName = "Test Product " + Math.floor(Math.random() * 1000);

  // test("should add a product to the vendor shop", async ({ page }) => {
  //   await page.getByText("Add Product").click();
  //   await page.waitForNavigation();
  //   await page.fill("#product-name", productName);
  //   await page.locator("label", { hasText: "Standard" }).click();
  //   await page.fill(".ql-editor", "this is a product description");
  //   await page.locator(".ql-blank").waitFor({ state: "detached" });
  //   await page.locator('input[placeholder="Search"]').click();
  //   await page.waitForSelector("ul li");
  //   await page.locator("ul li", { hasText: "Uncategorized" }).click();
  //   await page.locator('input[placeholder="Search"]').press("Enter");

  //   // Upload the image by setting the file path
  //   // await page.getByText("Upload Image").click();
  //   // await page.waitForSelector('input[type="file"]');
  //   // await page
  //   //   .locator('input[type="file"]')
  //   //   .setInputFiles("../images/weDevs-color-logo.png");
  //   // await page.waitForSelector('img[src="../images/weDevs-color-logo.png"]');
  //   await page.fill("#regular-price", "100");
  //   // const shippingFree = await page.locator("#react-select-7-input");
  //   // await shippingFree.click();
  //   // await page.waitForSelector("ul li");
  //   // await page.locator("ul li", { hasText: "Standard Free" }).click();

  //   const statusArea = page.getByText("Draft");
  //   await statusArea.click();
  //   await page.getByText("Published").click();

  //   // Click the first button with "Create"
  //   await page.locator("button", { hasText: "Create" }).first().click();
  //   await page.locator("button", { hasText: "Okay" }).click();
  //   await page.waitForNavigation();
  //   expect(await page.getByText(productName)); // varify that the product is added
  // });

  test("Add to Cart functionality Dokan Plugin", async ({ page }) => {
    await page.locator('//div[contains(@class, "sidebar")]//a[p]').click();
    const latestProduct = await page.getByText(productName);
    await latestProduct.click();
    const addToCartButton = await page.locator("button", {
      hasText: "Add To Cart",
    });
    await addToCartButton.click();
  });
});
