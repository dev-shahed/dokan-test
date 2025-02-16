import { ProductCheckout } from "./ProductCheckout";
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
  readonly productCheckout: ProductCheckout;
  readonly confirmOrder: VendorPage;
  constructor(page: Page) {
    this.page = page;
    this.navigatePage = new NavigatePage(page);
    this.loginPage = new LoginPage(page);
    this.vendorPage = new VendorPage(page);
    this.productPage = new ProductPage(page);
    this.productCheckout = new ProductCheckout(page);
    this.confirmOrder = new VendorPage(page)
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

  makeCheckout() {
    return this.productCheckout;
  }

  orderConfirmation() {
    return this.confirmOrder;
  }
}
