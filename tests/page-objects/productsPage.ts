import { Page } from "@playwright/test";
import { generateProduct } from "../util/faker";

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addProduct() {
    const fakerProduct = generateProduct();
    const {
      title,
      description,
      image,
      regular_price,
      sale_price,
      sku,
      barcode,
      weight,
      dimensions,
    } = fakerProduct;

    let type = "Standard";

    await this.page.getByRole("link", { name: "Add Product" }).click();
    // await this.page.fill("#product-name", title);
    // const productType = this.page.getByRole("radio", { name: type });
    // await productType.click();
    // await this.page.fill(".ql-editor", description);
    // await this.page.locator(".ql-blank").waitFor({ state: "detached" });

    // // await page.locator('input[placeholder="Search"]').click();
    // await this.selectCategory("Uncategorized");

    // await this.page.fill("#regular-price", regular_price.toString());
    // await this.page.fill("#sale-price", sale_price.toString());
    // await this.page.fill("#sku", sku);
    // await this.page.fill("#low-stock-threshold", barcode);
    await this.selectShipping("Standard Free");
  }

  //helper for select categories..

  async selectCategory(categoryName: string = "Uncategorized") {
    const categoryInput = this.page.locator('input[placeholder="Search"]');
    await categoryInput.click();
    await this.page.waitForSelector("ul li", {
      state: "visible",
    });
    // Click the desired category option
    const categoryOption = this.page.locator("ul li", {
      hasText: categoryName,
    });
    await categoryOption.click();
  }
  async selectShipping(name: string) {
    // Click the dropdown to open options
    const shippingDropdown = this.page.locator(".css-15t20dc-control"); // Adjust this if necessary
    await shippingDropdown.click();

    // Wait for the options list to appear
    await this.page.waitForSelector('[role="listbox"]', { state: "visible" });

    // Select the desired option
    const option = this.page.getByRole("option", { name: name });
    await option.click();
  }
}
