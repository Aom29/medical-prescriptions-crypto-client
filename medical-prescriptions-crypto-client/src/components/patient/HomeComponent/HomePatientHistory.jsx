import { Box, Card, Stack, Typography } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

function HomePatientHistory ({ fechaEmision, diagnostico, clinica }) {
  return (
    <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px', padding: '1%', alignItems:'center' }}>
      <Stack direction='column'>
        <Typography>
          Fecha de emisión: {fechaEmision}
        </Typography>
        <Typography>
          Diagnóstico: {diagnostico}
        </Typography>
        <Typography>
          Clínica: {clinica}
        </Typography>
      </Stack>
      <Box>
        <ButtonsMod
          variant='secundario'
          textCont='Ver detalles'
          width='auto'
          clickEvent=''
          type='button'
        />
      </Box>
    </Stack>
  );
}

export default HomePatientHistory;