import { Card, CardContent, Stack, List, ListItemButton, Divider }  from '@mui/material';
import M_SCInformation from './M_SCInformation';
import M_SCHistory from './M_SCHistory';
import Subtitle from '../../../layout/Subtitle';

function M_SCMain ({ setView }) {
  const recetas = [
    {
      fechaEmision: '11/06/2025',
      diagnostico: 'Ébola'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza'
    },
    {
      fechaEmision: '01/05/2025',
      diagnostico: 'Influenza'
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 2,
        marginBottom: '50px',
        padding: '2%',
      }}>

      <CardContent>
        <Stack direction='column'>
          {/* Información general del paciente ----------------- */}
          <Subtitle subtitulo='Información general del paciente' />
          <M_SCInformation
            matricula='2025938495'
            curp='RAMS990202HDFRRG09'
            nombre='Ramírez Sergio'
            fechaNacimiento='02/02/1999'
            sexo='hombre'
            onGenerate={() => setView('generate')}
          />
        </Stack>

        <Stack direction='column'>
          {/* Historial Clínico -------------------------------- */}
          <Subtitle subtitulo='Historial Clínico' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {recetas.map((receta, index) => (
              <div key={index}>
                <ListItemButton>
                  <M_SCHistory
                    fechaEmision={receta.fechaEmision}
                    diagnostico={receta.diagnostico}
                    setView={setView}
                  />
                </ListItemButton>
                {index < recetas.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default M_SCMain;