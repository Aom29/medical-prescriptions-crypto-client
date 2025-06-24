import { Stack, Card, CardContent, List, ListItemButton, Divider, Typography } from '@mui/material';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';
import PatientInformation from './PatientInformation';
import PrescriptionHistory from './PrescriptionHistory';
import Usuario from '../../../services/user/Usuario';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/Auth/AuthContext';

function P_HMain() {
  const { auth } = useAuth();

  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await Usuario.getRecetas(auth.userId, auth.token);
        console.log(response);
        if (response.status >= 400) {
          const message = response.message || 'Error desconocido';
          setError(message);
          return;
        }

        setRecetas(response || []);
      } catch (err) {
        console.error('Error al obtener recetas:', err);
        setError('No se pudo cargar el historial clínico.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, [auth]);

  return (
    <Stack
      direction='column'
      sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Header rol='patient' />

      <Card
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: '2%',
        }}
      >
        <CardContent>
          {/* Información general del paciente ---------------- */}
          <Subtitle subtitulo='Información general' />
          <PatientInformation/>

          <Subtitle subtitulo='Historial clínico' />

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
                    <PrescriptionHistory receta={receta}/>
                  </ListItemButton>
                  {index < recetas.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )}

        </CardContent>
      </Card>
    </Stack>
  );
}

export default P_HMain;
