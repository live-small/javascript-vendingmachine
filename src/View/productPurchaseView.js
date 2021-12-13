import { LACK_OF_COIN } from "../constant/alertMessage.js";
import { PURCHASE_MANAGE } from "../constant/vendingMachine.js";
import Product from "../Model/Product.js";
import UserCoin from "../Model/UserCoin.js";
import { clearArea } from "../Model/utils.js";
import {
  makeElement,
  makeInputNumberFormToPrint,
  makeTableForm,
  makeTableRow,
  renderCoinTable,
} from "./template.js";

export default class ProductPurchaseView {
  constructor(container) {
    this.container = container;
    this.product = new Product();
    this.coinStore = new UserCoin();
  }

  render() {
    clearArea(this.container);
    this.renderInsertCoinInput();
    this.renderProductTableToBuy();
    // this.renderCoinReturnTable();
    this.bindDomElement();
    this.bindEvent();
    this.loadUserCoin();
  }

  renderInsertCoinInput() {
    const inputFormArea = makeInputNumberFormToPrint({
      TEXT: PURCHASE_MANAGE.TEXT,
      INPUT: PURCHASE_MANAGE.INPUT,
      BUTTON: PURCHASE_MANAGE.INSERT_BUTTON,
    });
    this.container.append(inputFormArea);
  }

  renderProductTableToBuy() {
    const productTableTitle = makeElement({
      tag: "h3",
      innerText: PURCHASE_MANAGE.CURRENT_PRODUCT_TO_BUY,
    });
    const productTableArea = makeTableForm(PURCHASE_MANAGE.COLUMNS, PURCHASE_MANAGE.MENU_TBODY_ID);
    this.container.append(productTableTitle, productTableArea);
    this.productMenuTableBody = document.getElementById(PURCHASE_MANAGE.MENU_TBODY_ID);
    this.renderProductList();
  }

  renderProductList() {
    clearArea(this.productMenuTableBody);
    const products = this.product.getProductData();
    if (products === null) return;

    products.forEach(product => {
      const purchaseButton = makeElement({
        tag: "button",
        type: "button",
        className: PURCHASE_MANAGE.PURCHASE_BUTTON.CLASS,
        innerText: PURCHASE_MANAGE.PURCHASE_BUTTON.TEXT,
      });
      const rowData = this.product.changeTableRowFormat(PURCHASE_MANAGE.PRODUCT_COLUMNS_CLASS, {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
      const tableRow = makeTableRow(
        rowData,
        PURCHASE_MANAGE.PRODUCT_ITEM_CLASS,
        purchaseButton,
        PURCHASE_MANAGE.DATA_SET
      );
      this.productMenuTableBody.appendChild(tableRow);
    });
  }

  bindEvent() {
    this.bindInsertButtonEvent();
    this.bindPurchaseButtonEvent();
  }

  bindDomElement() {
    this.insertCoinInput = document.getElementById(PURCHASE_MANAGE.INPUT.ID);
    this.insertAmountArea = document.getElementById(PURCHASE_MANAGE.TEXT.PRINT_AMOUNT_ID);
    this.purchaseButtons = document.querySelectorAll(`.${PURCHASE_MANAGE.PURCHASE_BUTTON.CLASS}`);
  }

  bindInsertButtonEvent() {
    const insertButton = document.getElementById(PURCHASE_MANAGE.INSERT_BUTTON.ID);
    insertButton.addEventListener("click", () => {
      this.coinStore.insert(Number(this.insertCoinInput.value));
      this.loadUserCoin();
    });
  }

  bindPurchaseButtonEvent() {
    this.purchaseButtons.forEach(purchaseButton =>
      purchaseButton.addEventListener("click", e => this.handleClickPurchaseButton(e))
    );
  }

  handleClickPurchaseButton(event) {
    const [name, price] = event.target.parentNode.children;
    if (
      this.coinStore.checkBuy(price.dataset.productPrice) &&
      this.product.checkStock(name.dataset.productName)
    ) {
      this.coinStore.pay(price.dataset.productPrice);
      this.product.sell(name.dataset.productName);
      this.loadUserCoin();
      this.renderProductList();
      this.bindDomElement();
      this.bindPurchaseButtonEvent();
    }
  }

  loadUserCoin() {
    const totalCoinToInsert = this.coinStore.getCurrentCoinToHave();
    this.insertAmountArea.innerText = totalCoinToInsert;
  }
}

// const renderCoinReturnTable = container => {
//   const coinReturnTableTitle = makeElement({
//     tag: "h3",
//     innerText: PURCHASE_MANAGE.CHARGE,
//   });
//   const returnButton = makeElement({
//     tag: "button",
//     innerText: PURCHASE_MANAGE.CHARGE_BUTTON.TEXT,
//     id: PURCHASE_MANAGE.CHARGE_BUTTON.ID,
//     type: "button",
//   });
//   container.append(coinReturnTableTitle, returnButton);
//   renderCoinTable(container, "coin-return-table-body", PURCHASE_MANAGE.COIN_TO_USE);
// };
