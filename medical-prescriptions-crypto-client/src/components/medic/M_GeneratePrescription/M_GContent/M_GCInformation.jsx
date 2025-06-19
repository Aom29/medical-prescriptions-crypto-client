import { Stack, Typography }  from '@mui/material';

function M_GCInformation ({ paciente, fechaEmision, nombreMedico, clinica, especialidad, cedula }) {
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '50px', xs: '0px' } }}>
        <Typography fontWeight='bold' color='#4224B0'>
          Matrícula {paciente.matricula}
        </Typography>
        <Typography fontWeight='bold'>
          CURP: {paciente.curp}
        </Typography>
        <Typography>
          Nombre del Paciente: {paciente.nombre}
        </Typography>
        <Typography>
          Fecha de nacimiento: {paciente.fechaNacimiento}
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

export default M_GCInformation;