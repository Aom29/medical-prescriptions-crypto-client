import { useState } from 'react';
import { Box, Card, Select, CardContent, MenuItem, InputLabel, FormControl } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import A_RCButtonHome from './A_RComponents/A_RCButtonHome';
import A_RCTextField from './A_RComponents/A_RCTextField';
import A_RCPassword from './A_RComponents/A_RCPassword';

function A_RMedic ({ setView }) {
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
      <A_RCButtonHome setView={setView} />
      <Card sx={{ width: {xs: '90%', md: '50%' }, padding: '3%' }}>
        <CardContent>
          <Subtitle subtitulo='Registrar médico' />
          {/* Correo electrónico ------------ */}
          <A_RCTextField 
            campo='email'
            formData={formData} 
            handleChange={handleChange}
            label='Correo electrónico'
          />
          {/* Nombre ------------------------ */}
          <A_RCTextField 
            campo='nombre'
            formData={formData}
            handleChange={handleChange}
            label='Nombre'
          />
          {/* Fecha de nacimiento ------------ */}
          <A_RCTextField 
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
          <A_RCTextField 
            campo='cedula'
            formData={formData}
            handleChange={handleChange}
            label='Cédula profesional'
          />
          {/* Clínica ------------------------- */}
          <A_RCTextField 
            campo='clinica'
            formData={formData}
            handleChange={handleChange}
            label='Clínica'
          />
          {/* Teléfono -------------------- */}
          <A_RCTextField 
            campo='tel'
            formData={formData}
            handleChange={handleChange}
            label='Teléfono celular'
          />
          {/* Contraseña -------------------- */}
          <A_RCPassword
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

export default A_RMedic;