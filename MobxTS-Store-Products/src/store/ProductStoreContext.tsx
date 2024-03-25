/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import ProductStore from './ProductStore';

const ProductContext = createContext<ProductStore | null>(null);

export const useProductStore = () => useContext(ProductContext) as ProductStore;

interface ProductStoreProviderProps {
  children: React.ReactNode;
}

export const ProductStoreProvider: React.FC<ProductStoreProviderProps> = ({
  children,
}) => {
  const store = useMemo(() => new ProductStore(), []);
  return (
    <ProductContext.Provider value={store}>{children}</ProductContext.Provider>
  );
};
