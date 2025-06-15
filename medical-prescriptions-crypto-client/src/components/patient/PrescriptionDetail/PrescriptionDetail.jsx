import { Card, CardContent, Stack, Divider, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Subtitle from '../../layout/Subtitle';
import PrescriptionData from '../../medic/GeneratePrescription/PrescriptionData';
import PrescriptionDiagnosis from './PrescriptionDiagnosis';
import PrescriptionTreatment from './PrescriptionTreatment';
import PrescriptionButton from './PrescriptionButton';
import PrescriptionSign from './PrescriptionSign';

function PrescriptionDetail ({ setView }) {
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
          <PrescriptionData
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
          <PrescriptionButton
            surtida={receta.surtida}
            fechaSurtido={receta.fechaSurtido}
          />

          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          {/* Diagnóstico ---------------------------------------- */}
          <Subtitle subtitulo='Diagnóstico' />
          <PrescriptionDiagnosis
            diagnosis='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, debitis necessitatibus. Illo eum laboriosam laudantium? Nisi, eveniet. Voluptatum, voluptate tempore.'
          />

          <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
          {/* Tratamiento ---------------------------------------- */}
          <Subtitle subtitulo='Tratamiento' />
          {medicamentos.map((med, idx) => (
            <>
            <PrescriptionTreatment key={idx} medicamento={med} />
            <Divider sx={{ marginTop: '30px', marginBottom: '30px'}} />
            </>
          ))}

          {/* Firmas ---------------------------------------- */}
          <Subtitle subtitulo='Firmas' />
          <PrescriptionSign
            label='Firma médico'
          />
          {receta.surtida && (
            <PrescriptionSign
              label='Firma farmacéutico'
            />
          )}
          
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PrescriptionDetail;