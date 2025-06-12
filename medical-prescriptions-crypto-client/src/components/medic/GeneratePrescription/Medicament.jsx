import { Stack, TextField, Box }  from '@mui/material';
import ButtonsMod from '../../ButtonsMod';
import '../../../css/medic/medic.css';

function Medicament ({ id, showDelete, onDelete }) {
  return (
    <>
    <Stack direction='row' sx={{ width: '100%', marginBottom: '15px' }}>
      <TextField
        id='filled-multiline-static'
        label='Nombre del medicamento'
        multiline
        rows={1}
        placeholder='Ej. Butilbromuro de hioscina'
        fullWidth
      />
    </Stack>
    
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }}>
      <TextField
        id='filled-multiline-static'
        label='Duración'
        multiline
        rows={1}
        placeholder='Ej. Por 7 días'
        fullWidth
        sx={{ marginBottom: { xs: '15px', md: '10px' } }}
      />
      <TextField
        id='filled-multiline-static'
        label='Frecuencia'
        multiline
        rows={1}
        placeholder='Ej. Cada 8 horas'
        fullWidth
      />
    </Stack>

    <Box sx={{ marginBottom: '35px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      {showDelete && (
        <ButtonsMod
          variant='eliminar'
          textCont='Eliminar medicamento'
          height='2.5rem'
          clickEvent={onDelete}
          type='button'
        />
      )}
    </Box>
    </>
  );
};

export default Medicament;