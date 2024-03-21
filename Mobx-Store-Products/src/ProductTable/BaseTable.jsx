/* eslint-disable react/prop-types */
import { Box, Table } from '@chakra-ui/react';
import DynamicTableHeader from './DynamicTableHeader';
import DynamicTableBody from './DynamicTableBody';

const BaseTable = ({ columns, data, onEdit, onRemove }) => {
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
