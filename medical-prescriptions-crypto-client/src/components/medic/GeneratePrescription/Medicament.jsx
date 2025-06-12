import { Stack, TextField, Box } from '@mui/material';
import ButtonsMod from '../../ButtonsMod';
import '../../../css/medic/medic.css';

function Medicament({ id, data, showDelete, onDelete, onChange }) {
  const { nombre, duracion, frecuencia } = data;

  console.log('Medicament data:', data); // Para depuración
  return (
    <>
      <Stack direction="row" sx={{ width: '100%', marginBottom: '15px' }}>
        <TextField
          label="Nombre del medicamento"
          value={nombre}
          onChange={(e) => onChange(id, { nombre: e.target.value })}  // Llama a onChange para actualizar el estado
          multiline
          rows={1}
          placeholder="Ej. Butilbromuro de hioscina"
          fullWidth
        />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }}>
        <TextField
          label="Duración"
          value={duracion}  
          onChange={(e) => onChange(id, { duracion: e.target.value })}  // Llama a onChange para actualizar el estado
          multiline
          rows={1}
          placeholder="Ej. Por 7 días"
          fullWidth
        />
        <TextField
          label="Frecuencia"
          value={frecuencia}  // Sincroniza el valor con el estado de "frecuencia"
          onChange={(e) => onChange(id, { frecuencia: e.target.value })}  // Llama a onChange para actualizar el estado
          multiline
          rows={1}
          placeholder="Ej. Cada 8 horas"
          fullWidth
        />
      </Stack>

      <Box sx={{ marginBottom: '35px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
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

export default Medicament;
