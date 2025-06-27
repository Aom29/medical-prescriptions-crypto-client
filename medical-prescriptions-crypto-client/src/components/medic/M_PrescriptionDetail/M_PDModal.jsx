import { Box, Divider, Stack, TextField, Typography } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import P_PTreatment from '../../patient/P_Prescription/P_PContent/P_PTreatment';
import ButtonsMod from '../../layout/ButtonsMod';
import P_PDiagnosis from '../../patient/P_Prescription/P_PContent/P_PDiagnosis';

import { useAuth } from '../../../context/Auth/AuthContext';
import { useEffect, useState } from 'react';
import Prescriptions from '../../../services/prescriptions/prescriptions.service';
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import { deriveAndImportAESKey } from '../../../services/crypto/crypto.utils';
import { fromBase64 } from '../../../services/crypto/file.utils';

function M_PDModal ({ recetaId }) {
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
        const encryptedKey = privateKeyECDH;
        const password = prompt("Ingresa tu contraseña de la clave privada de X25519:");
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
    <>
    {/* Información general de la receta ------------------- */}
    <Subtitle subtitulo='Información de la receta' />
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '50px', xs: '0px' } }}>
        <Typography fontWeight='bold'>
          Matrícula {paciente.matricula}
        </Typography>
        <Typography>
          CURP: {paciente.curp}
        </Typography>
        <Typography>
          Nombre del Paciente: {paciente.usuario.nombre}
        </Typography>
        <Typography>
          Fecha de nacimiento: {paciente.usuario.fechaNacimiento}
        </Typography>
      </Stack>

      {/* Datos médico y generales ----------------- */}
      <Stack direction='column'>
        <Typography>
          Cédula Profesional: {medico.cedula}
        </Typography>
        <Typography>
          Médico: {medico.usuario.nombre}
        </Typography>
        <Typography>
          Clínica: {medico.clinica}
        </Typography>
        <Typography>
          Especialidad: {medico.especialidad}
        </Typography>
      </Stack>
    </Stack>

    {/* Diagnóstico ---------------------------------------- */}
    <P_PDiagnosis
      diagnostico= {receta.diagnostico}
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
      defaultValue={firmaMedico}
      multiline
      sx={{
        marginBottom: '15px', width: '100%',
        '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000', },
        '& .MuiInputLabel-root.Mui-disabled': { color: '#6034FD',},
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