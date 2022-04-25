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

    return(coinToReturn) {
        const returnNumberOfCoin = { ...this.coinTemplate };
        const haveNumberOfCoin = { ...this.data.numberOfCoin };
        const coinKinds = Object.keys(haveNumberOfCoin).reverse();
        // coinKinds로 4번에 끝낸다.
        for (const unit of coinKinds) {
            // TODO: 왜 10 50 100 500으로 저장될까? 로컬스토리지 쓰면, 자동 정렬되나?
            if (!coinToReturn) break;
            const needCoinCount = Math.floor(coinToReturn / unit);
            const count = Math.min(needCoinCount, haveNumberOfCoin[unit]);
            // 필요한 개수 5, 가진 개수 3 -> 3
            // 필요한 개수 1, 가진 개수 3 -> 1 : 즉, 최소개수만 이용하면된다.
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
