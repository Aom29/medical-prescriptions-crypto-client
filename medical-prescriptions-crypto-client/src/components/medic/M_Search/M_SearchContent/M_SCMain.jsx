import { useState } from 'react';
import { Card, CardContent, Stack, List, ListItemButton, Divider, Typography }  from '@mui/material';
import M_SCInformation from './M_SCInformation';
import M_SCHistory from './M_SCHistory';
import Subtitle from '../../../layout/Subtitle';

function M_SCMain ({ setView, paciente }) {

  if (!paciente) {
    return (
      <Typography variant='h6' sx={{ margin: 4 }}>
        Busca un paciente para ver su información.
      </Typography>
    );
  }


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
            paciente={paciente}
            onGenerate={() => {
              setView('generate');
            }}
          />
        </Stack>

        <Stack direction='column'>
          {/* Historial Clínico -------------------------------- */}
          <Subtitle subtitulo='Historial Clínico' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {paciente.recetas && paciente.recetas.length > 0 ? (
              paciente.recetas.map((receta, index) => (
                <div key={index}>
                  <ListItemButton>
                    <M_SCHistory
                      fechaEmision={receta.fechaEmision}
                      diagnostico={receta.diagnostico}
                      setView={setView}
                    />
                  </ListItemButton>
                  {index < paciente.recetas.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <Typography sx={{ padding: 2 }}>Este paciente no tiene recetas registradas.</Typography>
            )}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default M_SCMain;