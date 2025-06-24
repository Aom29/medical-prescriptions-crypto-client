import { Box, Divider, DialogContent, TextField } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import F_PrescriptionInformation from './F_PrescriptionInformation';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';

function F_PrescriptionModal ({ receta }) {

  return (
    <DialogContent>
      {/* Información general de la receta ------------------- */}
      <Subtitle subtitulo='Información de la receta' />
      <F_PrescriptionInformation
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
      {(receta.tratamiento || []).map((med, idx) => (
        <P_PTreatment key={idx} medicamento={med} />
      ))}
        
      

      {/* Firmas ---------------------------------------- */}
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
  );
}

export default F_PrescriptionModal;