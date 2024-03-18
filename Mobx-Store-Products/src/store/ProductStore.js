import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class ProductStore {
  products = [];
  selectedProduct = null;
  productDetails = {};

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      loadProducts: action,
      saveProducts: action,
      resetProductDetails: action,
      addProduct: action,
      removeProduct: action,
      updateProduct: action,
      productCount: computed,
      selectedProduct: observable,
      setSelectedProduct: action,
      saveProduct: action,
      setProductDetail: action,
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

  resetProductDetails() {
    this.selectedProduct = null;
    this.productDetails = {};
  }

  addProduct(productDetails) {
    const newProduct = {
      id: uuidv4(),
      ...productDetails,
    };
    this.products.push(newProduct);
    this.saveProducts();
    this.resetProductDetails();
    return { success: true, message: 'Product added successfully.' };
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  updateProduct(productDetails) {
    if (!this.selectedProduct) {
      return { success: false, message: 'No product selected for updating.' };
    }

    const productIndex = this.products.findIndex(
      (product) => product.id === this.selectedProduct.id
    );
    if (productIndex === -1) {
      return { success: false, message: 'Product not found.' };
    }

    const isChanged = Object.keys(productDetails).some(
      (key) => this.products[productIndex][key] !== productDetails[key]
    );
    if (!isChanged) {
      return {
        success: false,
        message:
          'No changes detected. To save changes, modify the details first.',
      };
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...productDetails,
    };
    this.saveProducts();
    this.resetProductDetails();
    return { success: true, message: 'Product updated successfully.' };
  }
  setProductDetail(field, value) {
    this.productDetails[field] = value;
  }

  setSelectedProduct(product) {
    this.selectedProduct = product;
    if (product) {
      this.productDetails = { ...product };
    } else {
      this.productDetails = {};
    }
  }
  saveProduct(productDetails) {
    const fieldsRequired = ['name', 'price', 'description']; // Update as necessary
    const hasAllFields = fieldsRequired.every(
      (field) => field in productDetails
    );
    if (!hasAllFields) {
      return { success: false, message: 'All fields are required.' };
    }

    if (this.selectedProduct) {
      return this.updateProduct(productDetails);
    } else {
      return this.addProduct(productDetails);
    }
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
