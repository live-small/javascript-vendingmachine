import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";

export default class ProductPurchase extends Component {
    template() {
        return ProductPurchaseView([{ name: "콜라", price: 1000, quantity: 20 }], 2000, {
            500: 0,
            100: 4,
            50: 1,
            10: 0,
        });
    }
}
