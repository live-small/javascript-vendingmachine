// react component처럼 useState, useEffect 구현해서 쓸 수 있도록
export default class Component {
    constructor($app) {
        this.$app = $app;
        this.render();
    }

    template() {
        return ``;
    }

    render() {
        this.$app.innerHTML = this.template();
        this.bindEvent();
    }

    bindEvent() {}

    saveLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    setState(key, value) {
        this.saveLocalStorage(key, value);
        this.render();
    }

    get ProductList() {
        if (!localStorage.getItem("products")) {
            this.saveLocalStorage("products", []);
        }
        return JSON.parse(localStorage.getItem("products"));
    }

    get VendingMachineCoin() {
        if (!localStorage.getItem("vendingMachineCoin")) {
            this.saveLocalStorage("vendingMachineCoin", {
                totalCoin: 0,
                numberOfCoin: { 500: 0, 100: 0, 50: 0, 10: 0 },
            });
        }
        return JSON.parse(localStorage.getItem("vendingMachineCoin"));
    }
}
