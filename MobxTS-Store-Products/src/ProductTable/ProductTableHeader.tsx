import { Thead, Tr, Th } from '@chakra-ui/react';
import React from 'react';

const ProductTableHeader: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Price</Th>
        <Th>Description</Th>
        <Th>Editing</Th>
        <Th>Deletion</Th>
      </Tr>
    </Thead>
  );
};

export default ProductTableHeader;
