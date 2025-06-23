import { useEffect, useState } from 'react';
import { Stack, Divider, Box, TextField, Typography } from '@mui/material';

import Subtitle from '../../layout/Subtitle';
import P_PInformation from './P_PContent/P_PInformation';
import P_PDiagnosis from './P_PContent/P_PDiagnosis';
import P_PTreatment from './P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import P_PCButton from './P_PComponents/P_PCButton';

import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import KeyStorage from '../../../services/crypto/cryptoKeyStorage';
import { getDerivedKeyFromStorage } from '../../../services/crypto/patient.keys.service';

function P_PrescriptionDetail({ recetaId }) {
  const { auth, userPassword } = useAuth();
  const [receta, setReceta] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndDecryptReceta = async () => {
      try {
        const response = await Prescriptions.getDecipherementInformation(recetaId, auth.token);
        const { encryptedPrescription, publicKeyServidor, accessKey } = response;
        const encryptedKey = await KeyStorage.getPrivateKey();
        const derivedKey = await getDerivedKeyFromStorage();

        const deciphered = await decryptWithPasswordAndWrappedKey({
          wrappedAESKeyBase64: accessKey,
          cipherTextBase64: encryptedPrescription,
          privateKeyEncrypted: encryptedKey,
          derivedKey,
          serverPublicKeyBase64: publicKeyServidor
        });
        
        setPaciente(response.paciente);
        setMedico(response.medico);

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
    <Stack direction='column' sx={{ width: '100%', padding: '2%', display: 'flex', justifyContent: 'flex-start' }}>
      <Subtitle subtitulo='Información de la receta' />
      {/* Información del paciente y médico que generó la receta */}
      <P_PInformation paciente={paciente} medico={medico} fechaEmision={receta.fechaEmision} />
      
      {/* Botón para ver farmacéuticos cuando la receta no ha sido surtida */}
      <P_PCButton surtida={receta.surtida} fechaSurtido={receta.fechaSurtido} />

      {/* Espacio para ver el diagnóstico del paciente */}
      <P_PDiagnosis diagnostico={receta.diagnostico} />

      {/* Espacio para ver el tratamiento del paciente */}
      <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />
      <Subtitle subtitulo='Tratamiento' />
      {(receta.tratamiento || []).map((med, idx) => (
        <P_PTreatment key={idx} medicamento={med} />
      ))}

      {/* Espacio para ver la firma del médico y verificar */}
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

      {/* Espacio para ver la firma del farmacéutico y verificar */}
      {receta.surtida &&
        <>
          <TextField
            disabled
            label='Firma farmacéutico'
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
      }
    </Stack>
  );
}

export default P_PrescriptionDetail;
