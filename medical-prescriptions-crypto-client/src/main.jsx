import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { AlertProvider } from './context/Alert/AlertContext';
import { AuthProvider } from './context/Auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <AlertProvider>
      <App /> 
    </AlertProvider>
    </AuthProvider>
  </React.StrictMode>
);
