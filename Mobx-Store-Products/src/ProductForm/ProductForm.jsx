import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';

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
      <FormControl mt={4} isRequired>
        <FormLabel minWidth="200px" whiteSpace="nowrap">
          Name
        </FormLabel>
        <Input
          value={store.productDetails.name}
          onChange={(e) => store.setProductName(e.target.value)}
          placeholder="Name"
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Price</FormLabel>
        <Input
          value={store.productDetails.price}
          onChange={(e) => store.setProductPrice(e.target.value)}
          placeholder="Price"
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={store.productDetails.description}
          placeholder="Description"
          onChange={(e) => store.setProductDescription(e.target.value)}
        />
      </FormControl>
      <Button mt={6} colorScheme="blue" type="submit">
        {store.selectedProduct ? 'Save' : 'Add Product'}
      </Button>
    </Box>
  );
});

export default ProductForm;
