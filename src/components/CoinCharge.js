import Component from "../core/Component.js";
import CoinChargeView from "../template/CoinCharge.js";
import { $ } from "../utils/utils.js";
import { isValidCoinInput } from "../utils/validator.js";

export default class CoinCharge extends Component {
    // 동전
    // 자판기 동전 충전(<-투입하기)
    // 자판기 총 보유동전 계산 (<- 자판기 동전개수)
    // 자판기 동전개수 누적계산
    // 자판기 동전개수 수정(<-반환하기에서 반환된 동전개수 빼줘야함)
    // 사용자 동전 투입
    // 반환된 동전 가져오기
    template() {
        return CoinChargeView(this.VendingMachineCoin);
    }

    get TotalCoin() {
        const { numberOfCoin } = this.VendingMachineCoin;
        let totalCoin = 0;
        for (const [unit, amount] of Object.entries(numberOfCoin)) {
            totalCoin += unit * amount;
        }
        return totalCoin;
    }

    bindEvent() {
        $("#vending-machine-charge-button").addEventListener("click", () => {
            const coinToInput = $("#vending-machine-charge-input").value;
            if (isValidCoinInput(coinToInput)) {
                const newCoins = this.generateCoinRandomly(coinToInput);
                const numberOfCoin = this.calculateNumberOfCoin(newCoins);
                this.setState("vendingMachineCoin", {
                    ...this.VendingMachineCoin,
                    numberOfCoin,
                });
                this.setState("vendingMachineCoin", {
                    ...this.VendingMachineCoin,
                    totalCoin: this.TotalCoin,
                });
            }
        });
    }

    generateCoinRandomly(coinToInput) {
        // 누적해서 더하려면, 어떤 형태로 저장하는 게 좋을까 -> 객체 간 누적?
        const newCoins = { 500: 0, 100: 0, 50: 0, 10: 0 };
        while (coinToInput > 0) {
            const randomCoin = MissionUtils.Random.pickNumberInList([500, 100, 50, 10]);
            if (coinToInput - randomCoin >= 0) {
                coinToInput -= randomCoin;
                newCoins[randomCoin] += 1;
            }
        }
        return newCoins;
    }

    calculateNumberOfCoin(newCoins) {
        // {500:0, 100:2, 50:3, 10:10}, {500:1, 100:0, 50:1, 10:3} -> 누적해서 만들기 -> reduce ?
        // 불변성을 지키기, 새로운 객체를 만들어서 리턴하고 싶어
        // key로 직접 접근해서 하나하나 더하는 것보단, key를 알 필요 없이 알아서 같은 키끼리 더해졌으면 해
        const coinTemplate = { 500: 0, 100: 0, 50: 0, 10: 0 };
        for (const coin in coinTemplate) {
            const coinUnit = [this.VendingMachineCoin.numberOfCoin, newCoins].reduce(
                (prev, curr) => curr[coin] + prev[coin]
            );
            coinTemplate[coin] = coinUnit;
        }
        return coinTemplate;
    }
}
