import Component from "../core/Component.js";
import ProductManageView from "../template/ProductManage.js";
import { $ } from "../utils/utils.js";
import { isValidProduct } from "../utils/validator.js";

export default class ProductManage extends Component {
    template() {
        return ProductManageView(this.ProductList);
    }

    get ProductList() {
        return JSON.parse(localStorage.getItem("products"));
    }

    bindEvent() {
        $("#product-add-button").addEventListener("click", () => {
            const name = $("#product-name-input").value.trim();
            const price = $("#product-price-input").value.trim();
            const quantity = $("#product-quantity-input").value.trim();
            const newProduct = { name, price, quantity };
            if (isValidProduct(newProduct)) {
                this.setProductList(newProduct);
            }
        });
    }

    setProductList(newProduct) {
        localStorage.setItem("products", JSON.stringify([...this.ProductList, newProduct]));
        this.render();
    }
}
