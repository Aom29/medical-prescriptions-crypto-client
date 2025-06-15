import { TextField, Stack } from '@mui/material';

function PrescriptionTreatment ({ medicamento }) {
  const { nombre, dosis, duracion, frecuencia } = medicamento;

  return (
    <>
      <Stack direction="row" sx={{ width: '100%', marginBottom: '15px' }}>
        <TextField
          label="Nombre del medicamento"
          value={nombre}
          disabled
          fullWidth
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: '#4224B0',
            },
          }}
          />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} sx={{ marginBottom: '15px' }} spacing={2}>
        <TextField
          label="Dosis"
          value={dosis}
          disabled
          fullWidth
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: '#4224B0',
            },
          }}
          />
      </Stack>

      <Stack direction={{ md: 'row', xs: 'column' }} spacing={2} sx={{ marginBottom: '15px' }}>
        <TextField
          label="Duración"
          value={duracion}
          disabled
          fullWidth
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: '#4224B0',
            },
          }}
        />
        <TextField
          label="Frecuencia"
          value={frecuencia}
          disabled
          fullWidth
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: '#4224B0',
            },
          }}
        />
      </Stack>
    </>
  );
}

export default PrescriptionTreatment;