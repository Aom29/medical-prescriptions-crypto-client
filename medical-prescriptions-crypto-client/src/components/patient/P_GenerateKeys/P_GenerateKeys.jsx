import { Box } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';
import { generateDHKeyPairNoDownload } from '../../../services/x25519/x25519.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import Auth from '../../../services/auth/auth';
import { useAlert } from '../../../context/Alert/AlertContext';

function P_GenerateKeys () {
  const { auth } = useAuth();
  const { showAlert } = useAlert();
    const handleGenerate = async () => {
      // ECDH key generation
    const {privateBase64, publicBase64 } = await generateDHKeyPairNoDownload(auth.nombre, password);
    const dhData = {
      usuario_id: auth.userId,
      keyType: 'ECDH',
      publicKey: publicBase64,
    }
    const dhResponse = await Auth.savePublicKey(dhData);
    if(dhResponse.status >= 400) {
      if(dhResponse.errors) {
        const errorValidation = Object.values(dhResponse.errors)[0];
        showAlert(errorValidation, 'error');
      }
      else {
        showAlert(dhResponse.message, 'error');
      }
      return;
    }
    const dhPrivateData = {
      usuario_id: auth.userId,
      privateKey: privateBase64,
    }
    const dhPrivateResponse = await Auth.savePrivateKey(dhPrivateData);
    if(dhPrivateResponse.status >= 400) {
      if(dhPrivateResponse.errors) {
        const errorValidation = Object.values(dhPrivateResponse.errors)[0];
        showAlert(errorValidation, 'error');
      }
      else {
        showAlert(dhPrivateResponse.message, 'error');
      }
      return;
    }
  };
  

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ButtonsMod
        variant='principal'
        textCont='Generar llaves'
        width='70%'
        clickEvent={handleGenerate}
        type='button'
      />
    </Box>
  );
}

export default P_GenerateKeys;