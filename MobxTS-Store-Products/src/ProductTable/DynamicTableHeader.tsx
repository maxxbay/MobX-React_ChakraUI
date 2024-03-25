import { Thead, Tr, Th } from '@chakra-ui/react';
import { Column } from '../types';
import React from 'react';

interface DynamicTableHeaderProps {
  columns: Column[];
}

const DynamicTableHeader: React.FC<DynamicTableHeaderProps> = ({ columns }) => (
  <Thead>
    <Tr>
      {columns.map((column) => (
        <Th key={column.accessorKey}>{column.header}</Th>
      ))}
    </Tr>
  </Thead>
);

export default DynamicTableHeader;
