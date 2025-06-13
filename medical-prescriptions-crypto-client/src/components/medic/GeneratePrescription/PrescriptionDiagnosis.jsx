import { TextField }  from '@mui/material';
import '../../../css/medic/medic.css';

function PrescriptionDiagnosis ({ value, onChange }) {
  return (
    <TextField
      id='filled-multiline-static'
      label='Descripción del diagnóstico'
      multiline
      rows={3}
      placeholder='Ej. Gastritis'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default PrescriptionDiagnosis;