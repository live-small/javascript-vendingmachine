import { setLocalStorage } from "../utils/localStorage.js";

export default class TaskQueue {
    constructor() {
        this.tasks = [];
    }

    addTask(key, value) {
        if (key == null || value == null) return;

        this.tasks.push({ key, value });
    }

    run(targetThis) {
        if (!this.tasks.length) return;

        this.tasks.forEach(({ key, value }) => {
            setLocalStorage(key, value);
        });
        this.tasks = [];
        targetThis.render();
    }
}
