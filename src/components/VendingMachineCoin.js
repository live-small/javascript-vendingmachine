export default class VendingMachineCoin {
    constructor() {
        this.key = "vendingMachineCoin";
        this.coinTemplate = { 500: 0, 100: 0, 50: 0, 10: 0 };
    }

    get data() {
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(
                this.key,
                JSON.stringify({
                    totalCoin: 0,
                    numberOfCoin: { ...this.coinTemplate },
                })
            );
        }
        return JSON.parse(localStorage.getItem(this.key));
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
