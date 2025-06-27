import { useState, useEffect } from 'react';
import { Card, CardContent, Stack, List, ListItemButton, Divider, Typography, Box, Dialog, IconButton, DialogTitle, DialogContent }  from '@mui/material';
import M_SCInformation from './M_SCInformation';
import M_SCHistory from './M_SCHistory';
import ButtonsMod from '../../../layout/ButtonsMod';
import Subtitle from '../../../layout/Subtitle';
import M_GMain from '../../M_GeneratePrescription/M_GMain';

import { useAuth } from '../../../../context/Auth/AuthContext';
import Usuario from '../../../../services/user/Usuario';

function M_SCMain ({ paciente }) {
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecetas = async () => {
      console.log('Fetching recetas for paciente:', paciente);
      if (!paciente) return;
      try {
        const response = await Usuario.getRecetas(paciente.id, auth.token);
        console.log('Response: ', response);
        if (response.status >= 400) {
          const message = response.message || 'Error desconocido';
          setError(message);
          return;
        }

        setRecetas(response || []);
        setError(null);
      } catch (err) {
        console.error('Error al obtener recetas:', err);
        setError('No se pudo cargar el historial clínico.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, [auth, paciente?.id]);

  if (!paciente) {
    return (
      <Typography variant='h6' sx={{ margin: 4 }}>
        Busca un paciente para ver su información.
      </Typography>
    );
  }

  return (
    <>
    <Card sx={{ borderRadius: 2, marginBottom: '50px', padding: '2%' }}>

      <CardContent>
        <Stack direction='column'>
          <Subtitle subtitulo='Información general del paciente' />
          <Stack direction='row' sx={{ display: 'flex', width: '100%', flexDirection: {md: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
            {/* Información general del paciente ----------------- */}
            <M_SCInformation paciente={paciente} />
            {/* Botón para generar receta ------------------------ */}
            <Box sx={{ display: 'flex', width: { md: '40%', xs: '100%' }, justifyContent: 'flex-end', marginBottom: {md: 0, xs: '30px' }}}>
              <ButtonsMod
                variant='principal'
                textCont='Generar receta'
                width='100%'
                height='2.5rem'
                clickEvent={handleOpen}
                type='button'
              />
            </Box>
          </Stack>
        </Stack>

        <Stack direction='column'>
          {/* Historial Clínico -------------------------------- */}
          <Subtitle subtitulo='Historial Clínico' />

          {loading ? (
            <Typography>Cargando historial...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : recetas.length === 0 ? (
            <Typography>No se encontraron recetas.</Typography>
          ) : (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {recetas.map((receta, index) => (
                  <div key={index}>
                    <ListItemButton>
                      <M_SCHistory receta={receta} />
                    </ListItemButton>
                    {index < recetas.length - 1 && <Divider />}
                  </div>
              ))}
            </List>
          )}

        </Stack>
      </CardContent>
    </Card>


    {/* Modal para generar receta ------------------------------------------------------ */}
    <Dialog open={openModal} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6034FD' }}>
        Generar receta
        <ButtonsMod
          variant='secundario'
          textCont='Cerrar'
          width='auto'
          clickEvent={handleClose}
          type='button'
        />       
      </DialogTitle>
      <DialogContent> 
        <M_GMain paciente={paciente} onClose={handleClose} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default M_SCMain;