/* eslint-disable no-new */
import Init from "./template/init.js";
import Component from "./core/Component.js";
import ProductManage from "./page/ProductManagePage.js";
import CoinCharge from "./page/CoinChargePage.js";
import ProductPurchase from "./page/ProductPurchasePage.js";
import { $ } from "./utils/utils.js";
import Product from "./data/Product.js";
import VendingMachineCoin from "./data/VendingMachineCoin.js";
import UserCoin from "./data/UserCoin.js";

class VendingMachine extends Component {
    template() {
        return Init();
    }

    bindEvent() {
        const detailPage = $("#detail-page");
        const product = new Product();
        const vendingMachineCoin = new VendingMachineCoin();
        const userCoin = new UserCoin();

        $("#product-add-menu").addEventListener("click", () => {
            new ProductManage(detailPage, product);
        });
        $("#vending-machine-manage-menu").addEventListener("click", () => {
            new CoinCharge(detailPage, vendingMachineCoin);
        });
        $("#product-purchase-menu").addEventListener("click", () => {
            new ProductPurchase(detailPage, product, userCoin, vendingMachineCoin);
        });
    }
}

new VendingMachine($("#app")).render();
