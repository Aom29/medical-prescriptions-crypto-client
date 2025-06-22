import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Divider,
  IconButton,
  Typography
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
import { decryptWithPasswordAndWrappedKey } from '../../../services/crypto/aesgcm/aes.gcm.service';
import KeyStorage from '../../../services/crypto/cryptoKeyStorage';
import { getDerivedKeyFromStorage } from '../../../services/crypto/patient.keys.service';

function P_PMain({ setView, recetaId }) {
  const { auth, userPassword } = useAuth();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndDecryptReceta = async () => {
      try {
        const response = await Prescriptions.getDecipherementInformation('21d0e6c3-6d0a-4d75-a58e-1cdb5e72f06f', auth.token);
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
    </Stack>
  );
}

export default P_PMain;
