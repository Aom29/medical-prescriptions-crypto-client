import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Divider,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

import Subtitle from '../../layout/Subtitle';
import P_PIdPrescription from './P_PContent/P_PIdPrescription';
import P_PInformation from './P_PContent/P_PInformation';
import P_PDiagnosis from './P_PContent/P_PDiagnosis';
import P_PTreatment from './P_PContent/P_PTreatment';
import P_PSign from './P_PContent/P_PSign';
import P_PCButton from './P_PComponents/P_PCButton';

import Patient from '../../../services/patient/patient';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import { decryptWithPasswordAndWrappedKey } from '../../../services/aesgcm/aes.gcm.service';

function P_PMain({ setView, recetaId }) {
  const { auth } = useAuth();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingDecryptionData, setPendingDecryptionData] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        console.log('Receta ID:', recetaId);
        const response = await Prescriptions.getDecipherementInformation(recetaId, auth.token);
        const { encryptedPrescription, publicKeyServidor, accessKey } = response;
        const response2 = await Patient.getPrivateKey(auth.userId, auth.token);
        const { encryptedKey } = response2;

        setPendingDecryptionData({
          encryptedPrescription,
          publicKeyServidor,
          accessKey,
          encryptedKey
        });

        setOpenPasswordModal(true);
      } catch (err) {
        setError('Error al conectar con el servidor');
        console.error(err);
        setLoading(false);
      }
    };

    fetchReceta();
  }, [recetaId, auth.token]);

  const handleDecrypt = async () => {
    try {
      const {
        encryptedPrescription,
        publicKeyServidor,
        accessKey,
        encryptedKey
      } = pendingDecryptionData;

      const deciphered = await decryptWithPasswordAndWrappedKey({
        wrappedAESKeyBase64: accessKey,
        cipherTextBase64: encryptedPrescription,
        privateKeyEncrypted: encryptedKey,
        password: passwordIngresadaPorElUsuario,
        serverPublicKeyBase64: publicKeyServidor
      });

      console.log('Descifrado exitoso:', deciphered);

      const recetaJson = JSON.parse(deciphered);
      setReceta(recetaJson);
      setOpenPasswordModal(false);
    } catch (err) {
      console.error('Error al descifrar:', err);
      setError('La contraseña es incorrecta o hubo un error al descifrar.');
      setOpenPasswordModal(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography textAlign="center">Cargando receta...</Typography>;
  }

  if (error || !receta) {
    return <Typography color="error" textAlign="center">{error || 'Receta no encontrada'}</Typography>;
  }

  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: { xs: '100%', sm: '100%', md: '80%' }, padding: '2%' }}>
        <IconButton onClick={() => setView('home')} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBack />
        </IconButton>
        <CardContent>
          <P_PIdPrescription receta={receta} />

          <Subtitle subtitulo='Información de la receta' />
          <P_PInformation
            matricula={receta.matricula}
            curp={receta.curp}
            nombrePaciente={receta.nombrePaciente}
            fechaNacimiento={receta.fechaNacimiento}
            sexo={receta.sexo}
            cedula={receta.cedulaMedico}
            nombreMedico={receta.nombreMedico}
            clinica={receta.clinica}
            especialidad={receta.especialidad}
            fechaEmision={receta.fechaEmision}
          />
          <P_PCButton surtida={receta.surtida} fechaSurtido={receta.fechaSurtido} />

          <P_PDiagnosis diagnostico={receta.diagnostico} />

          <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />
          <Subtitle subtitulo='Tratamiento' />
          {(receta.tratamiento || []).map((med, idx) => (
            <P_PTreatment key={idx} medicamento={med} />
          ))}

          <Subtitle subtitulo='Firmas' />
          <P_PSign label='Firma médico' />
          {receta.surtida && <P_PSign label='Firma farmacéutico' />}
        </CardContent>
      </Card>

      <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
        <DialogTitle>Ingrese su contraseña</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            label="Contraseña"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordModal(false)}>Cancelar</Button>
          <Button onClick={handleDecrypt} variant="contained">Descifrar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default P_PMain;
