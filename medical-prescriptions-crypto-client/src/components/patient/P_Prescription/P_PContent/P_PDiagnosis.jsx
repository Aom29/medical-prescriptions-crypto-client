import { TextField, Divider }  from '@mui/material';
import Subtitle from '../../../layout/Subtitle';

function P_PDiagnosis ({ diagnostico }) {
  return (
    <>
    <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
    <Subtitle subtitulo='Diagnóstico' />
    <TextField
      disabled
      id='filled-multiline-static'
      defaultValue={diagnostico}
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
    </>
  );
};

export default P_PDiagnosis;