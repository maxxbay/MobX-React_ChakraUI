import {
  Button,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';

const ProductTable = observer(() => {
  const toast = useToast();
  const ProductStore = useProductStore();

  const handleUpdate = (id, field, value) => {
    const productIndex = ProductStore.products.findIndex(
      (product) => product.id === id
    );
    const updatedProduct = {
      ...ProductStore.products[productIndex],
      [field]: value,
    };
    ProductStore.updateProduct(productIndex, updatedProduct);
  };

  const handleRemove = (id) => {
    const productIndex = ProductStore.products.findIndex(
      (product) => product.id === id
    );

    ProductStore.removeProduct(productIndex);
    toast({
      title: 'Product removed.',
      description: 'The product has been removed successfully.',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'bottom',
    });
  };

  return (
    <Box mx="auto" minW="70%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody minW="100%">
          {ProductStore.products.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Input
                  value={product.name}
                  onChange={(e) =>
                    handleUpdate(product.id, 'name', e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  value={product.price}
                  onChange={(e) =>
                    handleUpdate(product.id, 'price', e.target.value)
                  }
                />
              </Td>
              <Td>
                <Textarea
                  minW="70%"
                  maxW="90%"
                  value={product.description}
                  onChange={(e) =>
                    handleUpdate(product.id, 'description', e.target.value)
                  }
                />
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4}>
        <Text>Total Products: {ProductStore.productCount}</Text>
      </Box>
    </Box>
  );
});

export default ProductTable;
