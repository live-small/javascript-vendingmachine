import { setLocalStroage } from "../utils/localStroage.js";

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

    setState(key, value) {
        setLocalStroage(key, value);
        this.render();
    }
}
