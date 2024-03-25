import React from 'react';
import { Box, Table } from '@chakra-ui/react';
import DynamicTableHeader from './DynamicTableHeader';
import DynamicTableBody from './DynamicTableBody';
import { Product, Column } from '../types';

interface BaseTableProps {
  columns: Column[];
  data: Product[];
  onEdit: (product: Product) => void;
  onRemove: (id: string) => void;
}

const BaseTable: React.FC<BaseTableProps> = ({
  columns,
  data,
  onEdit,
  onRemove,
}) => {
  return (
    <Box mx="auto" width="80%" overflowX="auto">
      <Table variant="simple">
        <DynamicTableHeader columns={columns} />
        <DynamicTableBody
          data={data}
          columns={columns}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </Table>
    </Box>
  );
};

export default BaseTable;
