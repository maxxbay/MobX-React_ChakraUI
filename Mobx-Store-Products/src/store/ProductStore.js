import {makeAutoObservable} from "mobx";

class ProductStore {
 
    products = [];

    constructor () { 
        makeAutoObservable(this);
    }
    
    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(id) {
        this.products.splice(id, 1);
    }

}

export default new ProductStore();