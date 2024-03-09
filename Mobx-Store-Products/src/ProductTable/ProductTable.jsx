import { Button, Box, Table, Tbody, Td, Th, Thead, Tr, Text, Input, Textarea } from '@chakra-ui/react';
import { observer } from "mobx-react-lite";
import ProductStore from "../store/ProductStore";



const ProductTable = observer(() => { 

    const handleUpdate = (index, field, value) => {
    const updatedProduct = { ...ProductStore.products[index], [field]: value };
    ProductStore.updateProduct(index, updatedProduct);
  };

    return (
      <Box mx="auto" minW="70%" >
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Description</Th>
                </Tr>
            </Thead>
            <Tbody minW="100%">
                {ProductStore.products.map((product, index) => (
               <Tr key={index}>
              <Td>
                <Input value={product.name} onChange={(e) => handleUpdate(index, "name", e.target.value)} />
              </Td>
              <Td>
                <Input value={product.price} onChange={(e) => handleUpdate(index, "price", e.target.value)} />
              </Td>
              <Td>
                <Textarea minW="50%" maxW="90%" value={product.description} onChange={(e) => handleUpdate(index, "description", e.target.value)} />
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => ProductStore.removeProduct(index)}>Remove</Button>
              </Td>
            </Tr>
                ))}
            </Tbody>
        </Table>
            <Box mt={4}>
          <Text>Total Products: {ProductStore.productCount}</Text>
        </Box>
     </Box>
    )
});

export default ProductTable;