import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useProductStore } from '../store/ProductStoreContext';

const AccordionComp = observer(() => {
  const ProductStore = useProductStore();

  return (
    <Box minW="40%" maxW="80%">
      <Accordion allowMultiple>
        {ProductStore.products.map((product) => (
          <AccordionItem key={product.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {product.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{product.description}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
});

export default AccordionComp;
