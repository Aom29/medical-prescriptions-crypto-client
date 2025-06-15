import { useState } from 'react';
import { Box, Card, TextField, CardContent, Stack, Typography } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import RegisterHomeButton from './RegisterHomeButton';
import RegisterTextField from './RegisterTextField';

function RegisterMedic ({ setView }) {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    fechaNacimiento: '',
    especialidad: '',
    cedula: '',
    clinica: '',
    tel: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos: ', formData);
  }

  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <RegisterHomeButton setView={setView} />
      <Card sx={{ width:'80%', padding: '3%' }}>
        <CardContent>
          <Subtitle subtitulo='Registrar médico' />
          {/* Correo electrónico ------------ */}
          <RegisterTextField 
            campo='email'
            formData={formData}
            handleChange={handleChange}
            label='Correo electrónico'
          />
          {/* Nombre ------------------------ */}
          <RegisterTextField 
            campo='nombre'
            formData={formData}
            handleChange={handleChange}
            label='Nombre'
          />
          {/* Fecha de nacimiento ------------ */}
          <RegisterTextField 
            campo='fechaNacimiento'
            formData={formData}
            handleChange={handleChange}
            label='Fecha de Nacimiento'
          />
          {/* Especialidad -------------------- */}
          <RegisterTextField 
            campo='especialidad'
            formData={formData}
            handleChange={handleChange}
            label='Especialidad'
          />
          {/* Cédula profesional -------------- */}
          <RegisterTextField 
            campo='cedula'
            formData={formData}
            handleChange={handleChange}
            label='Cédula profesional'
          />
          {/* Clínica ------------------------- */}
          <RegisterTextField 
            campo='clinica'
            formData={formData}
            handleChange={handleChange}
            label='Clínica'
          />
          {/* Teléfono -------------------- */}
          <RegisterTextField 
            campo='tel'
            formData={formData}
            handleChange={handleChange}
            label='Teléfono celular'
          />
          {/* Contraseña -------------------- */}
          <RegisterTextField 
            campo='password'
            formData={formData}
            handleChange={handleChange}
            label='Contraseña'
          />
          <Box sx={{ display: 'flex', width: '100%', marginTop: '10px' }}>
            <ButtonsMod
              variant='principal'
              textCont='Registrar'
              width='100%'
              clickEvent={handleSubmit}
              type='submit'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterMedic;