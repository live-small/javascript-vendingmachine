/* eslint-disable no-new */
import Init from "./template/init.js";
import Component from "./core/Component.js";
import ProductManage from "./components/ProductManage.js";
import CoinCharge from "./components/CoinCharge.js";
import ProductPurchase from "./components/ProductPurchase.js";
import { $ } from "./utils/utils.js";
import Product from "./components/Product.js";

class VendingMachine extends Component {
    template() {
        return Init();
    }

    bindEvent() {
        const detailPage = $("#detail-page");
        const product = new Product();

        $("#product-add-menu").addEventListener("click", () => {
            new ProductManage(detailPage, product);
        });
        $("#vending-machine-manage-menu").addEventListener("click", () => {
            new CoinCharge(detailPage);
        });
        $("#product-purchase-menu").addEventListener("click", () => {
            new ProductPurchase(detailPage, product);
        });
    }
}

new VendingMachine($("#app")).render();
