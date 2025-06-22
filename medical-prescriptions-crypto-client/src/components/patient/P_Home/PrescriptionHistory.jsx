import { useState } from 'react';
import { Box, Stack, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ButtonsMod from '../../layout/ButtonsMod';
import P_PrescriptionDetail from '../P_Prescription/P_PrescriptionDetail';

function PrescriptionHistory ({ receta }) {
  console.log('Datos de la receta: ', receta);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
    <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-between', marginBottom: '5px', padding: '1%', alignItems:'center' }}>
      <Stack direction='column'>
        <Typography fontWeight='bold'> ID Receta: {receta.id} </Typography>
        <Typography> Fecha de emisión: {receta.fechaEmision} </Typography>
        <Typography> Clínica: {receta.clinica} </Typography>
      </Stack>
      <Box>
        <ButtonsMod
          variant='secundario'
          textCont='Ver detalles'
          width='auto'
          clickEvent={handleOpen}
          type='button'
        />
      </Box>
    </Stack>

    {/* Modal con detalles de la receta ------------------------------- */}
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle  fontWeight='bold' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#4224B0' }}>
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
        <P_PrescriptionDetail recetaId={receta.id} />
      </DialogContent>
    </Dialog>
    </>
  );
}

export default PrescriptionHistory;