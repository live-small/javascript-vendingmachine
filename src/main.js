import Init from "./template/init.js";
import Component from "./core/Component.js";
import { $ } from "./utils.js";
import ProductManage from "./components/ProductManage.js";
import CoinCharge from "./components/CoinCharge.js";

class VendingMachine extends Component {
    template() {
        return Init();
    }

    bindEvent() {
        const detailPage = $("#detail-page");
        $("#product-add-menu").addEventListener("click", () => {
            new ProductManage(detailPage);
        });
        $("#vending-machine-manage-menu").addEventListener("click", () => {
            new CoinCharge(detailPage);
        });
    }
}

new VendingMachine($("#app"));
