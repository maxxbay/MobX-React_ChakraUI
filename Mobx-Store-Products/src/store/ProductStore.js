import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class ProductStore {
  products = [];
  selectedProduct = null;

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      addProduct: action,
      removeProduct: action,
      loadProducts: action,
      saveProducts: action,
      updateProduct: action,
      productCount: computed,
      selectedProduct: observable,
      setSelectedProduct: action,
    });
    this.loadProducts();
  }
  loadProducts() {
    const savedProducts = localStorage.getItem('products');
    this.products = savedProducts ? JSON.parse(savedProducts) : [];
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct(product) {
    const newProduct = { ...product, id: uuidv4() };
    this.products.push(newProduct);
    this.saveProducts();
  }

  removeProduct(id) {
    this.products.splice(id, 1);
    // this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  // updateProduct(index, updatedProduct) {
  //   this.products[index] = { ...this.products[index], ...updatedProduct };
  //   this.saveProducts();
  // }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updatedProduct,
      };
      this.saveProducts();
    }
  }

  setSelectedProduct(product) {
    this.selectedProduct = product;
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
