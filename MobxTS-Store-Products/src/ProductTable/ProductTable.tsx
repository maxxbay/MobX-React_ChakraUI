import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';
import BaseTable from './BaseTable';
import { useDisclosure } from '@chakra-ui/react';
import ModalOfProduct from './ModalOfProduct';
import ModalEditProduct from './ModalEditProduct';
import { Product, Column } from '../types';
import React from 'react';

const ProductTable: React.FC = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store = useProductStore();

  const columns: Column[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Description', accessorKey: 'description' },
  ];

  const handleEdit = (product: Product) => {
    store.setSelectedProduct({ ...product });
    onOpen();
  };

  const handleRemove = (id: string) => {
    store.removeProduct(id);
  };

  return (
    <>
      <BaseTable
        columns={columns}
        data={store.products}
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
