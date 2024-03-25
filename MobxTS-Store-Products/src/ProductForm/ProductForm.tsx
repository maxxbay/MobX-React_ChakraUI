import React, { FormEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastError } from '../toastUtils';
import FormField from './FormField';
import { Product } from '../types';

const ProductForm: React.FC<{ onClose?: () => void }> = observer(
  ({ onClose }) => {
    const store = useProductStore();

    const validateForm = (): boolean => {
      const requiredFields = ['name', 'price', 'category', 'description'];
      return requiredFields.every(
        (field) =>
          store.selectedProduct &&
          store.selectedProduct[field as keyof typeof store.selectedProduct]
      );
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        toastError('Please fill in all fields');
        return;
      }
      if (store.selectedProduct) {
        const productToSave: Product = {
          ...store.selectedProduct,
          id: store.selectedProduct.id || '',
        };

        store.saveProduct(productToSave);

        if (onClose) onClose();
      } else {
        toastError('Error saving the product');
      }
    };

    return (
      <Box as="form" mx="auto" minW="40%" p={4} onSubmit={handleSubmit}>
        <FormField name="name" label="Name" placeholder="Enter name" />
        <FormField
          name="price"
          label="Price"
          type="number"
          placeholder="Enter price"
        />
        <FormField
          name="description"
          label="Description"
          type="textarea"
          placeholder="Enter description"
        />
        <FormField
          name="category"
          label="Category"
          placeholder="Enter category"
        />
        <Button mt={4} colorScheme="blue" type="submit">
          Save
        </Button>
      </Box>
    );
  }
);

export default ProductForm;
