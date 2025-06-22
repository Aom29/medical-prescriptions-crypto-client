import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';
import { generateDHKeyPairNoDownload } from '../../../services/crypto/x25519/x25519.service';
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
    showAlert('Eliminar este botón xd', 'success');
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