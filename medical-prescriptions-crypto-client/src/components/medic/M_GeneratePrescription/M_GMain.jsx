import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, Stack, TextField, Box, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
//* Componentes
import M_GCInformation from './M_GContent/M_GCInformation';
import M_GCDiagnosis from './M_GContent/M_GCDiagnosis';
import M_GCTreatment from './M_GContent/M_GCTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import Subtitle from '../../layout/Subtitle';
import { signFile, verifyFile } from '../../../services/eddsa/eddsa.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAlert } from '../../../context/Alert/AlertContext.jsx';

function M_GMain ({ setView, paciente }) {
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState([]);
  const [publicKey, setPublicKey] = useState(null);
  const [password, setPassword] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const { auth, privateKeyEdDSA, privateKeyECDH } = useAuth();
  const { showAlert } = useAlert();
  const inputRef = useRef(null); // Referencia al input de archivo

  const handleClickBoton = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Simula el clic en el input de archivo
    }
  };

  const handleArchivoCargado = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        const contenido = reader.result;
        setPublicKey(contenido);
        console.log('Contenido del archivo:', contenido);
      };
      reader.readAsText(archivo);
    }
  };

  const handleGenerateAndSign = async () => {
    if (!publicKey) {
      alert('Por favor, carga tu clave privada antes de generar la receta.');
      return;
    }

    setOpenPasswordDialog(true);
  };

  const handlePasswordSubmit = async () => {
    const fechaEmision = new Date().toISOString().split('T')[0];
    const receta = {
      id_paciente: '2878a072-3203-4c33-81e8-81ed4ca7875e',
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

      console.log('Json que se envía al backend:', recetaFirmada);
      console.log('Clave privada utilizada:', privateKeyEdDSA);
      setPassword('');

      const isVerified = await verifyFile(
        jsonBuffer,
        recetaFirmada.firma_medico,
        publicKey
      );

      console.log('Verificación de firma:', isVerified);


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
    } catch (error) {
      showAlert('Error al firmar la receta: ' + error.message, 'error');
    }

  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: { md: '80%', xs: '100%' }, padding: '2%' }}>
        <IconButton onClick={() => setView('buscar')} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBack />
        </IconButton>

        <CardHeader title='Generar receta' />
        <CardContent>
          {/* Datos generales ---------------------- */}
          <Stack direction="column" sx={{ marginBottom: '30px' }}>
            <Subtitle subtitulo='Datos generales'/>
            <M_GCInformation
              paciente={paciente}
              fechaEmision="11/06/2025"
              nombreMedico="Paolina Olvera"
              clinica="Clínica de Iztapalacra"
              especialidad="Alta especialidad"
              cedula="299309403"
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
            <M_GCTreatment value={tratamiento} onChange={setTratamiento} />
          </Stack>

          <Divider />

          <Box sx={{ marginTop: '30px', width: '100%' }}>
            <input
              type="file"
              accept=".key,.pem"
              ref={inputRef} // Asignar la referencia al input de archivo
              onChange={handleArchivoCargado}
              style={{ display: 'none' }} // Ocultar el input de archivo
            />
            <Button
              variant="outlined"
              onClick={handleClickBoton} // Activar el input de archivo
              fullWidth
              sx={{ marginBottom: '20px' }}
            >
              Cargar clave privada
            </Button>
            {/* Generar receta ---------------------- */}
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
        </CardContent>
      </Card>
    </Box>
  );
}

export default M_GMain;