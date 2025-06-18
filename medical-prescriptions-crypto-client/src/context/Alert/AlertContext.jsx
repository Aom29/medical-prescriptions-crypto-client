import React, { createContext, useState, useContext } from "react";
import Swal from 'sweetalert2';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // success, error, info, warning

  const showAlert = (message, severity = 'success') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpenAlert(true);

    Swal.fire({
      title: severity === 'error' ? 'Error' : '¡Éxito!',
      text: message,
      icon: severity, 
      confirmButtonText: 'Aceptar',
    }).then(() => {
      setOpenAlert(false); 
    });
  };

  const closeAlert = () => {
    setOpenAlert(false); // Cerrar la alerta manualmente si es necesario
  };

  return (
    <AlertContext.Provider value={{ openAlert, alertMessage, alertSeverity, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};