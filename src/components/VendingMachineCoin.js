import { initLocalStorage, readFromLocalStorage } from "../utils/localStroage.js";

export default class VendingMachineCoin {
    constructor() {
        this.key = "vendingMachineCoin";
        this.coinTemplate = { 500: 0, 100: 0, 50: 0, 10: 0 };
        initLocalStorage(this.key, {
            totalCoin: 0,
            numberOfCoin: { ...this.coinTemplate },
        });
    }

    get data() {
        return readFromLocalStorage(this.key);
    }

    get TotalCoin() {
        const { numberOfCoin } = this.data;
        let totalCoin = 0;
        for (const [unit, amount] of Object.entries(numberOfCoin)) {
            totalCoin += unit * amount;
        }
        return totalCoin;
    }

    insert(coinToInput) {
        const newCoins = this.generateCoinRandomly(coinToInput);
        const numberOfCoin = this.accumulateNumberOfCoin(newCoins);
        return {
            ...this.data,
            numberOfCoin,
        };
    }

    return(coinToReturn) {
        const returnNumberOfCoin = { ...this.coinTemplate };
        const haveNumberOfCoin = { ...this.data.numberOfCoin };
        const coinKinds = Object.keys(haveNumberOfCoin).reverse();
        for (const unit of coinKinds) {
            if (!coinToReturn) break;
            const needCoinCount = Math.floor(coinToReturn / unit);
            const count = Math.min(needCoinCount, haveNumberOfCoin[unit]);
            coinToReturn -= unit * count;
            returnNumberOfCoin[unit] += count;
            haveNumberOfCoin[unit] -= count;
        }
        return [returnNumberOfCoin, haveNumberOfCoin, coinToReturn];
    }

    generateCoinRandomly(coinToInput) {
        const coinTemplate = { ...this.coinTemplate };
        while (coinToInput > 0) {
            const coinKinds = Object.keys(coinTemplate).map(unit => Number(unit));
            const randomCoin = MissionUtils.Random.pickNumberInList(coinKinds);
            if (coinToInput - randomCoin >= 0) {
                coinToInput -= randomCoin;
                coinTemplate[randomCoin] += 1;
            }
        }
        return coinTemplate;
    }

    accumulateNumberOfCoin(newCoins) {
        const coinTemplate = { ...this.coinTemplate };
        for (const unit in coinTemplate) {
            const count = [this.data.numberOfCoin, newCoins].reduce(
                (prev, curr) => curr[unit] + prev[unit]
            );
            coinTemplate[unit] = count;
        }
        return coinTemplate;
    }
}
