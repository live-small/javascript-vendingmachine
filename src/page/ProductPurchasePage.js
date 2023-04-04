import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";
import { setLocalStroage } from "../utils/localStroage.js";
import { $ } from "../utils/utils.js";
import { checkUserCoin, isAllUserCoinReturned, isValidCoinInput } from "../utils/validator.js";

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
            const [, $price, $quantity] = $targetProduct.children;
            const { productPrice } = $price.dataset;
            if (checkUserCoin(productPrice, this.UserCoin.InsertCoin)) {
                setLocalStroage(
                    this.UserCoin.insertCoinKey,
                    this.UserCoin.InsertCoin - productPrice
                );
                const updateProductList = this.Product.sell($targetProduct, $quantity);
                this.setState(this.Product.key, updateProductList);
            }
        });
        $("#coin-return-button").addEventListener("click", () => {
            const coinToReturn = this.UserCoin.InsertCoin;
            const [returnNumberOfCoin, numberOfCoin, insertCoin] =
                this.VendingMachineCoin.return(coinToReturn);
            setLocalStroage(this.VendingMachineCoin.key, {
                ...this.VendingMachineCoin.data,
                numberOfCoin,
            });
            setLocalStroage(this.VendingMachineCoin.key, {
                ...this.VendingMachineCoin.data,
                totalCoin: this.VendingMachineCoin.TotalCoin,
            });
            setLocalStroage(this.UserCoin.returnCoinKey, returnNumberOfCoin);
            this.setState(this.UserCoin.insertCoinKey, insertCoin);
            isAllUserCoinReturned(insertCoin);
        });
    }
}
