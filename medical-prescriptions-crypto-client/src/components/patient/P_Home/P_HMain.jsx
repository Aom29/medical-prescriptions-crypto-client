import { Stack, Card, CardContent, List, ListItemButton, Divider } from '@mui/material';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';
import P_HInformation from './P_HInformation';
import P_HHistory from './P_HHistory';

function P_HMain ({ setView }) {
  const datosPaciente = {
    matricula: '2025938495',
    curp: 'RAMS990202HDFRRG09',
    nombre: 'Ramírez Sergio',
    fechaNacimiento: '02/02/1999',
    sexo: 'Hombre',
  };
  
  const recetas = [
    {
      idReceta: '22993349582948550012',
      fechaEmision: '11/06/2025',
      diagnostico: 'Ébola',
      clinica: 'San Rafael',
      surtida: true,
      fechaSurtido: '10/04/2025',
    },
    {
      idReceta: '12345678912345678912',
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez',
      surtida: false,
      fechaSurtido: '10/04/2025',
    },
    {
      idReceta: '00229933442233113322',
      fechaEmision: '02/05/2025',
      diagnostico: 'Influenza',
      clinica: 'Santa María',
      surtida: true,
      fechaSurtido: '10/04/2025',
    },
    {
      idReceta: '00299933995588443322',
      fechaEmision: '03/05/2025',
      diagnostico: 'Influenza',
      clinica: 'Santa María',
      surtida: true,
      fechaSurtido: '10/04/2025',
    },
    {
      idReceta: '000000000000000001',
      fechaEmision: '04/05/2025',
      diagnostico: 'Influenza',
      clinica: 'San Martínez',
      surtida: false,
      fechaSurtido: '10/04/2025',
    },
  ];
  
  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Header rol='patient' />

      <Card sx={{ 
        width: { xs: '100%', md: '80%' },
        padding: '2%'
      }}>
        <CardContent>
          {/* Información general ---------------- */}
          <Subtitle subtitulo='Información general' />
          <P_HInformation
            datosPaciente={datosPaciente}
          />
          {/* Historial clínico ----------------- */}
          <Subtitle subtitulo='Historial clínico' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {recetas.map((receta, index) => (
              <div key={index}>
                <ListItemButton>
                  <P_HHistory
                    receta={receta}
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

export default P_HMain;