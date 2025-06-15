import { Stack, Card, CardContent } from '@mui/material';
import Header from '../../layout/Header';
import HomePatientInformation from './HomePatientInformation';
import Subtitle from '../../layout/Subtitle';

function HomePatientComponent () {
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Header/>

      <Card sx={{ 
        width: { xs: '100%', md: '80%' },
        padding: '2%'
      }}>
        <CardContent>
          {/* Información general ---------------- */}
          <Subtitle subtitulo='Información general' />
          <HomePatientInformation
            matricula='20229933344'
            curp='REOF032911FFKET1'
            nombre='Sergio Ramírez'
            fechaNacimiento='02/34/1929'
            sexo='Masculino'
          />
          {/* Historial clínico ----------------- */}
          <Subtitle subtitulo='Historial clínico' />

        </CardContent>
      </Card>
    </Stack>
  );
};

export default HomePatientComponent;