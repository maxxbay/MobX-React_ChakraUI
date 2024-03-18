import { observer } from 'mobx-react-lite';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const FormField = observer(
  ({ name, label, type, placeholder, value, onChange }) => {
    return (
      <FormControl mt={4} isRequired>
        <FormLabel minWidth="200px" whiteSpace="nowrap">
          {label}
        </FormLabel>
        {type === 'textarea' ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <Input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </FormControl>
    );
  }
);

export default FormField;
