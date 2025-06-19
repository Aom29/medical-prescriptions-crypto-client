import { Stack, Typography }  from '@mui/material';

function F_PMInformation ({ matricula, nombrePaciente, sexo, fechaEmision, nombreMedico, clinica, especialidad, cedula }) {
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '50px', xs: '0px' } }}>
        <Typography fontWeight='bold' color='#4224B0'>
          Matrícula {matricula}
        </Typography>
        <Typography fontWeight='bold'>
          Fecha de emisión: {fechaEmision}
        </Typography>
        <Typography>
          Nombre del Paciente: {nombrePaciente}
        </Typography>
        <Typography>
          Sexo: {sexo}
        </Typography>
      </Stack>

      {/* Datos médico y generales ----------------- */}
      <Stack direction='column'>
        <Typography fontWeight={'bold'} color='#4224B0'>
          Cédula Profesional: {cedula}
        </Typography>
        <Typography>
          Médico: {nombreMedico}
        </Typography>
        <Typography>
          Clínica: {clinica}
        </Typography>
        <Typography>
          Especialidad: {especialidad}
        </Typography>
      </Stack>

    </Stack>
  );
};

export default F_PMInformation;