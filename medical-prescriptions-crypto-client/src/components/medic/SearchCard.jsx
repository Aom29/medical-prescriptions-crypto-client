import { Card, CardContent, Box, Stack, Typography }  from '@mui/material';
import '../../css/medic/medic.css';
import PatientPersonalInformation from './PatientPersonalInformation';
import PatientClinicHistory from './PatientClinicHistory';

function SearchCard ({ setView }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        marginBottom: '50px',
        padding: '2%',
      }}>

      <CardContent>
        <Stack direction='column'>
          <Stack direction='row' sx={{ marginBottom: '30px' }}>
            <div className='medic-home-div' />
            <Typography fontSize='1.1rem' fontWeight='bold'>
              Información general del paciente
            </Typography>
          </Stack>
          <PatientPersonalInformation
            matricula='2025938495'
            curp='RAMS990202HDFRRG09'
            nombre='Ramírez Sergio'
            fechaNacimiento='02/02/1999'
            sexo='hombre'
            onGenerate={() => setView('generate')}
          />
        </Stack>

        <Stack direction='column'>
          <Stack direction='row' sx={{ marginBottom: '30px' }}>
            <div className='medic-home-div' />
            <Typography fontSize='1.1rem' fontWeight='bold'>
              Historial Clínico
            </Typography>
          </Stack>
          <PatientClinicHistory 
            fecha='10/06/2025'
            diagnostico='Gastritis aguda'
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchCard;