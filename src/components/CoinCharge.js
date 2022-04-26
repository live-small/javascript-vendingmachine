import Component from "../core/Component.js";
import CoinChargeView from "../template/CoinCharge.js";
import { $ } from "../utils/utils.js";
import { isValidCoinInput } from "../utils/validator.js";

export default class CoinCharge extends Component {
    constructor($app, VendingMachineCoin) {
        super($app);
        this.VendingMachineCoin = VendingMachineCoin;
        this.render();
    }

    template() {
        return CoinChargeView(this.VendingMachineCoin.data);
    }

    bindEvent() {
        $("#vending-machine-charge-button").addEventListener("click", () => {
            const coinToInput = $("#vending-machine-charge-input").value;
            if (isValidCoinInput(coinToInput)) {
                const updateCoinData = this.VendingMachineCoin.insert(coinToInput);
                this.saveLocalStorage(this.VendingMachineCoin.key, updateCoinData);
                this.setState(this.VendingMachineCoin.key, {
                    ...this.VendingMachineCoin.data,
                    totalCoin: this.VendingMachineCoin.TotalCoin,
                });
            }
        });
    }
}
