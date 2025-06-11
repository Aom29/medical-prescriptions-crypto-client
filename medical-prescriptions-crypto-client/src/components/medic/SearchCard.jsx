import { Card, CardContent, Box, Stack, Typography }  from '@mui/material';
import '../../css/medic/medic.css';
import PatientPersonalInformation from './PatientPersonalInformation';

function SearchCard () {
  return (
    <Card
      sx={{
        borderRadius: 2,
        marginBottom: '50px',
        padding: '2%',
      }}>

      <CardContent>
        <Stack variant='column'>
          <Stack direction='row' sx={{ marginBottom: '30px' }}>
            <div className='medic-home-div' />
            <Typography fontSize='1.1rem' fontWeight='bold'>
              Información general del paciente
            </Typography>
          </Stack>
          <PatientPersonalInformation/>
        </Stack>

        <Stack direction='row' sx={{ marginBottom: '30px' }}>
          <div className='medic-home-div' />
          <Typography fontSize='1.1rem' fontWeight='bold'>
            Historial Clínico
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchCard;