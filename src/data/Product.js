import { initLocalStorage, readFromLocalStorage } from "../utils/localStorage.js";

export default class Product {
    constructor() {
        this.key = "products";
        initLocalStorage(this.key, []);
    }

    get list() {
        return readFromLocalStorage(this.key);
    }

    add(newProduct) {
        return [...this.list, newProduct];
    }

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

    deleteTargetProduct(productKey) {
        const currentProductList = this.list;
        currentProductList.splice(productKey, 1);
        return currentProductList;
    }
}
