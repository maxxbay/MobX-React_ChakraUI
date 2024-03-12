/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const FormField = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <FormControl mt={4} isRequired>
      <FormLabel minWidth="200px" whiteSpace="nowrap">
        {label}
      </FormLabel>
      {type === 'textarea' ? (
        <Textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </FormControl>
  );
};

export default FormField;
