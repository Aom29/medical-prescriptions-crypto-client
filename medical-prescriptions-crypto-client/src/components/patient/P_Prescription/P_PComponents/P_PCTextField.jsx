import { Stack, TextField } from '@mui/material';

function P_PCTextField ({ label, value }) {
  return (
    <Stack direction="row" sx={{ width: '100%', marginBottom: '15px' }}>
      <TextField
        label={label}
        value={value}
        disabled
        fullWidth
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000',
          },
          '& .MuiInputLabel-root.Mui-disabled': {
            color: '#6034FD',
          },
        }}
        />
    </Stack>
  );
}

export default P_PCTextField;