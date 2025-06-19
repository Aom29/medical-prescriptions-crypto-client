import { Box } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

function P_GenerateKeys () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ButtonsMod
        variant='principal'
        textCont='Generar llaves'
        width='70%'
        clickEvent=''
        type='button'
      />
    </Box>
  );
}

export default P_GenerateKeys;