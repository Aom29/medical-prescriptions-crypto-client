import { Stack } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RegisterHomeButton ({ setView }) {
  return (
    <Stack direction='row' sx={{ width: {xs: '80%', md: '50%' }, alignItems: 'flex-start', marginBottom: '30px' }}>
      <ButtonsMod
        variant='secundario'
        textCont='Home'
        width='9rem'
        clickEvent={() => setView('home')}
        startIcon={<ArrowBackIcon />}
        type='submit'
      />
    </Stack>
  );
}

export default RegisterHomeButton;