import { jsx as _jsx } from "react/jsx-runtime";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Theme from './Utils/Theme';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(ChakraProvider, { theme: Theme, children: _jsx(App, {}) }) }) }));
