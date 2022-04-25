// react component처럼 useState, useEffect 등을 구현해서 쓸 수 있도록
export default class Component {
    constructor($app) {
        this.$app = $app;
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
}
