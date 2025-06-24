import { Box, Divider, IconButton, Dialog, DialogContent, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../layout/Subtitle';
import M_GCInformation from '../M_GeneratePrescription/M_GContent/M_GCInformation';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
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
        <Subtitle subtitulo='Firmas' />
        <TextField
          disabled
          label='Firma médico'
          defaultValue=''
          multiline
          sx={{
            marginBottom: '15px', width: '100%',
            '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000', },
            '& .MuiInputLabel-root.Mui-disabled': { color: '#4224B0',},
          }}
        />
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <ButtonsMod
            variant='secundario'
            textCont='Verificar firma'
            width='100%'
            clickEvent=''
            type='button'
          />
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default M_PDModal;