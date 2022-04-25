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

    // update
    sell($targetProduct, $quantity) {
        const { productIndex } = $targetProduct.dataset;
        const { productQuantity } = $quantity.dataset;
        const productList = this.list;
        if (productList[productIndex].quantity - 1 === 0) {
            productList.splice(productIndex, 1);
        } else {
            const updateProduct = {
                ...productList[productIndex],
                quantity: productQuantity - 1,
            };
            productList.splice(productIndex, 1, updateProduct);
        }
        return productList;
    }
}
