import { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';
import { useAuth } from '../../../../context/Auth/AuthContext';
import Farmaceutico from '../../../../services/pharmacist/Farmaceutico';

function P_PCButton ({ surtida, fechaSurtido }) {
  const [open, setOpen] = useState(false);
  const [farmaceuticos, setFarmaceuticos] = useState([]);
  const { auth } = useAuth();

  const handleOpen = async() => {
    const lista = await Farmaceutico.getFarmaceuticos(auth.token);
    console.log(lista);

    const listaConPermisos = lista.map(f => ({
      nombre: f.name,
      clinica: f.farmacia,
      permisosOtorgados: false
    }));
  
    setFarmaceuticos(listaConPermisos);

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
        variant='principalPaciente'
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
                  variant={farmaceutico.permisosOtorgados ? '' : 'principalPaciente'}
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
          <ButtonsMod
            variant='secundarioPaciente'
            textCont='Cerrar'
            width='100%'
            clickEvent={handleClose}
            type='button'
          />
        </Box>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default P_PCButton;