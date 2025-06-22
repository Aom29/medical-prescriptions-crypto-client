import { useEffect, useState } from 'react';
import { Stack, Divider, Box, TextField } from '@mui/material';

import Subtitle from '../../layout/Subtitle';
import P_PInformation from './P_PContent/P_PInformation';
import P_PDiagnosis from './P_PContent/P_PDiagnosis';
import P_PTreatment from './P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import P_PCButton from './P_PComponents/P_PCButton';

import Patient from '../../../services/patient/patient';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import KeyStorage from '../../../services/crypto/cryptoKeyStorage';
import { getDerivedKeyFromStorage } from '../../../services/crypto/patient.keys.service';

function P_PrescriptionDetail({ receta }) {
  // const { auth, userPassword } = useAuth();
  // const [receta, setReceta] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchAndDecryptReceta = async () => {
  //     try {
  //       const response = await Prescriptions.getDecipherementInformation('21d0e6c3-6d0a-4d75-a58e-1cdb5e72f06f', auth.token);
  //       const { encryptedPrescription, publicKeyServidor, accessKey } = response;
  //       const encryptedKey = await KeyStorage.getPrivateKey();
  //       const derivedKey = await getDerivedKeyFromStorage();

  //       const deciphered = await decryptWithPasswordAndWrappedKey({
  //         wrappedAESKeyBase64: accessKey,
  //         cipherTextBase64: encryptedPrescription,
  //         privateKeyEncrypted: encryptedKey,
  //         derivedKey,
  //         serverPublicKeyBase64: publicKeyServidor
  //       });

  //       const recetaJson = JSON.parse(deciphered);
  //       console.log(recetaJson)
  //       setReceta(recetaJson);
  //     } catch (err) {
  //       console.error('Error al descifrar la receta:', err);
  //       setError('No se pudo descifrar la receta. Verifique su contraseña o intente nuevamente.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAndDecryptReceta();
  // }, [recetaId, auth.token, auth.userId, userPassword]);

  // if (loading) {
  //   return <Typography textAlign="center">Cargando receta...</Typography>;
  // }

  // if (error || !receta) {
  //   return <Typography color="error" textAlign="center">{error || 'Receta no encontrada'}</Typography>;
  // }

  return (
    <Stack direction='column' sx={{ width: '100%', padding: '2%', display: 'flex', justifyContent: 'flex-start' }}>
      <Subtitle subtitulo='Información de la receta' />
      {/* Información del paciente y médico que generó la receta */}
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
        defaultValue={receta.firmas.medico}
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
            defaultValue={receta.firmas.farmaceutico}
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
