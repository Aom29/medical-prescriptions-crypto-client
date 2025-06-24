import { Stack, TextField, Box } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function M_GCMedicament({ id, data, showDelete, onDelete, onChange }) {
  const { nombre, dosis, duracion, frecuencia } = data;

  const handleInputChange = (e, field) => {
    const updatedFields = { [field]: e.target.value }; // Crea un objeto con el campo actualizado
    onChange(id, updatedFields); // Pasa los datos al padre
  };

  return (
    <>
      <Stack direction='row' sx={{ width: '100%', marginBottom: '15px' }}>
        <TextField
          label='Nombre del medicamento'
          autoComplete='off'
          value={nombre}
          onChange={(e) => handleInputChange(e, 'nombre')}
          fullWidth
        />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }}>
        <TextField
          label='Dosis'
          autoComplete='off'
          value={dosis}
          onChange={(e) => handleInputChange(e, 'dosis')}
          fullWidth
        />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }}>
        <TextField
          label='Duración'
          autoComplete='off'
          value={duracion}
          onChange={(e) => handleInputChange(e, 'duracion')}
          fullWidth
        />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }}>
        <TextField
          label='Frecuencia'
          autoComplete='off'
          value={frecuencia}
          onChange={(e) => handleInputChange(e, 'frecuencia')}
          fullWidth
        />
      </Stack>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {showDelete && (
          <ButtonsMod
            variant="eliminar"
            textCont="Eliminar medicamento"
            height="2.5rem"
            clickEvent={onDelete}
            type="button"
          />
        )}
      </Box>
    </>
  );
}

export default M_GCMedicament;