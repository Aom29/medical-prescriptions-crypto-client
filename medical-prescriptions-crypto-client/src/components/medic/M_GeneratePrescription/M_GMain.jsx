import { useRef, useState } from 'react';
import { Stack, TextField, Box, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
//* Componentes
import M_GCInformation from './M_GContent/M_GCInformation';
import M_GCDiagnosis from './M_GContent/M_GCDiagnosis';
import M_GCTreatment from './M_GContent/M_GCTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import Subtitle from '../../layout/Subtitle';
import { signFile } from '../../../services/crypto/eddsa/eddsa.service.js'
import { useAuth } from '../../../context/Auth/AuthContext';
import Prescriptions from '../../../services/prescriptions/prescriptions.service.js';
import { useAlert } from '../../../context/Alert/AlertContext.jsx';

function M_GMain ({ paciente }) {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamientoState, setTratamientoState] = useState([]);
  const [privateKey, setPrivateKey] = useState(null);
  const [password, setPassword] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const { auth, privateKeyEdDSA, privateKeyECDH } = useAuth();
  const { showAlert } = useAlert();
  const inputRef = useRef(null); // Referencia al input de archivo

  const handleGenerateAndSign = async () => {
    setOpenPasswordDialog(true);
  };

  const handlePasswordSubmit = async () => {
    const fechaEmision = new Date().toISOString().split('T')[0];
    const tratamiento = tratamientoState.map(({id, ...rest}) => rest);
    const receta = {
      id_paciente: paciente.id,
      id_medico: auth.userId,
      fechaEmision,
      diagnostico,
      tratamiento,
    };

    const jsonBuffer = new TextEncoder().encode(JSON.stringify(receta));
    
    try {
      const signature = await signFile(jsonBuffer, privateKeyEdDSA, password);
      console.log('Firma generada:', signature);
      const recetaFirmada = {
        ...receta,
        firma_medico: signature.base64,
      };

      setPassword(''); // Limpiar la contraseña después de usarla

      const response = await Prescriptions.uploadPrescription(recetaFirmada, auth.token);
      if(response.status >= 400) {
        if(response.errors) {
          const errorValidation = Object.values(response.errors)[0];
          showAlert(errorValidation, 'error');
        }
        else {
          showAlert(response.message, 'error');
        }
        return;
      }

      showAlert('Receta generada y firmada correctamente', 'success');
      setOpenPasswordDialog(false);
    } catch (error) {
      showAlert('Error al firmar la receta: ' + error.message, 'error');
    }

  };

  return (
    <Stack direction='column' sx={{ display: 'flex', justifyContent: 'center', padding: '2%' }}>
      {/* Datos generales ---------------------- */}
      <Stack direction="column" sx={{ marginBottom: '30px' }}>
        <Subtitle subtitulo='Datos generales'/>
        <M_GCInformation
          paciente={paciente}
          nombreMedico={auth.nombre}
          clinica={auth.clinica}
          especialidad={auth.especialidad}
          cedula={auth.cedula}
        />
      </Stack>

      <Divider />

      {/* Diagnóstico ---------------------- */}
      <Stack direction="column" sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Subtitle subtitulo='Diagnóstico'/>
        <M_GCDiagnosis value={diagnostico} onChange={setDiagnostico} />
      </Stack>

      <Divider />

      {/* Tratamiento ---------------------- */}
      <Stack direction="column" sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Subtitle subtitulo='Tratamiento'/>
        <M_GCTreatment value={tratamientoState} onChange={setTratamientoState} />
      </Stack>

      <Divider />

      <Box sx={{ marginTop: '30px', width: '100%' }}>
        <ButtonsMod
          variant="principal"
          textCont="Generar y firmar receta"
          height="2.5rem"
          width="100%"
          clickEvent={handleGenerateAndSign}
          type="button"
        />
      </Box>


      {/* HACER COMPONENTE MÁS BONITO */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Ingresa tu contraseña</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default M_GMain;