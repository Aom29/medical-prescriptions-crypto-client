import { Box, Stack, Typography }  from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function M_SCInformation ({ matricula, curp, nombre, fechaNacimiento, sexo, onGenerate}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '50px' }}>
      <Stack direction='row' sx={{ display: 'flex', width: '100%', flexDirection: {md: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
        <Stack direction='column' sx={{ width: {md: '60%', xs:'100%'}, marginBottom: '30px' }}>
          <Typography variant='body1' fontWeight='bold' color='#4224B0'>
            Matrícula: {matricula}
          </Typography>
          <Typography variant='body1' fontWeight={'bold'}>
            CURP: {curp}
          </Typography>
          <Typography>
            Nombre del Paciente: {nombre}
          </Typography>
          <Typography>
            Fecha de nacimiento: {fechaNacimiento}
          </Typography>
          <Typography>
            Sexo: {sexo}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', width: { md: '40%', xs: '100%' }, justifyContent: 'flex-end'}}>
          <ButtonsMod
            variant='principal'
            textCont='Generar receta'
            width='10rem'
            height='2.5rem'
            clickEvent={onGenerate}
            type='button'
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default M_SCInformation;