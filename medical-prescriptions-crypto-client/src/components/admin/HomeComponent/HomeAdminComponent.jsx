import { Stack, Box } from '@mui/material';
import Header from '../../layout/Header';
import HomeAdminButton from './HomeAdminButton';

function HomeAdminComponent ({ setView }) {
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Header nombre='Admin'/>
      <HomeAdminButton
        nombreBoton='Registrar Médico'
        clickEvent={() => setView('registerMedic')}
      />
      <HomeAdminButton
        nombreBoton='Registrar Farmacéutico'
        clickEvent={() => setView('registerPharmacist')}
      />
      <HomeAdminButton
        nombreBoton='Registrar Paciente'
        clickEvent={() => setView('')}
      />
    </Stack>
  );
};

export default HomeAdminComponent;