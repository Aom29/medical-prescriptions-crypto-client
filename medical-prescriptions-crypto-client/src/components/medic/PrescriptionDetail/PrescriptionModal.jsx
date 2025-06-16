import { Box, CardContent, Stack, Divider, IconButton, Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../layout/Subtitle';
import PrescriptionData from '../GeneratePrescription/PrescriptionData';
import PrescriptionTreatment from '../../patient/PrescriptionDetail/PrescriptionTreatment';
import PrescriptionSign from '../../patient/PrescriptionDetail/PrescriptionSign';
import PrescriptionDiagnosis from '../../patient/PrescriptionDetail/PrescriptionDiagnosis';

function PrescriptionModal ({ open, onClose, receta }) {
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
        <PrescriptionData
          matricula={receta.matricula}
          curp={receta.curp}
          nombrePaciente={receta.nombrePaciente}
          fechaNacimiento={receta.fechaNacimiento}
          sexo={receta.sexo}
          cedula={receta.cedula}
          nombreMedico={receta.nombreMedico}
          clinica={receta.clinica}
          especialidad={receta.especialidad}
          fechaEmision={receta.fechaEmision}
        />

        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Diagnóstico ---------------------------------------- */}
        <Subtitle subtitulo='Diagnóstico' />
        <PrescriptionDiagnosis
          diagnosis={receta.diagnosis}
        />

        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Tratamiento ---------------------------------------- */}
        <Subtitle subtitulo='Tratamiento' />
        {medicamentos.map((med, idx) => (
          <>
          <PrescriptionTreatment key={idx} medicamento={med} />
          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          </>
        ))}

        {/* Firmas ---------------------------------------- */}
        <Subtitle subtitulo='Firmas' />
        <PrescriptionSign
          label='Firma médico'
        />

      </DialogContent>
    </Dialog>
  );
}

export default PrescriptionModal;