import { TextField }  from '@mui/material';

function M_GCDiagnosis ({ value, onChange }) {
  return (
    <TextField
      id='filled-multiline-static'
      label='Descripción del diagnóstico'
      multiline
      rows={3}
      placeholder='Ej. Gastritis'
      autoComplete='off'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default M_GCDiagnosis;