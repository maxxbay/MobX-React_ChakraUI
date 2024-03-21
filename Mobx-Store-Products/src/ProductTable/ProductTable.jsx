import { Box, Table, useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';
import ProductTableFooter from './ProductTableFooter';
import ProductTableHeader from './ProductTableHeader';
import ProductTableBody from './ProductTableBody';
import ModalOfProduct from './ModalOfProduct';
import ModalEditProduct from './ModalEditProduct';

const ProductTable = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ProductStore = useProductStore();

  const handleEdit = (product) => {
    ProductStore.setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box mx="auto" minW="70%">
      <Table variant="simple">
        <ProductTableHeader />
        <ProductTableBody onEdit={handleEdit} />
      </Table>
      <ModalOfProduct
        isOpen={isOpen}
        onClose={() => {
          onClose();
          ProductStore.setSelectedProduct(null);
        }}
      >
        <ModalEditProduct onClose={onClose} />
      </ModalOfProduct>

      <ProductTableFooter />
    </Box>
  );
});

export default ProductTable;
