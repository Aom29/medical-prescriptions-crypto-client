import { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';

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
          clickEvent=''
          type='submit'
        />
      </DialogActions>
    </Dialog>
    </>
  );
}

export default P_GenerateKeys;