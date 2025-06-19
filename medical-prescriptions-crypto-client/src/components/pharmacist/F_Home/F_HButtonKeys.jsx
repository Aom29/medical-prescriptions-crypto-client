import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

function F_HButtonsKeys () {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
  };

  const handleGenerate = () => {
    console.log('Generar llaves con contraseña:', password);
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

export default F_HButtonsKeys;