import { makeElement } from "./view/template.js";
import productAddView from "./view/productAddView.js";
import productPurchaseView from "./view/productPurchaseView.js";
import coinManageView from "./view/coinMangeView.js";
import {
  TITLE,
  PRODUCT_MANAGE,
  COIN_MANAGE,
  PRODUCT_PURCHASE_MANAGE,
} from "./constant/vendingMachine.js";

class VendingMachine {
  constructor() {
    this.app = document.querySelector("#app");
    this.contentContainer = makeElement({ tag: "div", id: "content-container" });
  }

  turnOn() {
    const vendingMachineTitle = makeElement({ tag: "h1", innerText: TITLE });
    const menuButton = this.makeMenuButton();
    this.app.append(vendingMachineTitle, menuButton);
    menuButton.insertAdjacentElement("afterend", this.contentContainer);
  }

  makeMenuButton() {
    const buttonArea = makeElement({ tag: "div", id: "buttons" });
    const productAddMenuButton = makeElement({
      tag: "button",
      id: "product-add-menu",
      innerText: PRODUCT_MANAGE.BUTTON,
    });
    const coinManageMenuButton = makeElement({
      tag: "button",
      id: "vending-machine-manage-menu",
      innerText: COIN_MANAGE.BUTTON,
    });
    const productPurchaseMenuButton = makeElement({
      tag: "button",
      id: "product-purchase-menu",
      innerText: PRODUCT_PURCHASE_MANAGE.BUTTON,
    });

    productAddMenuButton.addEventListener("click", () => productAddView(this.contentContainer));
    coinManageMenuButton.addEventListener("click", () => coinManageView(this.contentContainer));
    productPurchaseMenuButton.addEventListener("click", () =>
      productPurchaseView(this.contentContainer)
    );

    buttonArea.append(productAddMenuButton, coinManageMenuButton, productPurchaseMenuButton);
    return buttonArea;
  }
}

const vendingMachine = new VendingMachine();
vendingMachine.turnOn();
