import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function RegisterPassword ({ campo, formData, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      name={campo}
      value={formData[campo]}
      onChange={handleChange}
      label='Contraseña'
      type={showPassword ? 'text' : 'password'}
      sx={{ width: '100%', marginBottom: '20px' }}
      required
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={togglePasswordVisibility}
                edge='end'
                aria-label='mostrar/ocultar contraseña'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    >
    </TextField>
  );
}

export default RegisterPassword;