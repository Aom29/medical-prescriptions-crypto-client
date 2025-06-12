import { Card, CardContent, CardHeader, Stack, Typography, Box, Divider }  from '@mui/material';
import '../../../css/medic/medic.css';
import GeneralData from './GeneralData';
import Diagnosis from './Diagnosis';
import Treatment from './Treatment';
import ButtonsMod from '../../ButtonsMod';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

function GeneratePrescription ({ setView }) {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState([]);
  
  const handleGenerateAndSign = async => {
    const fechaEmision = new Date().toISOString().split('T')[0]; 

    const receta = {
      id_paciente: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      id_medico: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
      fechaEmision,
      diagnostico,
      tratamiento,
    };

    console.log('Receta generada:', receta);
    const jsonBuffer = new TextEncoder().encode(JSON.stringify(receta));
    console.log('Buffer JSON:', jsonBuffer);
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: { md: '80%', xs: '100%' }, padding: '2%' }}>
        <IconButton onClick={() => setView('buscar')} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>

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
              nombrePaciente='Aarón Reyes'
              fechaNacimiento='23/01/2003'
              sexo='Masculino'

              fechaEmision='11/06/2025'
              nombreMedico='Paolina Olvera'
              clinica='Clínica de Iztapalacra'
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
            <Diagnosis value={diagnostico} onChange={setDiagnostico}/>
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
            <Treatment value={tratamiento} onChange={setTratamiento}/>
          </Stack>

          <Divider />

          <Box sx={{ marginTop: '30px',  width: '100%' }}>
            {/* Generar receta ---------------------- */}
            <ButtonsMod
              variant='principal'
              textCont='Generar y firmar receta'
              height='2.5rem'
              width='100%'
              clickEvent={handleGenerateAndSign}
              type='button'
            />
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default GeneratePrescription;