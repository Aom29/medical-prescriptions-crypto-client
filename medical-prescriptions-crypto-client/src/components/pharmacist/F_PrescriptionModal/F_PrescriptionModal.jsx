import { Box, Divider, DialogContent, TextField, Typography, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import F_PrescriptionInformation from './F_PrescriptionInformation';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import { useState, useEffect, useRef } from 'react';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import { deriveAndImportAESKey } from '../../../services/crypto/crypto.utils';
import { fromBase64 } from '../../../services/crypto/file.utils';

function F_PrescriptionModal({ recetaId }) {
  const { auth, privateKeyECDH } = useAuth();
  const [receta, setReceta] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);
  const [firmaMedico, setFirmaMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPasswordModal, setOpenPasswordModal] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");

  const passwordRef = useRef(null);
  const hasFetched = useRef(false);

  const handleDecrypt = async () => {
    try {
      passwordRef.current = passwordInput;
      setOpenPasswordModal(false);  // Cerrar modal

      const response = await Prescriptions.getDecipherementInformation(recetaId, auth.token);
      const { encryptedPrescription, publicKeyServidor, accessKey } = response;

      const encryptedKey = privateKeyECDH;
      const encryptedKeyBytes = fromBase64(encryptedKey);
      const salt = encryptedKeyBytes.slice(0, 16);
      const derivedKey = await deriveAndImportAESKey(passwordRef.current, salt);

      const deciphered = await decryptWithPasswordAndWrappedKey({
        wrappedAESKeyBase64: accessKey,
        cipherTextBase64: encryptedPrescription,
        privateKeyEncrypted: encryptedKey,
        derivedKey,
        serverPublicKeyBase64: publicKeyServidor
      });

      setPaciente(response.paciente);
      setMedico(response.medico);
      setFirmaMedico(response.prescription.firma_medico);
      setReceta(JSON.parse(deciphered));
    } catch (err) {
      console.error('Error al descifrar la receta:', err);
      setError('No se pudo descifrar la receta. Verifique su contraseña o intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current || !passwordRef.current) return;
    hasFetched.current = true;
    handleDecrypt();
  }, [recetaId, auth.token, auth.userId]);

  if (openPasswordModal) {
    return (
      <Dialog open fullWidth maxWidth="xs">
        <DialogTitle>Ingrese su contraseña</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="password"
            label="Contraseña"
            fullWidth
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecrypt} variant="contained">Aceptar</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (loading) {
    return <Typography textAlign="center">Cargando receta...</Typography>;
  }

  if (error || !receta) {
    return <Typography color="error" textAlign="center">{error || 'Receta no encontrada'}</Typography>;
  }

  return (
    <DialogContent>
      <Subtitle subtitulo='Información de la receta' />
      <F_PrescriptionInformation
        matricula={paciente.matricula}
        nombrePaciente={paciente.usuario.nombre}
        cedula={medico.cedula}
        nombreMedico={medico.usuario.nombre}
        clinica={medico.clinica}
        especialidad={medico.especialidad}
        fechaEmision={receta.fechaEmision}
      />

      <P_PDiagnosis diagnostico={receta.diagnostico} />

      <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
      <Subtitle subtitulo='Tratamiento' />
      {(receta.tratamiento || []).map((med, idx) => (
        <P_PTreatment key={idx} medicamento={med} />
      ))}

      <Subtitle subtitulo='Firmas' />
      <TextField
        disabled
        label='Firma médico'
        defaultValue={firmaMedico}
        multiline
        sx={{
          marginBottom: '15px', width: '100%',
          '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000' },
          '& .MuiInputLabel-root.Mui-disabled': { color: '#4224B0' }
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
