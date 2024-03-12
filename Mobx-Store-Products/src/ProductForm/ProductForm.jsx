import { observer } from 'mobx-react-lite';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import ProductFormField from './ProductFormField';

const ProductForm = observer(() => {
  const toast = useToast();
  const store = useProductStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (store.selectedProduct) {
      store.updateProduct();
      toast({
        title: 'Product updated.',
        description: "We've updated your product.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      store.addProduct();
      toast({
        title: 'Product added.',
        description: "We've added your product.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    store.selectedProduct = null;
  };

  return (
    <Box mx="auto" minW="40%" as="form" onSubmit={handleSubmit} p={4}>
      <ProductFormField
        label="Name"
        value={store.productDetails.name}
        onChange={(e) => store.setProductName(e.target.value)}
        placeholder="Name"
        isRequired
        type="text"
      />
      <ProductFormField
        label="Price"
        value={store.productDetails.price}
        onChange={(e) => store.setProductPrice(e.target.value)}
        placeholder="Price"
        isRequired
        type="number"
      />
      <ProductFormField
        label="Description"
        value={store.productDetails.description}
        onChange={(e) => store.setProductDescription(e.target.value)}
        placeholder="Description"
        isRequired
        type="text"
      />
      <Button mt={6} colorScheme="blue" type="submit">
        {store.selectedProduct ? 'Save' : 'Add Product'}
      </Button>
    </Box>
  );
});

export default ProductForm;
