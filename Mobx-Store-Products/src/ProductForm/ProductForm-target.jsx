import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastSuccess, toastError } from './components/toasts';
import { FormField } from './FormField';

const ProductForm = observer(() => {
  const { saveProduct } = useProductStore();

  const handleClick = () => {
    const response = saveProduct();
    if (response.success) {
      toastSuccess(response.message);
    } else {
      toastError(response.message);
    }
  };

  return (
    <Box mx="auto" minW="40%" p={4}>
      <FormField label="Name" placeholder="Name" type="text" />
      <FormField label="Price" placeholder="Price" type="number" />
      <FormField label="Description" placeholder="Description" type="text" />
      <Button mt={6} colorScheme="blue" type="submit" onClick={handleClick}>
        Save
      </Button>
    </Box>
  );
});

export default ProductForm;
