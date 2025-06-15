import { Stack, Card, CardContent, List, ListItemButton, Divider } from '@mui/material';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';
import HomePatientInformation from './HomePatientInformation';
import HomePatientHistory from './HomePatientHistory';

function HomePatientComponent ({ setView }) {
  const recetas = [
    {
      fechaEmision: '11/06/2025',
      diagnostico: 'Ébola',
      clinica: 'San Rafael'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez'
    },
  ];
  
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Header/>

      <Card sx={{ 
        width: { xs: '100%', md: '80%' },
        padding: '2%'
      }}>
        <CardContent>
          {/* Información general ---------------- */}
          <Subtitle subtitulo='Información general' />
          <HomePatientInformation
            matricula='20229933344'
            curp='REOF032911FFKET1'
            nombre='Sergio Ramírez'
            fechaNacimiento='02/34/1929'
            sexo='Masculino'
          />
          {/* Historial clínico ----------------- */}
          <Subtitle subtitulo='Historial clínico' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {recetas.map((receta, index) => (
              <div key={index}>
                <ListItemButton>
                  <HomePatientHistory
                    fechaEmision={receta.fechaEmision}
                    diagnostico={receta.diagnostico}
                    clinica={receta.clinica}
                    setView={setView}
                  />
                </ListItemButton>
                {index < recetas.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default HomePatientComponent;