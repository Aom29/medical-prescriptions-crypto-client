import { Box, Typography } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function P_PCButton ({ surtida, fechaSurtido }) {
  if (surtida) {
    return (
      <Box sx={{ marginTop: '30px', marginBottom: '30px', width: '100%' }}>
        <Typography color='success.main' align='right'>
          Receta surtida el {fechaSurtido}
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ marginTop: '30px', marginBottom: '30px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <ButtonsMod
        variant='principal'
        textCont='Surtir'
        width='100%'
        clickEvent={() => console.log('Receta marcada como surtida')}
        type='submit'
      />
    </Box>
  );
}

export default P_PCButton;