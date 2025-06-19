import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';

function P_PCButton ({ surtida, fechaSurtido }) {
  const [open, setOpen] = useState(false);

  const [farmaceuticos, setFarmaceuticos] = useState([
    { nombre: 'María Pérez', clinica: 'San Rafael', permisosOtorgados: true },
    { nombre: 'Juan Gómez', clinica: 'San Cristobal', permisosOtorgados: false },
    { nombre: 'Lucía Torres', clinica: 'Santa Lucía', permisosOtorgados: true }
  ]);

  const handleOpen = async() => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const togglePermisos = (index) => {
    setFarmaceuticos((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, permisosOtorgados: !f.permisosOtorgados} : f
      )
    )
  }

  if (surtida) {
    return (
      <Box sx={{ marginTop: '30px', marginBottom: '30px', width: '100%' }}>
        <Typography color='success.main' align='right'>
          Receta surtida el {fechaSurtido}
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <Box sx={{ marginTop: '30px', marginBottom: '30px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <ButtonsMod
        variant='principal'
        textCont='Ver farmacéuticos'
        width='100%'
        clickEvent={handleOpen}
        type='submit'
      />
    </Box>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Lista de Farmacéuticos</DialogTitle>
      <DialogContent>
        <List>
          {farmaceuticos.map((farmaceutico, index) => (
            <>
            <ListItem key={index}>
              <ListItemText
                primary={farmaceutico.nombre}
                secondary={`Clínica: ${farmaceutico.clinica}`}
              />
              <Box>
                <ButtonsMod
                  variant={farmaceutico.permisosOtorgados ? '' : 'principal'}
                  textCont={farmaceutico.permisosOtorgados ? 'Quitar permisos' : 'Otorgar permisos'}
                  width='100%'
                  clickEvent={() => togglePermisos(index)}
                  type='submit'
                />
              </Box>
            </ListItem>
            <Divider/>
            </>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cerrar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default P_PCButton;