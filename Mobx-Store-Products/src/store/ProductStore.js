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
      updateProductDetails: action,
      setProductDetail: action,
      saveProduct: action,
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
    const newProduct = {
      id: uuidv4(),
      ...this.productDetails,
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

  updateProduct() {
    if (!this.selectedProduct) {
      return { success: false, message: 'No product selected.' };
    }

    const index = this.products.findIndex(
      (p) => p.id === this.selectedProduct.id
    );
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...this.productDetails,
      };
      this.saveProducts();
      this.resetProductDetails();
      this.selectedProduct = null;
      return { success: true, message: 'Product updated successfully.' };
    } else {
      return { success: false, message: 'Product not found.' };
    }
  }
  setSelectedProduct(product) {
    this.selectedProduct = product;
    this.productDetails = product
      ? { ...product }
      : { name: '', price: '', description: '' };
  }

  setProductDetail(field, value) {
    this.productDetails[field] = value;
  }

  resetProductDetails() {
    this.productDetails = {
      name: '',
      price: '',
      description: '',
    };
  }

  updateProductDetails(name, value) {
    if (this.selectedProduct) {
      this.selectedProduct[name] = value;
    }
    this.productDetails[name] = value;
  }

  saveProduct() {
    if (this.selectedProduct) {
      return this.updateProduct();
    } else {
      return this.addProduct();
    }
  }
  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
