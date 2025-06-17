import { Card, CardContent, Stack, Divider, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Subtitle from '../../layout/Subtitle';
//* Componentes
import M_GCInformation from '../../medic/M_GeneratePrescription/M_GContent/M_GCInformation';
import P_PDiagnosis from './P_PContent/P_PDiagnosis';
import P_PTreatment from './P_PContent/P_PTreatment';
import P_PSign from './P_PContent/P_PSign';

import P_PCButton from './P_PComponents/P_PCButton';

function P_PMain ({ setView }) {
  const medicamentos = [
    {
      nombre: 'Paracetamol',
      dosis: '500mg',
      duracion: '5 días',
      frecuencia: 'Cada 8 horas',
    },
    {
      nombre: 'Ibuprofeno',
      dosis: '400mg',
      duracion: '3 días',
      frecuencia: 'Cada 12 horas',
    },
  ];

  const receta = {
      fechaEmision: '11/06/2025',
      diagnostico: 'Ébola',
      clinica: 'San Rafael',
      surtida: true,
      fechaSurtido: '10/04/2025',
  };

  return (
    <Stack direction='column' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: {xs: '100%', sm: '100%', md: '80%'},  padding: '2%' }}>
        <IconButton onClick={() => setView('home')} sx={{ alignSelf: 'flex-start' }}>
          <ArrowBack />
        </IconButton>
        <CardContent>
          {/* Información general de la receta ------------------- */}
          <Subtitle subtitulo='Información de la receta' />
          <M_GCInformation
            matricula='392039029304'
            curp='2329832938'
            nombrePaciente='Sergio martínez de la nieves'
            fechaNacimiento='03/05/1293'
            sexo='Indefinido'
            cedula='2390290329'
            nombreMedico='Sergino Fininino'
            clinica='escom'
            especialidad='alta especialidad'
            fechaEmision='03/04/2025'
          />
          <P_PCButton
            surtida={receta.surtida}
            fechaSurtido={receta.fechaSurtido}
          />

          {/* Diagnóstico ---------------------------------------- */}
          <P_PDiagnosis diagnostico={receta.diagnostico} />
          
          {/* Tratamiento ---------------------------------------- */}
          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          <Subtitle subtitulo='Tratamiento' />

          {medicamentos.map((med, idx) => (
            <P_PTreatment key={idx} medicamento={med} />
          ))}

          {/* Firmas ---------------------------------------- */}
          <Subtitle subtitulo='Firmas' />
          <P_PSign label='Firma médico'/>
          {receta.surtida && (
            <P_PSign label='Firma farmacéutico'/>
          )}
          
        </CardContent>
      </Card>
    </Stack>
  );
}

export default P_PMain;