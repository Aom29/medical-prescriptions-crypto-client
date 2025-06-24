import { Card, CardContent, Stack, List, ListItemButton, Divider, Box, Typography } from '@mui/material';
import Subtitle from "../../../layout/Subtitle";
import F_SCPrescription from './F_SCPrescription';

function F_PatientInformation ({ paciente }) {
  const pacientePrueba = {
    id: 1,
    matricula: 'A01234567',
    nombre: 'Juan Pérez',
    recetas: [
      {
        id: 101,
        surtida: false,
        fechaEmision: '2025-06-15',
        diagnostico: 'Infección respiratoria aguda',
        tratamiento: [
          {
            nombre: 'Amoxicilina',
            dosis: '500mg',
            frecuencia: 'cada 8 horas',
            duracion: '7 días'
          },
          {
            nombre: 'Paracetamol',
            dosis: '500mg',
            frecuencia: 'cada 6 horas si hay fiebre',
            duracion: '5 días'
          }
        ],
        firma_medico: 'MI_FIRMA_DIGITAL_BASE64'
      },
      {
        id: 102,
        surtida: true, // Esta no se mostrará por el filtro
        fechaEmision: '2025-06-10',
        diagnostico: 'Dolor muscular',
        tratamiento: [
          {
            nombre: 'Ibuprofeno',
            dosis: '400mg',
            frecuencia: 'cada 8 horas',
            duracion: '3 días'
          }
        ],
        firma_medico: 'FIRMA_DIGITAL'
      }
    ]
  };

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
          {/* Información general del paciente SOLO MUESTRA LA MATRÍCULA DE MOMENTO ----------------- */}
          <Box sx={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
            <Typography variant='body1' fontWeight='bold' color='#4224B0'>
              Matrícula: {paciente.matricula}
            </Typography>
          </Box>
        </Stack>

        <Stack direction='column'>
          {/* Lista de recetas sin surtir -------------------------------- */}
          <Subtitle subtitulo='Recetas sin surtir' />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {pacientePrueba.recetas && pacientePrueba.recetas.filter((r) => !r.surtida).length > 0 ? (
                pacientePrueba.recetas
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

export default F_PatientInformation;