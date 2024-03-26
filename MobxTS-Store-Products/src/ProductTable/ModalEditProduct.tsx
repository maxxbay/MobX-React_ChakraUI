import React from 'react';
import ProductForm from '../ProductForm/ProductForm';

interface ModalEditProductProps {
  onClose: () => void;
}

const ModalEditProduct: React.FC<ModalEditProductProps> = ({ onClose }) => {
  return <ProductForm onClose={onClose} />;
};

export default ModalEditProduct;
