import { Tbody, Tr, Td, Button } from '@chakra-ui/react';
import { Product, Column } from '../types'; // Замініть шлях на вірний шлях до вашого файлу з типами
import React from 'react';

interface DynamicTableBodyProps {
  data: Product[];
  columns: Column[];
  onEdit: (product: Product) => void;
  onRemove: (id: string) => void;
}

const DynamicTableBody: React.FC<DynamicTableBodyProps> = ({
  data,
  columns,
  onEdit,
  onRemove,
}) => (
  <Tbody>
    {data.map((item, rowIndex) => (
      <Tr key={rowIndex}>
        {columns.map((column) => (
          <Td key={column.accessorKey}>
            {item[column.accessorKey as keyof Product]}
          </Td>
        ))}
        <Td>
          <Button colorScheme="blue" onClick={() => onEdit(item)}>
            Edit
          </Button>
        </Td>
        <Td>
          <Button colorScheme="red" onClick={() => onRemove(item.id)}>
            Remove
          </Button>
        </Td>
      </Tr>
    ))}
  </Tbody>
);

export default DynamicTableBody;
