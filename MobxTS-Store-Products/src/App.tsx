import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, VStack, Heading } from '@chakra-ui/react';
import ProductForm from './ProductForm/ProductForm';
import ProductTable from './ProductTable/ProductTable';
import AccordionComp from './ProductForm/Accordion';
import { ProductStoreProvider } from './store/ProductStoreContext';

const App: React.FC = () => {
  return (
    <ProductStoreProvider>
      <Router>
        <VStack p={4}>
          <Heading mb={4}>Product Store</Heading>
          <Box>
            <Link to="/add-product">Add Product</Link> |{' '}
            <Link to="/view-products">View Products</Link> |{' '}
            <Link to="/view-accordion">About Product</Link>
          </Box>
          <Routes>
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/view-products" element={<ProductTable />} />
            <Route path="/view-accordion" element={<AccordionComp />} />
          </Routes>
        </VStack>
      </Router>
    </ProductStoreProvider>
  );
};

export default App;
