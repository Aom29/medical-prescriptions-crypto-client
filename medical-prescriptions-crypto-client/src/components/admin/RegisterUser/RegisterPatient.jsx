import { useState } from 'react';
import { Box, Card, TextField, CardContent } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import RegisterHomeButton from './RegisterHomeButton';
import RegisterTextField from './RegisterTextField';
import RegisterPassword from './RegisterPassword';

function RegisterPatient ({ setView }) {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    fechaNacimiento: '',
    curp: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos: ', formData);
  };

  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <RegisterHomeButton setView={setView} />
      <Card sx={{ width: {xs: '80%', md: '50%' }, padding: '3%' }}>
        <CardContent>
          <Subtitle subtitulo='Registrar paciente' />
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
            type='date'
          />
          {/* CURP -------------------------- */}
          <RegisterTextField 
            campo='curp'
            formData={formData}
            handleChange={handleChange}
            label='CURP'
          />
          {/* Contraseña -------------------- */}
          <RegisterPassword
            campo='password'
            formData={formData}
            handleChange={handleChange}
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

export default RegisterPatient;