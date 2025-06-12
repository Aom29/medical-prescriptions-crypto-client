import { TextField }  from '@mui/material';
import '../../../css/medic/medic.css';

function Diagnosis () {
  return (
    <TextField
      id='filled-multiline-static'
      label='Descripción del diagnóstico'
      multiline
      rows={3}
      placeholder='Ej. Gastritis'
    />
  );
};

export default Diagnosis;