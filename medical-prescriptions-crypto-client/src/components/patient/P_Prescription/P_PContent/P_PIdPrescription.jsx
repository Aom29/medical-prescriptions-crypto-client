import { Stack, Typography } from '@mui/material';
import '../../../../css/medic/medic.css';

function P_PIdPrescription ({ receta }) {
  return (
    <Stack direction='row' sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', marginBottom: '30px' }}>
      <Stack direction='row'>
        <div className='medic-home-div' />
        <Typography fontSize='1.1rem' fontWeight='bold' >
          ID Receta
        </Typography>
      </Stack>
      <Typography fontSize='1.2rem' fontWeight='bold' sx={{ marginLeft: '30px', color: '#4224B0' }}>
        {receta.idReceta}
      </Typography>
    </Stack>
  );
}

export default P_PIdPrescription;