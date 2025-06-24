import { Stack, Typography }  from '@mui/material';

function M_GCInformation ({ paciente, nombreMedico, clinica, especialidad, cedula }) {
  console.log('paciente: ', paciente);
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '50px', xs: '0px' } }}>
        <Typography fontWeight='bold'>
          Matrícula {paciente.matricula}
        </Typography>
        <Typography>
          CURP: {paciente.curp}
        </Typography>
        <Typography>
          Nombre del Paciente: {paciente.usuario.nombre}
        </Typography>
        <Typography>
          Fecha de nacimiento: {paciente.usuario.fechaNacimiento}
        </Typography>
      </Stack>

      {/* Datos médico y generales ----------------- */}
      <Stack direction='column'>
        <Typography>
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

export default M_GCInformation;