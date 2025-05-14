import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="543449768371-o7c0svosbbbh45fldq3q2ei68k86nnvf.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);