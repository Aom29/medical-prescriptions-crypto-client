import { Box, Stack, Typography }  from '@mui/material';

function M_SCInformation ({ paciente }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '50px' }}>  
      <Stack direction='column' sx={{ width: {md: '60%', xs:'100%'}, marginBottom: '30px' }}>
        <Typography variant='body1' fontWeight='bold' color='#4224B0'>
          Matrícula: {paciente.matricula}
        </Typography>
        <Typography variant='body1' fontWeight={'bold'}>
          CURP: {paciente.curp}
        </Typography>
        <Typography>
          Nombre del Paciente: {paciente.nombre}
        </Typography>
        <Typography>
          Fecha de nacimiento: {paciente.fechaNacimiento}
        </Typography>
      </Stack>
    </Box>
  );
};

export default M_SCInformation;