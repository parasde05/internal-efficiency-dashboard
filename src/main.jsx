import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@shashpicious/casa/dist/index.css';
import App from './App';
import './index.css';

const GOOGLE_CLIENT_ID = '92785798779-0cifioh6gjdv8u52r9d6r57im47adm9u.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
