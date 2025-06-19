import { Box } from '@mui/material';
import ButtonsMod from "../../layout/ButtonsMod";

function M_HButtonsKeys () {
  return (
    <Box sx={{ marginTop: '30px' }}>
      <ButtonsMod
        variant='principal'
        textCont='Generar llaves'
        width='auto'
        clickEvent=''
        type='submit'
      />
    </Box>
  );
}

export default M_HButtonsKeys;