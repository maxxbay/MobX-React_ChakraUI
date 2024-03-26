import React from 'react';
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
import { Product } from '../types';

const AccordionComp: React.FC = observer(() => {
  const productStore = useProductStore();

  return (
    <Box minW="40%" maxW="80%">
      <Accordion allowMultiple>
        {productStore.products.map((product: Product) => (
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
