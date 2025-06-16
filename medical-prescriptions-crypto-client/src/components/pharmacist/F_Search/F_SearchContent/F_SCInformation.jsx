import { Box, Stack, Typography }  from '@mui/material';

function F_SCInformation ({ datosPaciente }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '30px' }}>
      <Stack direction='row' sx={{ display: 'flex', width: '100%', flexDirection: {md: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
        <Stack direction='column' sx={{ width: {md: '60%', xs:'100%'} }}>
          <Typography variant='body1' fontWeight='bold' color='#4224B0'>
            Matrícula: {datosPaciente.matricula}
          </Typography>
          <Typography>
            Nombre del Paciente: {datosPaciente.nombre}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default F_SCInformation;