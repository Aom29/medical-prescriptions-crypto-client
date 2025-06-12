import { Box, Stack, Typography }  from '@mui/material';
import '../../../css/medic/medic.css';

function GeneralData ({ matricula, nombrePaciente, fechaNacimiento, sexo, fechaEmision, nombreMedico, especialidad, cedula }) {
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '20%', xs: '0px' } }}>
        <Typography fontWeight='bold' color='#4224B0'>
          Matrícula {matricula}
        </Typography>
        <Typography>
          {nombrePaciente}
        </Typography>
        <Typography>
          Fecha de nacimiento: {fechaNacimiento}
        </Typography>
        <Typography>
          Sexo: {sexo}
        </Typography>
      </Stack>

      {/* Datos médico y generales ----------------- */}
      <Stack direction='column'>
        <Typography fontWeight='bold'>
          Fecha de emisión: {fechaEmision}
        </Typography>
        <Typography>
          Médico: {nombreMedico}
        </Typography>
        <Typography>
          Especialidad: {especialidad}
        </Typography>
        <Typography>
          Cédula Profesional: {cedula}
        </Typography>
      </Stack>

    </Stack>
  );
};

export default GeneralData;