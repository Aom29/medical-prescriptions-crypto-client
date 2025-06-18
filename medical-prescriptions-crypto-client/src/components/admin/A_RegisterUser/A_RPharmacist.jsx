import { useState } from 'react';
import { Box, Card, CardContent } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import A_RCButtonHome from './A_RComponents/A_RCButtonHome';
import A_RCTextField from './A_RComponents/A_RCTextField';
import A_RCPassword from './A_RComponents/A_RCPassword';
import Admin from '../../../services/admin/Admin';
import { useAlert } from '../../../context/Alert/AlertContext';

function A_RPharmacist ({ setView }) {
  const [formData, setFormData] = useState({
      email: '',
      nombre: '',
      fechaNacimiento: '',
      farmacia: '',
      tel: '',
      password: '',
    });

    const { showAlert } = useAlert();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await Admin.registerPharmacist(formData);
        showAlert(data.message, 'success');
      } catch (error) {
        showAlert(error, 'error');
      }
    };

  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <A_RCButtonHome setView={setView} />
      <Card sx={{ width: {xs: '90%', md: '50%' }, padding: '3%' }}>
        <CardContent>
          <Subtitle subtitulo='Registrar farmacéutico' />
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
          {/* Farmacia ----------------------- */}
          <A_RCTextField 
            campo='farmacia'
            formData={formData} 
            handleChange={handleChange}
            label='Farmacia'
          />
          {/* Teléfono ----------------------- */}
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

export default A_RPharmacist;