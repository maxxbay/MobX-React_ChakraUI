import { observer } from "mobx-react-lite";
import { Box, Button } from "@chakra-ui/react";
import { useProductStore } from "../store/ProductStoreContext";
import { toastSuccess, toastError } from "./components/toasts";
import { FormField } from "./FormField";

const ProductForm = observer(() => {
  const { saveProduct } = useProductStore();

  const handleClick = () => {
    try {
      saveProduct();
      toastSuccess("We've updated your product.");
    } catch (e) {
      toastError("We've got an error.");
    }
  };

  return (
    <Box mx="auto" minW="40%" p={4}>
      <FormField label="Name" placeholder="Name" type="text" />
      <FormField label="Price" placeholder="Price" type="number" />
      <FormField label="Description" placeholder="Description" type="text" />
      <Button mt={6} colorScheme="blue" type="submit" onClick={handleClick}>
        Save
      </Button>
    </Box>
  );
});

export default ProductForm;
