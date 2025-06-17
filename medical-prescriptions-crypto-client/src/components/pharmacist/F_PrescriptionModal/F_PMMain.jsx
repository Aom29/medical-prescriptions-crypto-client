import { Box, Divider, IconButton, Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../layout/Subtitle';
import F_PMInformation from './F_PMContent/F_PMInformation';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import P_PSign from '../../patient/P_Prescription/P_PContent/P_PSign';

function F_PMMain ({ open, onClose, receta }) {
  const medicamentos = [
    {
      nombre: 'Paracetamol',
      dosis: '500mg',
      duracion: '5 días',
      frecuencia: 'Cada 8 horas',
    },
    {
      nombre: 'Ibuprofeno',
      dosis: '400mg',
      duracion: '3 días',
      frecuencia: 'Cada 12 horas',
    },
    {
      nombre: '',
      dosis: '400mg',
      duracion: '3 días',
      frecuencia: 'Cada 12 horas',
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Información general de la receta ------------------- */}
        <Subtitle subtitulo='Información de la receta' />
        <F_PMInformation
          matricula={receta.matricula}
          nombrePaciente={receta.nombrePaciente}
          sexo={receta.sexo}
          cedula={receta.cedula}
          nombreMedico={receta.nombreMedico}
          clinica={receta.clinica}
          especialidad={receta.especialidad}
          fechaEmision={receta.fechaEmision}
        />

        {/* Diagnóstico ---------------------------------------- */}
        <P_PDiagnosis
          diagnostico={receta.diagnostico}
        />

        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Tratamiento ---------------------------------------- */}
        <Subtitle subtitulo='Tratamiento' />
        {medicamentos.map((medicamento, idx) => (
          <>
          <P_PTreatment key={idx} medicamento={medicamento} />
          </>
        ))}

        {/* Firmas ---------------------------------------- */}
        <Subtitle subtitulo='Firmas' />
        <P_PSign label='Firma médico'/>

      </DialogContent>
    </Dialog>
  );
}

export default F_PMMain;