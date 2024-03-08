import { Button, Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { observer } from "mobx-react-lite";
import ProductStore from "../store/ProductStore";


const ProductTable = observer(() => { 
    return (
      <Box mx="auto" maxW="80%" >
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Description</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ProductStore.products.map((product, index) => (
                    <Tr key={index}>
                        <Td>{product.name}</Td>
                        <Td>{product.price}</Td>
                        <Td>{product.description}</Td>
                        <Td>
                            <Button
                            colorScheme='red'
                            onClick={() => ProductStore.removeProduct(index)}
                            >Remove</Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
     </Box>
    )
});

export default ProductTable;