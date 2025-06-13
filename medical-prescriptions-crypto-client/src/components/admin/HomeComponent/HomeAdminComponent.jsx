import { Stack, Box } from '@mui/material';
import Header from '../../layout/Header';
import HomeAdminButton from './HomeAdminButton';

function HomeAdminComponent () {
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Header nombre='Admin'/>
      <HomeAdminButton
        nombreBoton='Registrar Médico'
      />
      <HomeAdminButton
        nombreBoton='Registrar Farmacéutico'
      />
      <HomeAdminButton
        nombreBoton='Registrar Paciente'
      />
    </Stack>
  );
};

export default HomeAdminComponent;