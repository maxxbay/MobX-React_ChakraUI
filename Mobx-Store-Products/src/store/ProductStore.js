import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class ProductStore {
  products = [];
  selectedProduct = null;

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      loadProducts: action,
      saveProducts: action,
      clearSelectedProduct: action,
      addProduct: action,
      resetProductDetails: action,
      removeProduct: action,
      updateProduct: action,
      selectedProduct: observable,
      productCount: computed,
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

  clearSelectedProduct() {
    this.selectedProduct = null;
  }

  resetProductDetails() {
    this.setSelectedProduct({ name: '', price: '', description: '' });
  }
  addProduct(productDetails) {
    const newProduct = { id: uuidv4(), ...productDetails };
    this.products.push(newProduct);
    this.saveProducts();
    this.clearSelectedProduct();
    return { success: true, message: 'Product added successfully.' };
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  updateProduct(id, updatedDetails) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedDetails };
      this.saveProducts();
      this.clearSelectedProduct();
      return { success: true, message: 'Product updated successfully.' };
    }
    return { success: false, message: 'Product not found.' };
  }

  setSelectedProduct(product) {
    this.selectedProduct = product ? { ...product } : null;
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
