import { TextField }  from '@mui/material';

function PrescriptionDiagnosis ({ diagnosis }) {
  return (
    <TextField
      disabled
      id='filled-multiline-static'
      label='Descripción del diagnóstico'
      defaultValue={diagnosis}
      multiline
      sx={{
        width: '100%',
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: '#000',
        },
        '& .MuiInputLabel-root.Mui-disabled': {
          color: '#4224B0',
        },
      }}
    />
  );
};

export default PrescriptionDiagnosis;