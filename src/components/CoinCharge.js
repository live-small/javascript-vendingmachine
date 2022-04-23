import Component from "../core/Component.js";
import CoinChargeView from "../template/CoinCharge.js";

export default class CoinCharge extends Component {
    template() {
        return CoinChargeView(450, { 500: 0, 100: 4, 50: 1, 10: 0 });
    }
}
