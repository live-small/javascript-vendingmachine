import Init from "./template/init.js";
import Component from "./core/Component.js";
import { $ } from "./utils.js";
import ProductManage from "./components/ProductManage.js";

class VendingMachine extends Component {
    template() {
        return Init();
    }

    bindEvent() {
        $("#product-add-menu").addEventListener("click", () => {
            new ProductManage($("#detail-page"));
        });
    }
}

new VendingMachine($("#app"));
