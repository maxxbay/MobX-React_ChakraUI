import { observer } from 'mobx-react-lite';
import { Box, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { toastError } from '../toastUtils';
import FormField from './FormField';

const ProductForm = observer(() => {
  const store = useProductStore();

  const validateForm = () => {
    const requiredFields = ['name', 'price', 'description'];
    const isValid = requiredFields.every(
      (field) => store.selectedProduct?.[field]
    );
    !isValid && toastError('Please fill in all fields');
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid && store.selectedProduct) {
      store.saveProduct(store.selectedProduct);
    }
  };

  const formFieldNames = ['name', 'price', 'description'];
  const formHasChanges = store.hasChanges();
  const isUpdate = Boolean(store.selectedProduct?.id);

  return (
    <Box as="form" mx="auto" minW="40%" p={4} onSubmit={handleSubmit}>
      {formFieldNames.map((field) => (
        <FormField
          key={field}
          name={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholder={`Enter ${field}`}
          type={field === 'description' ? 'textarea' : 'text'}
        />
      ))}
      <Button
        mt={6}
        colorScheme="blue"
        type="submit"
        disabled={!formHasChanges}
      >
        {isUpdate ? 'Update' : 'Save'}
      </Button>
    </Box>
  );
});

export default ProductForm;
