import { useState } from 'react';
import { Box, Card, Select, CardContent, MenuItem, InputLabel, FormControl } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import RegisterHomeButton from './RegisterHomeButton';
import RegisterTextField from './RegisterTextField';
import RegisterPassword from './RegisterPassword';

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

  const especialidades = [
    { value: 'General', label: 'General' },
    { value: 'Alta Especialidad', label: 'Alta Especialidad' },
  ];

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
      <Card sx={{ width: {xs: '90%', md: '50%' }, padding: '3%' }}>
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
            type='date'
          />
          {/* Especialidad -------------------- */}
          <FormControl sx={{ width: '100%' }} >
            <InputLabel id='select-especialidad'>Especialidad</InputLabel>
            <Select
              id='select-especialidad'
              name='especialidad'
              value={formData.especialidad}
              onChange={handleChange}
              label='Especialidad'
              sx={{ width: '100%', marginBottom: '20px' }}
              required
            >
              {especialidades.map(({value, label}) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default RegisterMedic;