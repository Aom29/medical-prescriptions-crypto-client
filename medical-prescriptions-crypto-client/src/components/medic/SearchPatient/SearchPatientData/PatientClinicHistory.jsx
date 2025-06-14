import { Box, Stack, Typography }  from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function PatientClinicHistory ({fechaEmision, diagnostico, setView}) {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      padding: 2,
    }}>
      <Stack sx={{ justifyContent: { sm: 'space-between' }, alignItems: 'center', width:'100%', flexDirection: {sm: 'row', xs: 'column'}}}>
        <Stack direction='column' sx={{ justifyContent: {xs: 'flex-start', width: { xs: '100%' }, alignContent: 'flex-start' }}}>
          <Typography>
            Fecha de emisión: {fechaEmision}
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
            clickEvent={() => setView('prescriptionDetail')}
            type='button'
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PatientClinicHistory;