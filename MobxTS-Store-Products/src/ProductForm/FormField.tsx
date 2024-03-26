import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';
import { Product } from '../types';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = observer(
  ({ name, label, type = 'text', placeholder }) => {
    const store = useProductStore();

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const fieldName = name as keyof Product;
      const fieldValue =
        type === 'number' ? parseFloat(e.target.value) : e.target.value; // Врахування числових полів
      store.updateSelectedProductField(fieldName, fieldValue);
    };

    const value = store.selectedProduct
      ? store.selectedProduct[name as keyof Product]
      : '';

    return (
      <FormControl mt={4} isRequired>
        <FormLabel>{label}</FormLabel>
        {type === 'textarea' ? (
          <Textarea
            name={name}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder}
          />
        ) : (
          <Input
            name={name}
            type={type}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
      </FormControl>
    );
  }
);

export default FormField;
