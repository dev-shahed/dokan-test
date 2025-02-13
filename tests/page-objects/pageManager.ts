import { ProductPage } from "./productsPage";
import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { VendorPage } from "./vendorPage";
import { NavigatePage } from "./NavigatePage";

export class PageManager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly vendorPage: VendorPage;
  readonly navigatePage: NavigatePage;
  readonly productPage: ProductPage;
  constructor(page: Page) {
    this.page = page;
    this.navigatePage = new NavigatePage(page);
    this.loginPage = new LoginPage(page);
    this.vendorPage = new VendorPage(page);
    this.productPage = new ProductPage(page);
  }

  navigateTo() {
    return this.navigatePage;
  }

  loginTo() {
    return this.loginPage;
  }

  vendor() {
    return this.vendorPage;
  }

  product() {
    return this.productPage;
  }
}
