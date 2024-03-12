import { observer } from 'mobx-react-lite';
import { Tbody, Tr, Td, Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';

const ProductTableBody = observer(({ onEdit }) => {
  const ProductStore = useProductStore();
  const toast = useToast();

  const handleRemove = (id) => {
    ProductStore.removeProduct(id);
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
    <Tbody minW="100%">
      {ProductStore.products.map((product) => (
        <Tr key={product.id}>
          <Td>{product.name}</Td>
          <Td>{product.price}</Td>
          <Td>{product.description}</Td>
          <Td>
            <Button colorScheme="blue" onClick={() => onEdit(product)}>
              Edit
            </Button>
          </Td>
          <Td>
            <Button colorScheme="red" onClick={() => handleRemove(product.id)}>
              Remove
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
});

export default ProductTableBody;
