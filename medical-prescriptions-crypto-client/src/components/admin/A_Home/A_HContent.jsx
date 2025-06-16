import { Box } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

function A_HContent ({ nombreBoton, clickEvent }) {
  return (
    <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', marginBottom: '20px' }}>
      <ButtonsMod
        variant='secundario'
        textCont={nombreBoton}
        height='2.5rem'
        width={{ xs: '100%', md: '70%' }}
        clickEvent={clickEvent}
        type='button'
      />
    </Box>
  );
};

export default A_HContent;