import { Stack } from '@mui/material';
import Header from '../../layout/Header';
import A_HContent from './A_HContent';

function A_HMain ({ setView }) {
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Header nombre='Admin'/>
      <A_HContent
        nombreBoton='Registrar Médico'
        clickEvent={() => setView('registerMedic')}
      />
      <A_HContent
        nombreBoton='Registrar Farmacéutico'
        clickEvent={() => setView('registerPharmacist')}
      />
      <A_HContent
        nombreBoton='Registrar Paciente'
        clickEvent={() => setView('')}
      />
    </Stack>
  );
};

export default A_HMain;