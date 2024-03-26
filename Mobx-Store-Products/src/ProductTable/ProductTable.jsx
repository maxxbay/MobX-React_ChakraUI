// import { Box, Table, useDisclosure } from '@chakra-ui/react';
// import { observer } from 'mobx-react-lite';
// import { useProductStore } from '../store/ProductStoreContext';
// import ProductTableFooter from './ProductTableFooter';
// import ProductTableHeader from './ProductTableHeader';
// import ProductTableBody from './ProductTableBody';
// import ModalOfProduct from './ModalOfProduct';
// import ModalEditProduct from './ModalEditProduct';

// const ProductTable = observer(() => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const ProductStore = useProductStore();

//   const handleEdit = (product) => {
//     ProductStore.setSelectedProduct(product);
//     onOpen();
//   };

//   return (
//     <Box mx="auto" minW="70%">
//       <Table variant="simple">
//         <ProductTableHeader />
//         <ProductTableBody onEdit={handleEdit} />
//       </Table>
//       <ModalOfProduct
//         isOpen={isOpen}
//         onClose={() => {
//           onClose();
//           ProductStore.setSelectedProduct(null);
//         }}
//       >
//         <ModalEditProduct onClose={onClose} />
//       </ModalOfProduct>

//       <ProductTableFooter />
//     </Box>
//   );
// });

// export default ProductTable;
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';
import BaseTable from './BaseTable';
import { useDisclosure } from '@chakra-ui/react';
import ModalOfProduct from './ModalOfProduct';
import ModalEditProduct from './ModalEditProduct';

const ProductTable = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ProductStore = useProductStore();

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Description', accessorKey: 'description' },
  ];

  const handleEdit = (product) => {
    ProductStore.setSelectedProduct(product);
    onOpen();
  };

  const handleRemove = (id) => {
    ProductStore.removeProduct(id);
  };

  return (
    <>
      <BaseTable
        columns={columns}
        data={ProductStore.products}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
      <ModalOfProduct isOpen={isOpen} onClose={onClose}>
        <ModalEditProduct onClose={onClose} />
      </ModalOfProduct>
    </>
  );
});

export default ProductTable;
