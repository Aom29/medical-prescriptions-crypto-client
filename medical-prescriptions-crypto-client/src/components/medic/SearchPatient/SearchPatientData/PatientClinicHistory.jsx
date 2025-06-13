import { Box, Stack, Typography }  from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function PatientClinicHistory ({fecha, diagnostico}) {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      padding: 2,
      borderRadius: 1,
      boxShadow: 1,
    }}>
      <Stack sx={{ justifyContent: { sm: 'space-between' }, alignItems: 'center', width:'100%', flexDirection: {sm: 'row', xs: 'column'}}}>
        <Stack direction='column' sx={{ justifyContent: {xs: 'flex-start', width: { xs: '100%' }, alignContent: 'flex-start' }}}>
          <Typography>
            Fecha de realización: {fecha}
          </Typography>
          <Typography>
            Diagnóstico: {diagnostico}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <ButtonsMod
            variant='secundario'
            textCont='Ver detalles'
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

export default PatientClinicHistory;