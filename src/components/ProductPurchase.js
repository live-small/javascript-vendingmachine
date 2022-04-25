import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";
import { $ } from "../utils/utils.js";
import { isValidCoinInput } from "../utils/validator.js";

export default class ProductPurchase extends Component {
    template() {
        return ProductPurchaseView(this.ProductList, this.InsertCoin, this.ReturnCoin);
    }

    bindEvent() {
        // 투입하기
        $("#charge-button").addEventListener("click", () => {
            const inputCoin = $("#charge-input").value;
            if (isValidCoinInput(inputCoin)) {
                this.setState("insertCoin", Number(inputCoin) + this.InsertCoin);
            }
        });
        // 구매하기
        $("#product-list").addEventListener("click", event => {
            const $targetProduct = event.target.closest(".product-purchase-item");
            const [, $price, $quantity] = $targetProduct.children; // 정보가 늘어나면? 위치 보장못함
            if (this.checkInsertCoin($price.dataset.productPrice)) {
                this.sellProduct($targetProduct, $quantity);
            }
        });
        // 반환하기
        $("#coin-return-button").addEventListener("click", () => {
            // 남은금액 가져와서, 돈 반환(계산, 최소한의 동전!)
        });
    }

    checkInsertCoin(needToCoin) {
        if (this.InsertCoin - needToCoin < 0) {
            return alert(
                `돈이 부족합니다. ${Math.abs(this.InsertCoin - needToCoin)}원 더 투입해주세요`
            );
        }
        return true;
    }

    sellProduct($targetProduct, $quantity) {
        // FIXME: 어떻게 하면, 불변성을 지킬 수 있을까? -> 상품명을 key로 가지는 객체 형태? -> 구조분해 할당에서 안됨.
        const { productIndex } = $targetProduct.dataset;
        const { productQuantity } = $quantity.dataset;
        const productList = this.ProductList;
        if (productList[productIndex].quantity - 1 === 0) {
            productList.splice(productIndex, 1);
        } else {
            const updateProduct = {
                ...productList[productIndex],
                quantity: productQuantity - 1,
            };
            productList.splice(productIndex, 1, updateProduct);
        }
        this.setState("products", productList);
    }

    get InsertCoin() {
        if (!localStorage.getItem("insertCoin")) {
            this.saveLocalStorage("insertCoin", 0);
        }
        return JSON.parse(localStorage.getItem("insertCoin"));
    }

    get ReturnCoin() {
        if (!localStorage.getItem("returnCoin")) {
            this.saveLocalStorage("returnCoin", { 500: 0, 100: 0, 50: 0, 10: 0 });
        }
        return JSON.parse(localStorage.getItem("returnCoin"));
    }
}
