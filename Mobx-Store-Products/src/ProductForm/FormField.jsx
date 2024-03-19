import { observer } from "mobx-react-lite";
import { useProductStore } from "../store/ProductStoreContext";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

const FormField = observer(({ name, label, type, placeholder }) => {
  const { selectedProduct, setSelectedProduct } = useProductStore();

  const value = selectedProduct[name];

  const handleChange = (value) => {
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  return (
    <FormControl mt={4} isRequired>
      <FormLabel minWidth="200px" whiteSpace="nowrap">
        {label}
      </FormLabel>
      {type === "textarea" ? (
        <Textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <Input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </FormControl>
  );
});

export default FormField;
