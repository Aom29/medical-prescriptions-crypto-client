import { Card, CardContent, CardHeader, Stack, Typography, Box }  from '@mui/material';
import '../../../css/medic/medic.css';
import GeneralData from './GeneralData';

function GeneratePrescription () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: { md: '80%', xs: '100%' }, padding: '2%' }}>
        <CardHeader title='Generar receta' />
        <CardContent>
          <Stack direction='column' >
            {/* Datos generales ---------------------- */}
            <Stack direction='row' sx={{ marginBottom: '30px' }}>
              <div className='medic-home-div' />
              <Typography fontSize='1.1rem' fontWeight='bold'>
                Datos generales
              </Typography>
            </Stack>
            <GeneralData 
              matricula='202249885'
              nombrePaciente='Aarón Olvera'
              fechaNacimiento='23/01/2003'
              sexo='Masculino'

              fechaEmision='11/06/2025'
              nombreMedico='Sergewww Warmirez'
              especialidad='Alta especialidad'
              cedula='299309403'
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GeneratePrescription;