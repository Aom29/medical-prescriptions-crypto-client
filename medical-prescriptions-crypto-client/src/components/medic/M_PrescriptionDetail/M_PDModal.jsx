import { Box, Divider, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Subtitle from '../../layout/Subtitle';
import M_GCInformation from '../M_GeneratePrescription/M_GContent/M_GCInformation';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';

import { useAuth } from '../../../context/Auth/AuthContext';
import { useEffect } from 'react';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';

function M_PDModal ({ recetaId }) {
  
  return (
    <>
    {/* Información general de la receta ------------------- */}
    <Subtitle subtitulo='Información de la receta' />
    <M_GCInformation
      matricula='32'
      curp='23'
      nombrePaciente='23'
      fechaNacimiento='32'
      cedula='32'
      nombreMedico='32'
      clinica='32'
      especialidad='32'
      fechaEmision='32'
    />

    {/* Diagnóstico ---------------------------------------- */}
    <P_PDiagnosis
      diagnostico='32'
    />

    <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
    {/* Tratamiento ---------------------------------------- */}
    <Subtitle subtitulo='Tratamiento' />
    {/* {medicamentos.map((medicamento, idx) => (
      <>
      <P_PTreatment key={idx} medicamento='32' />
      </>
    ))} */}

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

    </>
  );
}

export default M_PDModal;