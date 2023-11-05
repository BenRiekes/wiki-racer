import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    100: '#0C0A3E',
    200: '#7B1E7A',
    300: '#B33F62',
    400: '#F9564F',
    500: '#F3C677',
    600: '#ffffff'
  }
};

const theme = extendTheme(
  {colors}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider> 
    </BrowserRouter>
  </React.StrictMode>,
)
