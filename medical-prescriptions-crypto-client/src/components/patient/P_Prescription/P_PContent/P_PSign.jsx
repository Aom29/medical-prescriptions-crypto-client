import { Box } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function P_PSign ({ label }) {
  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <ButtonsMod
        variant='secundario'
        textCont={label}
        width='100%'
        clickEvent=''
        type='button'
      />
    </Box>
  );
}

export default P_PSign;