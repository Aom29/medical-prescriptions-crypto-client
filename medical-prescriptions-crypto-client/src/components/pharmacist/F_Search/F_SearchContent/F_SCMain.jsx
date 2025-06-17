import { Card, CardContent, Stack, List, ListItemButton, Divider, Typography } from '@mui/material';
import Subtitle from "../../../layout/Subtitle";
import F_SCInformation from "./F_SCInformation";
import F_SCPrescription from './F_SCPrescription';

function F_SCMain ({ paciente }) {
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
        width: {xs: '100%', md: '80%'},
      }}>

      <CardContent>
        <Stack direction='column'>
          {/* Información general del paciente ----------------- */}
          <Subtitle subtitulo='Información general del paciente' />
          <F_SCInformation
            paciente={paciente}
          />
        </Stack>

        <Stack direction='column'>
          {/* Recetas sin surtir -------------------------------- */}
          <Subtitle subtitulo='Recetas sin surtir' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {paciente.recetas && paciente.recetas.filter((r) => !r.surtida).length > 0 ? (
                paciente.recetas
                .filter((r) => !r.surtida)
                .map((recetaFiltrada, index, arrayFiltrada) => (
                  <div key={index}>
                    <ListItemButton>
                      <F_SCPrescription receta={recetaFiltrada}/>
                    </ListItemButton>
                    {index < arrayFiltrada.length - 1 && <Divider />
                  }
                  </div>
                ))
              ) : (
                <Typography sx={{ padding: 2 }}>
                  No hay recetas pendientes de surtir para este paciente.
                </Typography>
            )}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default F_SCMain;