import {makeAutoObservable, action, observable, computed} from "mobx";

class ProductStore {
 
    products = [];

    constructor () { 
        makeAutoObservable(this, {
      products: observable,
      addProduct: action,
      removeProduct: action,
      loadProducts: action,
      saveProducts: action,
      productCount: computed,
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
   
    get productCount() {
    return this.products.length;
  }

}

export default new ProductStore();