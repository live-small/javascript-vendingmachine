import Component from "../core/Component.js";
import ProductPurchaseView from "../template/ProductPurchase.js";
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
                this.setState(this.UserCoin.insertCoinKey, this.UserCoin.insert(Number(inputCoin)));
                this.commit(this);
            }
        });
        $("#product-list").addEventListener("click", event => {
            const $targetProduct = event.target.closest(".product-purchase-item");
            const [, $price, $quantity] = $targetProduct.children;
            const { productPrice } = $price.dataset;
            if (checkUserCoin(productPrice, this.UserCoin.InsertCoin)) {
                const updateProductList = this.Product.sell($targetProduct, $quantity);
                this.setState(this.Product.key, updateProductList);
                this.setState(this.UserCoin.insertCoinKey, this.UserCoin.buy(productPrice));
                this.commit(this);
            }
        });
        $("#coin-return-button").addEventListener("click", () => {
            const coinToReturn = this.UserCoin.InsertCoin;
            const [returnNumberOfCoin, numberOfCoin, insertCoin] =
                this.VendingMachineCoin.return(coinToReturn);
            this.setState(this.VendingMachineCoin.key, {
                numberOfCoin,
                totalCoin: this.VendingMachineCoin.getTotalCoin(numberOfCoin),
            });
            this.setState(this.UserCoin.returnCoinKey, returnNumberOfCoin);
            this.setState(this.UserCoin.insertCoinKey, insertCoin);

            isAllUserCoinReturned(insertCoin);
            this.commit(this);
        });
    }
}
