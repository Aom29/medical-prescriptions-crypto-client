import { Stack } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function A_RCButtonHome ({ setView }) {
  return (
    <Stack direction='row' sx={{ width: {xs: '90%', md: '50%' }, alignItems: 'flex-start', marginBottom: '30px' }}>
      <ButtonsMod
        variant='secundario'
        textCont='Home'
        width='9rem'
        clickEvent={() => setView('home')}
        startIcon={<ArrowBackIcon />}
        type='button'
      />
    </Stack>
  );
}

export default A_RCButtonHome;