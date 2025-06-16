import { Stack } from '@mui/material';
import F_SHeader from "./F_SearchHeader/F_SHeader";
import F_SCMain from './F_SearchContent/F_SCMain';

function F_SearchMain () {
  const datosPaciente = {
    matricula: '2025938495',
    curp: 'RAMS990202HDFRRG09',
    nombre: 'Ramírez Sergio',
    fechaNacimiento: '02/02/1999',
    sexo: 'hombre',
  };

  const receta = [
    {
      id_receta: '1020',
      fecha_emision: '15/06/2025',
      nombre_medico: 'juanito',
      cedula: '239023902',
      diagnostico: 'dolor de rodilla',
      surtida: false,
      firma_medico: 'orjtgjntrdntrhkntrjdhb',
      firma_farmaceutico: '',
      fecha_surtido: '',
      medico_id: '66',
      paciente_id: '12',
      farmaceutico_id: '1',
    },
    {
      id_receta: '1020',
      fecha_emision: '14/06/2025',
      nombre_medico: 'juanito',
      cedula: '239023902',
      diagnostico: 'ébola',
      surtida: false,
      firma_medico: 'orjtgjntrdntrhkntrjdhb',
      firma_farmaceutico: '',
      fecha_surtido: '',
      medico_id: '66',
      paciente_id: '12',
      farmaceutico_id: '1',
    },
    {
      id_receta: '1020',
      fecha_emision: '11/06/2025',
      nombre_medico: 'juanito',
      cedula: '239023902',
      diagnostico: 'dolor de garganda',
      surtida: true,
      firma_medico: 'orjtgjntrdntrhkntrjdhb',
      firma_farmaceutico: '',
      fecha_surtido: '',
      medico_id: '66',
      paciente_id: '12',
      farmaceutico_id: '1',
    },
  ];

  return (
    <Stack direction='column' sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }} >
      <F_SHeader />
      <F_SCMain 
        receta={receta} 
        datosPaciente={datosPaciente}
      />
    </Stack>
  );
}

export default F_SearchMain;