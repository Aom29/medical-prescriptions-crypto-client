import { useState } from 'react';
import { Box, Stack, Typography, Dialog, DialogTitle, DialogContent }  from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';
import M_PDModal from '../../M_PrescriptionDetail/M_PDModal';
/* ------------------------------------------ COMPONENTE PARA VER LOS DETALLES DE LA RECETA --------------------------------------- */
function M_SCHistory ({ receta }) {
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
            ID Receta: {receta.id}
          </Typography>
          <Typography>
            Fecha de emisión: {receta.fechaEmision}
          </Typography>
          <Typography>
            Clínica: {receta.clinica}
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

    {/* Modal con detalles de la receta ------------------------------- */}
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6034FD' }}>
        ID Receta: {receta.id}
        <ButtonsMod
          variant='secundario'
          textCont='Cerrar'
          width='auto'
          clickEvent={handleClose}
          type='button'
        />
      </DialogTitle>
      <DialogContent>
        {/* Aquí se muestran todos los detalles ------------------------- */}
        <M_PDModal receta={receta.id} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default M_SCHistory;