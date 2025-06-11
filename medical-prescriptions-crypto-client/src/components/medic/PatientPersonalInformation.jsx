import { Box, Stack, Typography }  from '@mui/material';
import '../../css/medic/medic.css';
import ButtonsMod from '../ButtonsMod';

function PatientPersonalInformation () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '50px' }}>
      <Stack variant='row' sx={{ display: 'flex', width: '100%', flexDirection: {md: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
        <Stack variant='row' sx={{ width: {md: '60%', xs:'100%'}, marginBottom: '30px' }}>
          <Typography variant='body1' fontWeight='bold' color='#4224B0'>
            Matrícula 2025493382
          </Typography>
          <Typography>
            Ramírez Martínez Serge
          </Typography>
          <Typography>
            Fecha de nacimiento: 02/03/1999
          </Typography>
          <Typography>
            Sexo: Hombre
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', width: { md: '40%', xs: '100%' }, justifyContent: 'flex-end'}}>
          <ButtonsMod
            variant='principal'
            textCont='Generar receta'
            width='10rem'
            height='2.5rem'
            clickEvent=''
            type='button'
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PatientPersonalInformation;