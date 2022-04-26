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
                this.saveLocalStorage(
                    this.UserCoin.insertCoinKey,
                    this.UserCoin.InsertCoin - productPrice
                );
                // 상품재고 수정
                const updateProductList = this.Product.sell($targetProduct, $quantity);
                this.setState(this.Product.key, updateProductList);

                // TODO: 보유동전 + 상품가격 <- 여기서 문제생김.
                // 왜? 테스트코드를 보면, 상품을 팔고 남은 돈은 자판기 보유동전과 별개로 관리함.
                // const updateCoinData = this.VendingMachineCoin.insert(productPrice);
                // this.saveLocalStorage(this.VendingMachineCoin.key, updateCoinData);
                // this.saveLocalStorage(this.VendingMachineCoin.key, {
                //     ...this.VendingMachineCoin.data,
                //     totalCoin: this.VendingMachineCoin.TotalCoin,
                // });
            }
        });
        // 반환하기
        $("#coin-return-button").addEventListener("click", () => {
            const coinToReturn = this.UserCoin.InsertCoin;
            const [returnNumberOfCoin, numberOfCoin, insertCoin] =
                this.VendingMachineCoin.return(coinToReturn);
            if (this.giveAllReturnCoin(insertCoin)) {
                this.setState(this.VendingMachineCoin.key, {
                    ...this.VendingMachineCoin.data,
                    numberOfCoin,
                });
                this.setState(this.VendingMachineCoin.key, {
                    ...this.VendingMachineCoin.data,
                    totalCoin: this.VendingMachineCoin.TotalCoin,
                });
                this.setState(this.UserCoin.returnCoinKey, returnNumberOfCoin);
                this.setState(this.UserCoin.insertCoinKey, insertCoin);
            }
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

    giveAllReturnCoin(change) {
        if (change !== 0) {
            return alert(
                `자판기에 동전이 없습니다. 010-1234-5678로 전화주시면 해결해드리겠습니다.`
            );
        }
        return true;
    }
}
