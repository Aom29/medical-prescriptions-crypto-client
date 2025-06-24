import { useState } from 'react';
import { Box, Stack, Typography, Dialog, DialogTitle } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';
import F_PrescriptionModal from '../../F_PrescriptionModal/F_PrescriptionModal';

function F_SCPrescription ({ receta }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
    <Box sx={{
      display: 'flex',
      width: '100%',
      padding: 2,
    }}>
      <Stack sx={{ justifyContent: { sm: 'space-between' }, alignItems: 'center', width:'100%', flexDirection: {sm: 'row', xs: 'column'}}}>
        <Stack direction='column' sx={{ justifyContent: {xs: 'flex-start', width: { xs: '100%' }, alignContent: 'flex-start' }}}>
          <Typography>
            Fecha de emisión: {receta.fechaEmision}
          </Typography>
          <Typography>
            Diagnóstico: {receta.diagnostico}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <ButtonsMod
            variant='secundario'
            textCont='Ver detalles'
            width='10rem'
            height='2.5rem'
            clickEvent={handleOpen}
            type=''
          />
        </Box>
      </Stack>
    </Box>

    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#00a1b4' }}>
        Información de la receta
        <ButtonsMod
          variant='secundario'
          textCont='Cerrar'
          width='auto'
          clickEvent={handleClose}
          type='button'
        />
      </DialogTitle>

      <F_PrescriptionModal receta={receta} />
    </Dialog>
    
    </>
  );
}

export default F_SCPrescription;