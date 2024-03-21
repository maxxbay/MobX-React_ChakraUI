import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { toastError, toastSuccess } from '../toastUtils';

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

  getProductIndex() {
    return this.products.findIndex(
      (product) => product.id === this.selectedProduct?.id
    );
  }

  hasChanges() {
    const index = this.getProductIndex();
    if (index === -1 || !this.selectedProduct) return false;
    const isChanged = Object.keys(this.selectedProduct).some((key) => {
      return this.products[index][key] !== this.selectedProduct[key];
    });
    return isChanged;
  }

  // loadProducts() {
  //   try {
  //     const savedProducts = localStorage.getItem('products');
  //     this.products = savedProducts ? JSON.parse(savedProducts) : [];
  //   } catch (error) {
  //     toastError(`Loading products failed: ${error.message}`);
  //   }
  // }

  loadProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      this.products = data
        .map(({ id, title, price, description }) => ({
          id,
          name: title,
          price,
          description,
        }))
        .sort((a, b) => b.id - a.id);
    } catch (error) {
      toastError(`Loading products from API failed: ${error.message}`);
    }
  };

  saveProducts() {
    try {
      localStorage.setItem('products', JSON.stringify(this.products));
    } catch (error) {
      toastError(`Saving products failed: ${error.message}`);
    }
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  clearSelectedProduct() {
    this.selectedProduct = null;
  }

  addProduct(productDetails) {
    const newProduct = { id: uuidv4(), ...productDetails };
    this.products.push(newProduct);
    this.saveProducts();
    this.clearSelectedProduct();
    toastSuccess(`Product added successfully.`);
  }

  updateProduct() {
    const index = this.getProductIndex();
    this.products[index] = { ...this.products[index], ...this.selectedProduct };
    this.saveProducts();
    this.clearSelectedProduct();
    toastSuccess(`Product updated successfully.`);
  }

  saveProduct(productDetails) {
    const index = this.products.findIndex(
      (product) => product.id === this.selectedProduct?.id
    );

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productDetails };
      toastSuccess(`Product updated successfully.`);
    } else {
      const newProduct = { id: uuidv4(), ...productDetails };
      this.products.push(newProduct);
      toastSuccess(`Product added successfully.`);
    }

    this.saveProducts();
    this.clearSelectedProduct();
  }

  setSelectedProduct(product) {
    this.selectedProduct = product ? { ...product } : null;
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
