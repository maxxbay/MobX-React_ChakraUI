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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';
import ProductForm from '../ProductForm/ProductForm';

const ProductTable = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const ProductStore = useProductStore();

  const handleEdit = (product) => {
    ProductStore.setSelectedProduct(product);
    onOpen();
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
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.description}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleRemove(product)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          ProductStore.setSelectedProduct(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box mt={4}>
        <Text>Total Products: {ProductStore.productCount}</Text>
      </Box>
    </Box>
  );
});

export default ProductTable;
