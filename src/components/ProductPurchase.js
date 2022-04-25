import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";
import { $ } from "../utils/utils.js";
import { isValidCoinInput } from "../utils/validator.js";

export default class ProductPurchase extends Component {
    constructor($app, Product, UserCoin, VendingMachineCoin) {
        super($app);
        this.Product = Product;
        this.UserCoin = UserCoin;
        this.VendingMachineCoin = VendingMachineCoin;
        this.render();
    }

    template() {
        return ProductPurchaseView(
            this.Product.list,
            this.UserCoin.InsertCoin,
            this.UserCoin.ReturnCoin
        );
    }

    bindEvent() {
        // 투입하기
        $("#charge-button").addEventListener("click", () => {
            const inputCoin = $("#charge-input").value;
            if (isValidCoinInput(inputCoin)) {
                this.setState(
                    this.UserCoin.insertCoinKey,
                    Number(inputCoin) + this.UserCoin.InsertCoin
                );
            }
        });
        $("#product-list").addEventListener("click", event => {
            const $targetProduct = event.target.closest(".product-purchase-item");
            const [, $price, $quantity] = $targetProduct.children; // 정보가 늘어나면? 위치 보장못함
            const { productPrice } = $price.dataset;
            if (this.checkInsertCoin(productPrice)) {
                // 투입한 돈 - 상품가격
                this.setState(this.UserCoin.insertCoinKey, this.UserCoin.InsertCoin - productPrice);
                // 보유동전 + 상품가격
                const updateCoinData = this.VendingMachineCoin.insert(productPrice);
                this.setState(this.VendingMachineCoin.key, updateCoinData);
                this.setState(this.VendingMachineCoin.key, {
                    ...this.VendingMachineCoin.data,
                    totalCoin: this.VendingMachineCoin.TotalCoin,
                });
                // 상품재고 수정
                const updateProductList = this.Product.sell($targetProduct, $quantity);
                this.setState(this.Product.key, updateProductList);
            }
        });
        // 반환하기
        $("#coin-return-button").addEventListener("click", () => {
            // 남은금액 가져와서, 돈 반환(계산, 최소한의 동전!) -> 자판기 동전 업데이트
            // 반환 처리 <- 자판기 동전
            // 자판기 동전 업데이트
        });
    }

    checkInsertCoin(needToCoin) {
        if (this.UserCoin.InsertCoin - needToCoin < 0) {
            return alert(
                `돈이 부족합니다. ${Math.abs(
                    this.UserCoin.InsertCoin - needToCoin
                )}원 더 투입해주세요`
            );
        }
        return true;
    }
}
