import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';
import { generateDHKeyPairNoDownload } from '../../../services/x25519/x25519.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import Auth from '../../../services/auth/auth';
import { useAlert } from '../../../context/Alert/AlertContext';

function P_GenerateKeys () {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
  };

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
    console.log(dhData);
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
      idUser: auth.userId,
      encryptedKey: privateBase64,
    }
    console.log(dhPrivateData);
    const dhPrivateResponse = await Auth.savePrivateKey(dhPrivateData, auth.token);
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
    showAlert('Llaves generadas y guardadas correctamente', 'success');
    handleClose();
  };
  

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ButtonsMod
        variant='principal'
        textCont='Generar llaves'
        width='70%'
        clickEvent={handleOpen}
        type='button'
      />
    </Box>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <DialogTitle>Ingrese su contraseña</DialogTitle>
      <DialogContent>
        <TextField
          label='Contraseña'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <ButtonsMod
          variant=''
          textCont='Cancelar'
          width='auto'
          clickEvent={handleClose}
          type='submit'
        />
        <ButtonsMod
          variant='principal'
          textCont='Generar'
          width='auto'
          clickEvent={handleGenerate}
          type='submit'
        />
      </DialogActions>
    </Dialog>
    </>
  );
}

export default P_GenerateKeys;