import { Box, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';
import React from 'react';

const ProductTableFooter: React.FC = observer(() => {
  const ProductStore = useProductStore();

  return (
    <Box mt={4}>
      <Text>Total Products: {ProductStore.productCount}</Text>
    </Box>
  );
});

export default ProductTableFooter;
