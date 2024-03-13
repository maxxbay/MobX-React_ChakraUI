/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useProductStore } from "../store/ProductStoreContext";

const FormField = ({ name, label, type = "text", placeholder }) => {
  const store = useProductStore();
  const { selectedProduct } = store;
  const value = selectedProduct[name];

  const onChangeHandler = (name) => {
    // TODO () => {}
  };

  return (
    <FormControl mt={4} isRequired>
      <FormLabel minWidth="200px" whiteSpace="nowrap">
        {label}
      </FormLabel>
      {type === "textarea" ? (
        <Textarea
          value={value}
          onChange={onChangeHandler(name)}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChangeHandler(name)}
          placeholder={placeholder}
        />
      )}
    </FormControl>
  );
};

export default FormField;
