import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastSuccess, toastError } from '../toastUtils';
import FormField from './FormField';

const ProductForm = observer(() => {
  const store = useProductStore();

  const handleChange = (field, value) => {
    store.setSelectedProduct({ ...store.selectedProduct, [field]: value });
  };

  const validateForm = () => {
    const requiredFields = ['name', 'price', 'description'];
    return requiredFields.every((field) => store.selectedProduct[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toastError('Please fill in all fields');
      return;
    }

    try {
      let response;
      if (store.selectedProduct && store.selectedProduct.id) {
        response = await store.updateProduct(
          store.selectedProduct.id,
          store.selectedProduct
        );
      } else {
        response = await store.addProduct(store.selectedProduct);
      }

      response && response.success
        ? toastSuccess(response.message)
        : toastError(response.message);
      store.resetProductDetails();
    } catch (error) {
      toastError('An error occurred.');
    }
  };

  return (
    <Box as="form" mx="auto" minW="40%" p={4} onSubmit={handleSubmit}>
      {['name', 'price', 'description'].map((field) => (
        <FormField
          key={field}
          name={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholder={`Enter ${field}`}
          type={field === 'description' ? 'textarea' : 'text'}
          value={
            store.selectedProduct && store.selectedProduct[field]
              ? store.selectedProduct[field]
              : ''
          }
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ))}
      <Button mt={6} colorScheme="blue" type="submit">
        {store.selectedProduct && store.selectedProduct.id ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
});

export default ProductForm;
