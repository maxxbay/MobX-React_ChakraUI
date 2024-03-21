/* eslint-disable react/prop-types */
import { Tbody, Tr, Td, Button } from '@chakra-ui/react';

const DynamicTableBody = ({ data, columns, onEdit, onRemove }) => (
  <Tbody>
    {data.map((item, rowIndex) => (
      <Tr key={rowIndex}>
        {columns.map((column) => (
          <Td key={column.accessorKey}>{item[column.accessorKey]}</Td>
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
