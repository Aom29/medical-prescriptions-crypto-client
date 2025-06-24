import { Box, Divider, DialogContent, TextField, Typography} from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import F_PrescriptionInformation from './F_PrescriptionInformation';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import { useState, useEffect } from 'react';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import { deriveAndImportAESKey } from '../../../services/crypto/crypto.utils';
import { fromBase64 } from '../../../services/crypto/file.utils';
import KeyStorage from '../../../services/crypto/cryptoKeyStorage';
import { getDerivedKeyFromStorage } from '../../../services/crypto/patient.keys.service';

function F_PrescriptionModal ({ recetaId }) {

  const { auth, userPassword, privateKeyECDH } = useAuth();
  const [receta, setReceta] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);
  const [firmaMedico, setFirmaMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndDecryptReceta = async () => {
      try {
        const response = await Prescriptions.getDecipherementInformation(recetaId, auth.token);
        console.log('response', response);
        const { encryptedPrescription, publicKeyServidor, accessKey } = response;
        // const encryptedKey = await KeyStorage.getPrivateKey();
        // const derivedKey = await getDerivedKeyFromStorage();
        const encryptedKey = privateKeyECDH;
        const password = 'aom';
        const encryptedKeyBytes = fromBase64(encryptedKey);
        const salt = encryptedKeyBytes.slice(0, 16);
        const derivedKey = await deriveAndImportAESKey(password, salt);;

        console.log('wrappedAESKeyBase64', accessKey);
        console.log('cipherTextBase64', encryptedPrescription);
        console.log('privateKeyEncrypted', encryptedKey);
        console.log('derivedKey', derivedKey);
        console.log('serverPublicKeyBase64', publicKeyServidor);
        const deciphered = await decryptWithPasswordAndWrappedKey({
          wrappedAESKeyBase64: accessKey,
          cipherTextBase64: encryptedPrescription,
          privateKeyEncrypted: encryptedKey,
          derivedKey: derivedKey,
          serverPublicKeyBase64: publicKeyServidor
        });
        
        setPaciente(response.paciente);
        setMedico(response.medico);
        setFirmaMedico(response.prescription.firma_medico);

        const recetaJson = JSON.parse(deciphered);
        console.log(recetaJson)
        setReceta(recetaJson);
      } catch (err) {
        console.error('Error al descifrar la receta:', err);
        setError('No se pudo descifrar la receta. Verifique su contraseña o intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndDecryptReceta();
  }, [recetaId, auth.token, auth.userId, userPassword]);

  console.log('DATOS RECETA: ', receta);
  if (loading) {
    return <Typography textAlign="center">Cargando receta...</Typography>;
  }

  if (error || !receta) {
    return <Typography color="error" textAlign="center">{error || 'Receta no encontrada'}</Typography>;
  }

  return (
    <DialogContent>
      {/* Información general de la receta ------------------- */}
      <Subtitle subtitulo='Información de la receta' />
      <F_PrescriptionInformation
        matricula={receta.matricula}
        nombrePaciente={receta.nombrePaciente}
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