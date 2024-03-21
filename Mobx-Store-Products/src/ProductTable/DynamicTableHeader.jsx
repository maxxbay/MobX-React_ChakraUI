/* eslint-disable react/prop-types */
import { Thead, Tr, Th } from '@chakra-ui/react';

const DynamicTableHeader = ({ columns }) => (
  <Thead>
    <Tr>
      {columns.map((column) => (
        <Th key={column.accessorKey}>{column.header}</Th>
      ))}
    </Tr>
  </Thead>
);

export default DynamicTableHeader;
