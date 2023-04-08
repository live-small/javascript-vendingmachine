import TaskQueue from "./TaskQueue.js";

export default class Component {
    constructor($app) {
        this.$app = $app;
        this.taskQueue = new TaskQueue();
    }

    template() {
        return ``;
    }

    render() {
        this.$app.innerHTML = this.template();
        this.bindEvent();
    }

    commit(targetThis) {
        setTimeout(() => this.taskQueue.run(targetThis), 0);
    }

    setState(key, value) {
        this.taskQueue.addTask(key, value);
    }

    bindEvent() {}
}
