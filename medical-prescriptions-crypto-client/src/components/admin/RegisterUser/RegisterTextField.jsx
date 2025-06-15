import { TextField } from "@mui/material";

function RegisterTextField ({ campo, formData, handleChange, label, type='text' }) {
  return (
    <TextField
      name={campo}
      value={formData[campo]}
      onChange={handleChange}
      label={label}
      type={type}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      sx={{ width: '100%', marginBottom: '20px' }}
      required
    />
  );
}

export default RegisterTextField;