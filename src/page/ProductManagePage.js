import Component from "../core/Component.js";
import ProductManageView from "../template/ProductManage.js";
import { $ } from "../utils/utils.js";
import { isValidProduct } from "../utils/validator.js";

export default class ProductManage extends Component {
    constructor($app, Product) {
        super($app);
        this.Product = Product;
        this.render();
    }

    template() {
        return ProductManageView(this.Product.list);
    }

    bindEvent() {
        $("#product-add-button").addEventListener("click", () => {
            const name = $("#product-name-input").value.trim();
            const price = $("#product-price-input").value.trim();
            const quantity = $("#product-quantity-input").value.trim();
            const newProduct = { name, price, quantity };
            if (isValidProduct(newProduct)) {
                const updateProductList = this.Product.add(newProduct);
                this.setState(this.Product.key, updateProductList);
                this.commit(this);
            }
        });
        $("#product-manage-list").addEventListener("click", event => {
            if (confirm(`정말 삭제하시겠습니까?`) === true) {
                const { productManageKey } = event.target.closest(".product-manage-item").dataset;
                const updateProductList = this.Product.deleteTargetProduct(productManageKey);
                this.setState(this.Product.key, updateProductList);
                this.commit(this);
            }
        });
    }
}
