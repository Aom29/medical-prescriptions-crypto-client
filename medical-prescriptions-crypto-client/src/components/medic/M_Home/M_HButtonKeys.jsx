import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import ButtonsMod from "../../layout/ButtonsMod";
import { generateKeyPair } from '../../../services/eddsa/eddsa.service';
import { generateDHKeyPair } from '../../../services/x25519/x25519.service';
import { useAuth } from '../../../context/Auth/AuthContext';
import  Auth  from '../../../services/auth/auth';
import { useAlert } from '../../../context/Alert/AlertContext';

function M_HButtonsKeys () {
  const { auth } = useAuth();
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
  };

  const handleGenerate = async () => {
    // Eddsa key generation
    const { privateKey, publicKey } = await generateKeyPair(auth.nombre, password);
    const data = {
      usuario_id: auth.userId,
      keyType: 'EdDSA',
      publicKey: publicKey,
    }
    const response = await Auth.savePublicKey(data);
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

    // ECDH key generation
    const { privateBase64, publicBase64 } = await generateDHKeyPair(auth.nombre, password);
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

    handleClose();
  };

  return (
    <>
    <Box sx={{ marginTop: '30px' }}>
      <ButtonsMod
        variant='principal'
        textCont='Generar llaves'
        width='auto'
        clickEvent={handleOpen}
        type='submit'
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

export default M_HButtonsKeys;