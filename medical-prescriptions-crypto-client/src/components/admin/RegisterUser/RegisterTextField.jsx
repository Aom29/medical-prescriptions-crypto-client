import { TextField } from "@mui/material";

function RegisterTextField ({ campo, formData, handleChange, label }) {
  return (
    <TextField
      name={campo}
      value={formData[campo]}
      onChange={handleChange}
      sx={{ width: '100%', marginBottom: '20px' }}
      id='filled-multiline-static'
      label={label}
      required
    />
  );
}

export default RegisterTextField;