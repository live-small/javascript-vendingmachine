export default class UserCoin {
    constructor() {
        this.insertCoinKey = "insertCoin";
        this.returnCoinKey = "returnCoin";
        this.coinTemplate = { 500: 0, 100: 0, 50: 0, 10: 0 };
    }

    get ReturnCoin() {
        if (!localStorage.getItem(this.returnCoinKey)) {
            localStorage.setItem(this.returnCoinKey, JSON.stringify({ ...this.coinTemplate }));
        }
        return JSON.parse(localStorage.getItem(this.returnCoinKey));
    }

    get InsertCoin() {
        // 반복되는 데, 어디 분리할 수 없을까!
        if (!localStorage.getItem(this.insertCoinKey)) {
            localStorage.setItem(this.insertCoinKey, JSON.stringify(0));
        }
        return JSON.parse(localStorage.getItem(this.insertCoinKey));
    }

    // 잔돈 반환 (최소한의 동전만 반환)
    // 구매하기 -> 투입한돈 - 구매가격 && 보유동전 + 구매가격 -> 잔돈반환
}
