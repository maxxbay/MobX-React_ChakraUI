import { makeAutoObservable, action, observable, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class ProductStore {
  products = [];
  selectedProduct = null;
  productDetails = {
    name: '',
    price: '',
    description: '',
  };

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
      resetProductDetails: action,
      setProductName: observable,
      setProductPrice: observable,
      setProductDescription: observable,
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

  addProduct() {
    const newProduct = { id: uuidv4(), ...this.productDetails };
    this.products.push(newProduct);
    this.saveProducts();
    this.resetProductDetails();
  }

  removeProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  updateProduct() {
    const product = this.selectedProduct;
    if (product) {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = {
          ...product,
          ...this.productDetails,
        };
        this.saveProducts();
      }
    }
    this.resetProductDetails();
  }

  setSelectedProduct(product) {
    this.selectedProduct = product;
    if (product) {
      this.productDetails = { ...product };
    } else {
      this.resetProductDetails();
    }
  }

  resetProductDetails() {
    this.productDetails = {
      name: '',
      price: '',
      description: '',
    };
  }

  setProductName(name) {
    this.productDetails.name = name;
  }
  setProductPrice(price) {
    this.productDetails.price = price;
  }
  setProductDescription(description) {
    this.productDetails.description = description;
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
