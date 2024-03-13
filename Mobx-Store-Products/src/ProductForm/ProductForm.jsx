import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastSuccess, toastError } from '../toastUtils';
import FormField from './FormField';

const ProductForm = observer(() => {
  const store = useProductStore();

  const handleSubmit = () => {
    try {
      const response = store.saveProduct();
      if (response.success) {
        toastSuccess(response.message);
      } else {
        toastError(response.message);
      }
    } catch (error) {
      toastError("We've got an error.");
    }
  };

  return (
    <Box as="form" mx="auto" minW="40%" p={4}>
      <FormField name="name" label="Name" placeholder="Name" type="text" />
      <FormField name="price" label="Price" placeholder="Price" type="number" />
      <FormField
        name="description"
        label="Description"
        placeholder="Description"
        type="textarea"
      />
      <Button mt={6} colorScheme="blue" onClick={handleSubmit}>
        {store.selectedProduct ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
});

export default ProductForm;
