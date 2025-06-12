import { Card, CardContent, CardHeader, Stack, Typography, Box, Divider }  from '@mui/material';
import '../../../css/medic/medic.css';
import GeneralData from './GeneralData';
import Diagnosis from './Diagnosis';
import Treatment from './Treatment';
import ButtonsMod from '../../ButtonsMod';

function GeneratePrescription () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: { md: '80%', xs: '100%' }, padding: '2%' }}>
        <CardHeader title='Generar receta' />
        <CardContent>
          <Stack direction='column' sx={{ marginBottom: '30px' }}>
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

          <Divider />
          
          <Stack direction='column' sx={{ marginTop: '30px', marginBottom: '30px' }}>
            {/* Diagnóstico ---------------------- */}
            <Stack direction='row' sx={{ marginBottom: '30px' }}>
              <div className='medic-home-div' />
              <Typography fontSize='1.1rem' fontWeight='bold'>
                Diagnóstico
              </Typography>
            </Stack>
            <Diagnosis />
          </Stack>

          <Divider />

          <Stack direction='column' sx={{ marginTop: '30px', marginBottom: '30px' }}>
            {/* Tratamiento ---------------------- */}
            <Stack direction='row' sx={{ marginBottom: '30px' }}>
              <div className='medic-home-div' />
              <Typography fontSize='1.1rem' fontWeight='bold'>
                Tratamiento
              </Typography>
            </Stack>
            <Treatment />
          </Stack>

          <Divider />

          <Box sx={{ marginTop: '30px',  width: '100%' }}>
            {/* Generar receta ---------------------- */}
            <ButtonsMod
              variant='principal'
              textCont='Generar y firmar receta'
              height='2.5rem'
              width='100%'
              clickEvent=''
              type='button'
            />
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default GeneratePrescription;