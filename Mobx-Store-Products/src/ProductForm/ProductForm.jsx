import { useState } from 'react';
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
import ProductStore from '../store/ProductStore';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = observer(() => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    ProductStore.addProduct({ id: uuidv4(), name, price, description });
    setName('');
    setDescription('');
    setPrice('');
    toast({
      title: 'Product added.',
      description: "We've added your product.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box mx="auto" minW="40%" as="form" onSubmit={handleSubmit} p={4}>
      <FormControl mt={4} isRequired>
        <FormLabel minWidth="200px" whiteSpace="nowrap">
          Name
        </FormLabel>
        <Input
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Price</FormLabel>
        <Input
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </FormControl>
      <Button mt={6} colorScheme="blue" type="submit">
        Add Product
      </Button>
    </Box>
  );
});

export default ProductForm;
