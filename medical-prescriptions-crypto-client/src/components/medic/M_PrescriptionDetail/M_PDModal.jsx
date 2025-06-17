import { Box, Divider, IconButton, Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../layout/Subtitle';
import M_GCInformation from '../M_GeneratePrescription/M_GContent/M_GCInformation';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import P_PSign from '../../patient/P_Prescription/P_PContent/P_PSign';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';

function M_PDModal ({ open, onClose, receta }) {
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
        <M_GCInformation
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
        <P_PDiagnosis
          diagnosis={receta.diagnosis}
        />

        <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
        {/* Tratamiento ---------------------------------------- */}
        <Subtitle subtitulo='Tratamiento' />
        {medicamentos.map((med, idx) => (
          <>
          <P_PTreatment key={idx} medicamento={med} />
          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          </>
        ))}

        {/* Firmas ---------------------------------------- */}
        <Subtitle subtitulo='Firmas' />
        <P_PSign
          label='Firma médico'
        />

      </DialogContent>
    </Dialog>
  );
}

export default M_PDModal;