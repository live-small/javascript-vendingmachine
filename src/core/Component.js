export default class Component {
    constructor($app) {
        this.$app = $app;
        this.render();
        this.setData();
    }

    template() {
        return ``;
    }

    render() {
        this.$app.innerHTML = this.template();
        this.bindEvent();
    }

    bindEvent() {}

    setData() {
        localStorage.setItem("products", JSON.stringify([]));
    }
}
