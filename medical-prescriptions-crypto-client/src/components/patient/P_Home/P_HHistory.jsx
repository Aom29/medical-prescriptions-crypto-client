import { Box, Stack, Typography } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

function P_HHistory ({ receta, setView }) {
  return (
    <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px', padding: '1%', alignItems:'center' }}>
      <Stack direction='column'>
        <Typography>
          ID Receta: {receta.id}
        </Typography>
        <Typography>
          Fecha de emisión: {receta.fechaEmision}
        </Typography>
        <Typography>
          Clínica: {receta.clinica}
        </Typography>
      </Stack>
      <Box>
        <ButtonsMod
          variant='secundario'
          textCont='Ver detalles'
          width='auto'
          clickEvent={() => setView('prescriptionDetail')}
          type='button'
        />
      </Box>
    </Stack>
  );
}

export default P_HHistory;