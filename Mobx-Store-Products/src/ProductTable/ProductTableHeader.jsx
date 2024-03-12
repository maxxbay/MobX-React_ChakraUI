import { Thead, Tr, Th } from '@chakra-ui/react';

const ProductTableHeader = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>Description</Th>
      </Tr>
    </Thead>
  );
};

export default ProductTableHeader;
