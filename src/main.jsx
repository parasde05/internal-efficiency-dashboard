import React from 'react';
import { createRoot } from 'react-dom/client';
import '@shashpicious/casa/dist/index.css';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
