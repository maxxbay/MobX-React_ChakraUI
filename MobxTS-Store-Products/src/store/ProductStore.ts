/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  makeAutoObservable,
  runInAction,
  action,
  observable,
  computed,
} from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../types';
import { toastError, toastSuccess } from '../toastUtils';

interface APIProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

class ProductStore {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      loadProducts: action,
      saveProducts: action,
      clearSelectedProduct: action,
      addProduct: action,
      removeProduct: action,
      updateProduct: action,
      selectedProduct: observable,
      productCount: computed,
      setSelectedProduct: action,
      updateSelectedProductField: action,
    });
    this.loadProducts();
  }

  getProductIndex = (): number => {
    return this.products.findIndex(
      (product) => product.id === this.selectedProduct?.id
    );
  };

  hasChanges = (): boolean => {
    const index = this.getProductIndex();
    if (index === -1 || !this.selectedProduct) return false;
    return Object.keys(this.selectedProduct).some((key) => {
      return (
        this.products[index][key as keyof Product] !==
        this.selectedProduct![key as keyof Product]
      );
    });
  };

  loadProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data: APIProduct[] = await response.json();
      runInAction(() => {
        this.products = data
          .map(({ id, title, price, description, category }) => ({
            id: id.toString(),
            name: title,
            price,
            description,
            category,
          }))
          .sort((a, b) => b.id.localeCompare(a.id));
      });
    } catch (error: unknown) {
      let errorMessage = 'An error occurred';
      if (error instanceof Error) errorMessage = error.message;
      toastError(`Loading products from API failed: ${errorMessage}`);
    }
  };

  saveProducts = () => {
    try {
      localStorage.setItem('products', JSON.stringify(this.products));
    } catch (error: unknown) {
      let message = 'An unexpected error occurred';
      if (error instanceof Error) message = error.message;
      toastError(`Saving products failed: ${message}`);
    }
  };

  removeProduct = (id: string) => {
    runInAction(() => {
      this.products = this.products.filter((product) => product.id !== id);
      this.saveProducts();
    });
  };

  clearSelectedProduct = () => {
    runInAction(() => {
      this.selectedProduct = null;
    });
  };

  setSelectedProduct = (product: Product | null): void => {
    runInAction(() => {
      this.selectedProduct = product;
    });
  };

  addProduct = (productDetails: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: uuidv4(),
      ...productDetails,
    };
    runInAction(() => {
      this.products.push(newProduct);
      this.selectedProduct = null;
      toastSuccess('Product added successfully.');
    });
  };

  updateProduct = (updatedProduct: Product) => {
    const index = this.getProductIndex();
    if (index !== -1) {
      runInAction(() => {
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
        this.clearSelectedProduct();
        toastSuccess(`Product updated successfully.`);
      });
    }
  };
  updateSelectedProductField = (
    field: keyof Product,
    value: string | number
  ) => {
    runInAction(() => {
      if (this.selectedProduct) {
        const updatedProduct: Partial<Product> = {
          ...this.selectedProduct,
          [field]: value,
        };
        this.selectedProduct = updatedProduct as Product;
      }
    });
  };

  saveProduct = (productDetails: Partial<Product>): void => {
    if (productDetails.id) {
      const index = this.products.findIndex((p) => p.id === productDetails.id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...productDetails };
        toastSuccess('Product updated successfully.');
      }
    } else {
      const newProduct: Product = {
        id: uuidv4(),
        name: productDetails.name!,
        price: productDetails.price!,
        description: productDetails.description!,
        category: productDetails.category || '', // Якщо категорія не вказана, використовуємо пустий рядок
      };
      this.products.push(newProduct);
      toastSuccess('Product added successfully.');
    }

    this.clearSelectedProduct();
  };

  get productCount(): number {
    return this.products.length;
  }
}

export default ProductStore;
