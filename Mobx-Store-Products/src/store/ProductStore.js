import {makeAutoObservable, action} from "mobx";

class ProductStore {
 
    products = [];

    constructor () { 
        makeAutoObservable(this, {
      addProduct: action,
      removeProduct: action,
      loadProducts: action,
      saveProducts: action
    });
        this.loadProducts();
    }
     loadProducts() {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  saveProducts() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

    
    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }

    removeProduct(id) {
        this.products.splice(id, 1);
        this.saveProducts();
    }

}

export default new ProductStore();