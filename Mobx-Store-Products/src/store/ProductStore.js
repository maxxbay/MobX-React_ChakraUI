import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { toastError } from '../toastUtils';

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

  // loadProducts() {
  //   const savedProducts = localStorage.getItem('products');
  //   this.products = savedProducts ? JSON.parse(savedProducts) : [];
  // }

  loadProducts() {
    try {
      const savedProducts = localStorage.getItem('products');
      this.products = savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      toastError(`Loading products failed: ${error.message}`);
    }
  }

  // saveProducts() {
  //   localStorage.setItem('products', JSON.stringify(this.products));
  // }

  saveProducts() {
    try {
      localStorage.setItem('products', JSON.stringify(this.products));
    } catch (error) {
      toastError(`Saving products failed: ${error.message}`);
    }
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
      const isChanged = Object.keys(updatedDetails).some(
        (key) => this.products[index][key] !== updatedDetails[key]
      );
      if (!isChanged) {
        toastError('No changes detected. The product was not updated.');
        return {
          success: false,
          message: 'No changes detected. The product was not updated.',
        };
      }

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
