import { Card, CardContent, Stack }  from '@mui/material';
import PatientPersonalInformation from '../PatientPersonalInformation';
import PatientClinicHistory from '../PatientClinicHistory';
import Subtitle from '../../layout/Subtitle';

function SearchPatientData ({ setView }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        marginBottom: '50px',
        padding: '2%',
      }}>

      <CardContent>
        <Stack direction='column'>
          <Subtitle subtitulo='Información general del paciente' />
          <PatientPersonalInformation
            matricula='2025938495'
            curp='RAMS990202HDFRRG09'
            nombre='Ramírez Sergio'
            fechaNacimiento='02/02/1999'
            sexo='hombre'
            onGenerate={() => setView('generate')}
          />
        </Stack>

        <Stack direction='column'>
          <Subtitle subtitulo='Historial Clínico' />
          <PatientClinicHistory 
            fecha='10/06/2025'
            diagnostico='Gastritis aguda'
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SearchPatientData;