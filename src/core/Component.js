export default class Component {
    constructor($app) {
        this.$app = $app;
        this.render();
        this.bindEvent();
    }

    template() {
        return ``;
    }

    render() {
        this.$app.innerHTML = this.template();
    }

    bindEvent() {}
}
