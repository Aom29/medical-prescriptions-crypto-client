import { Divider } from '@mui/material'; 
import P_PCTextField from '../P_PComponents/P_PCTextField';

function P_PTreatment ({ medicamento }) {
  return (
    <>
      <P_PCTextField label='Nombre del medicamento' value={medicamento.nombre} />

      <P_PCTextField label='Dosis' value={medicamento.dosis} />

      <P_PCTextField label='Duración' value={medicamento.duracion} />
      
      <P_PCTextField label='Frecuencia' value={medicamento.frecuencia} />

      <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
    </>
  );
}

export default P_PTreatment;