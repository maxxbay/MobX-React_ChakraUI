import { useState} from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import ProductStore from "../store/ProductStore";

const ProductForm = observer(() => {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    ProductStore.addProduct({name, price, description});
    setName("");
    setDescription("");
    setPrice("");

}

return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </FormControl>
           <FormControl>
            <FormLabel>Price</FormLabel>
            <Input onChange={(e) => setPrice(e.target.value)} value={price} />
        </FormControl>
           <FormControl>
            <FormLabel>Description</FormLabel>
            <Input onChange={(e) => setDescription(e.target.value)} value={description} />
        </FormControl>
        <Button colorScheme='blue' type="submit">Add Product</Button>
    </Box>  
)

})

export default ProductForm;