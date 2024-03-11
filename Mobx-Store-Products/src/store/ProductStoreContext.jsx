/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from 'react';
import ProductStore from './ProductStore';

const ProductContext = createContext();

export const useProductStore = () => useContext(ProductContext);

export const ProductStoreProvider = ({ children }) => {
  const store = useMemo(() => new ProductStore(), []);
  return (
    <ProductContext.Provider value={store}>{children}</ProductContext.Provider>
  );
};
