import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";
import { $ } from "../utils/utils.js";
import { isValidCoinInput } from "../utils/validator.js";

export default class ProductPurchase extends Component {
    template() {
        return ProductPurchaseView(this.ProductList, this.InsertCoin, {
            500: 0,
            100: 4,
            50: 1,
            10: 0,
        });
    }

    bindEvent() {
        // 투입하기
        $("#charge-button").addEventListener("click", () => {
            const inputCoin = $("#charge-input").value;
            if (isValidCoinInput(inputCoin)) {
                this.setInsertCoin(Number(inputCoin));
            }
        });
        // 구매하기
        $(".purchase-button").addEventListener("click", () => {
            // dataset 이용 -> 로컬스토리지 업데이트
        });
        // 반환하기
        $("#coin-return-button").addEventListener("click", () => {
            // 남은금액 가져와서, 돈 반환하기
        });
    }

    get InsertCoin() {
        if (!localStorage.getItem("insertCoin")) {
            this.saveLocalStorage("insertCoin", 0);
        }
        return JSON.parse(localStorage.getItem("insertCoin"));
    }

    setInsertCoin(coin) {
        this.saveLocalStorage("insertCoin", this.InsertCoin + coin);
        this.render();
    }
}
