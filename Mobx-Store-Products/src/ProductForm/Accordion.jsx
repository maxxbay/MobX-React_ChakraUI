import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import ProductStore from "../store/ProductStore";

const AccordionComp = observer(() => { 
    return (
        <Accordion allowMultiple>
            {ProductStore.products.map((product, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {product.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {product.description}
                
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
});

export default AccordionComp;
