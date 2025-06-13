import { Stack, Typography } from '@mui/material';
import '../../css/medic/medic.css';

function Subtitle ({subtitulo}) {
  return (
    <Stack direction='row' sx={{ marginBottom: '30px' }}>
      <div className='medic-home-div' />
      <Typography fontSize='1.1rem' fontWeight='bold'>
        {subtitulo}
      </Typography>
    </Stack>
  );
};

export default Subtitle;