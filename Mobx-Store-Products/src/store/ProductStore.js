import { makeAutoObservable, action, observable, computed } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { toastError, toastSuccess } from "../toastUtils";

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
    const isChanged =
      this?.selectedProduct &&
      Object.keys(this.selectedProduct).some(
        (key) => this.products[index][key] !== this.selectedProduct[key]
      );
    return isChanged;
  }

  loadProducts() {
    try {
      const savedProducts = localStorage.getItem("products");
      this.products = savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      toastError(`Loading products failed: ${error.message}`);
    }
  }

  saveProducts() {
    try {
      localStorage.setItem("products", JSON.stringify(this.products));
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
    this.saveProducts();
    this.clearSelectedProduct();
    this.products.push(newProduct);
    toastSuccess(`Product added successfully.`);
  }

  updateProduct() {
    const index = this.getProductIndex();
    this.products[index] = { ...this.products[index], ...this.selectedProduct };
    this.saveProducts();
    this.clearSelectedProduct();
    toastSuccess(`Product updated successfully.`);
  }

  saveProduct() {
    if (this.selectedProduct.id) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  setSelectedProduct(product) {
    this.selectedProduct = product ? { ...product } : null;
  }

  get productCount() {
    return this.products.length;
  }
}

export default ProductStore;
