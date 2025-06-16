import { Card, CardContent, Stack, List, ListItemButton, Divider } from '@mui/material';
import Subtitle from "../../../layout/Subtitle";
import F_SCInformation from "./F_SCInformation";
import F_SCPrescription from './F_SCPrescription';

function F_SCMain ({ receta, datosPaciente }) {
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
            datosPaciente={datosPaciente}
          />
        </Stack>

        <Stack direction='column'>
          {/* Recetas sin surtir -------------------------------- */}
          <Subtitle subtitulo='Recetas sin surtir' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {receta
              .filter((r) => r.surtida === false)
              .map((recetaFiltrada, index, arrayFiltrada) => (
              <div key={index}>
                <ListItemButton>
                  <F_SCPrescription receta={recetaFiltrada} />
                </ListItemButton>
                {index < arrayFiltrada.length - 1 && <Divider />
              }
              </div>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default F_SCMain;