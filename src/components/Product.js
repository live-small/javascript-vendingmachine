export default class Product {
    constructor() {
        this.key = "products";
    }

    // read
    get list() {
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem(this.key));
    }

    // add
    add(newProduct) {
        return [...this.list, newProduct];
    }
}
