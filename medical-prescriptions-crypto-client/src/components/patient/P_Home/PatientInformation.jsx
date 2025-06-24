import { Box, Stack, Typography }  from '@mui/material';
import { useAuth } from '../../../context/Auth/AuthContext';

function PatientInformation () {
  const { auth } = useAuth();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '30px' }}>
      <Stack direction='row' sx={{ display: 'flex', width: '100%', flexDirection: {md: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
        <Stack direction='column' sx={{ width: {md: '60%', xs:'100%'}, marginBottom: '30px' }}>
          <Typography variant='body1' fontWeight='bold' color='#00a1b4'>
            Matrícula: {auth.matricula}
          </Typography>
          <Typography variant='body1'>
            CURP: {auth.curp}
          </Typography>
          <Typography>
            Nombre del Paciente: {auth.nombre}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', width: { md: '40%', xs: '100%' }, justifyContent: 'flex-end'}}>
        </Box>
      </Stack>
    </Box>
  );
};

export default PatientInformation;