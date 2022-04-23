import Component from "../core/Component.js";
import ProductManageView from "../template/ProductManage.js";

export default class ProductManage extends Component {
    template() {
        return ProductManageView([{ name: `콜라`, price: 1000, quantity: `30` }]);
    }

    bindEvent() {}
}
