import { observer } from 'mobx-react-lite';
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useProductStore } from '../store/ProductStoreContext';

const FormField = observer(({ name, label, type = 'text', placeholder }) => {
  const store = useProductStore();
  const value = store.productDetails[name];

  const onChangeHandler = (e) => {
    store.setProductDetail(name, e.target.value);
  };

  return (
    <FormControl mt={4} isRequired>
      <FormLabel minWidth="200px" whiteSpace="nowrap">
        {label}
      </FormLabel>
      {type === 'textarea' ? (
        <Textarea
          value={value || ''}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          value={value || ''}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      )}
    </FormControl>
  );
});

export default FormField;
