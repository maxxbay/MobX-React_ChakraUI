import { useState} from "react";
import { observer } from "mobx-react-lite";
import { Box, SimpleGrid, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import ProductStore from "../store/ProductStore";

const ProductForm = observer(() => {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
  const toast = useToast();


const handleSubmit = (e) => {
    e.preventDefault();
    ProductStore.addProduct({name, price, description});
    setName("");
    setDescription("");
    setPrice("");
    toast({
      title: 'Product added.',
      description: "We've added your product.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
}

return (
    <SimpleGrid
  bg='gray.50'
  columns={{ sm: 2, md: 4 }}
  spacing='8'
  p='10'
  textAlign='center'
  rounded='lg'
  color='gray.600'
>
    <Box as="form" onSubmit={handleSubmit} p={4}>
        <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </FormControl>
           <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price} />
        </FormControl>
           <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input placeholder='Description'  onChange={(e) => setDescription(e.target.value)} value={description} />
        </FormControl>
        <Button mt={6} colorScheme='blue' type="submit">Add Product</Button>
    </Box>  
    </SimpleGrid>
)

})

export default ProductForm;