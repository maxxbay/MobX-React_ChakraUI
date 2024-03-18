import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastSuccess, toastError } from '../toastUtils';
import FormField from './FormField';

const ProductForm = observer(() => {
  const store = useProductStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    try {
      const response = store.saveProduct(formProps);
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
    <Box as="form" mx="auto" minW="40%" p={4} onSubmit={handleSubmit}>
      <FormField name="name" label="Name" placeholder="Name" type="text" />
      <FormField name="price" label="Price" placeholder="Price" type="number" />
      <FormField
        name="description"
        label="Description"
        placeholder="Description"
        type="textarea"
      />
      <Button mt={6} colorScheme="blue" type="submit">
        {store.selectedProduct ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
});

export default ProductForm;
