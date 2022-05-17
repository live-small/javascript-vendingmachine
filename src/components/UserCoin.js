import { initLocalStorage, readFromLocalStorage } from "../utils/localStroage.js";

export default class UserCoin {
    constructor() {
        this.insertCoinKey = "insertCoin";
        this.returnCoinKey = "returnCoin";
        this.coinTemplate = { 500: 0, 100: 0, 50: 0, 10: 0 };
        initLocalStorage(this.returnCoinKey, { ...this.coinTemplate });
        initLocalStorage(this.insertCoinKey, 0);
    }

    get ReturnCoin() {
        return readFromLocalStorage(this.returnCoinKey);
    }

    get InsertCoin() {
        return readFromLocalStorage(this.insertCoinKey);
    }
}
