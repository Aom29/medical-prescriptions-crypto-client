import { Stack, Typography }  from '@mui/material';

function P_PInformation ({ receta }) {
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>

      {/* Datos paciente ------------------------- */}
      <Stack direction='column' sx={{ marginBottom: { md: '0px', xs: '30px' }, marginRight: { md: '50px', xs: '0px' } }}>
        <Typography fontWeight='bold' color='#4224B0'>
          Matrícula {receta.matricula}
        </Typography>
        <Typography fontWeight='bold'>
          CURP: {receta.curp}
        </Typography>
        <Typography>
          Nombre del Paciente: {receta.nombrePaciente}
        </Typography>
        <Typography>
          Fecha de nacimiento: {receta.fechaNacimiento}
        </Typography>
      </Stack>

      {/* Datos médico y generales ----------------- */}
      <Stack direction='column'>
        <Typography fontWeight={'bold'} color='#4224B0'>
          Cédula Profesional: {receta.cedula}
        </Typography>
        <Typography fontWeight='bold'>
          Fecha de emisión: {receta.fechaEmision}
        </Typography>
        <Typography>
          Médico: {receta.nombreMedico}
        </Typography>
        <Typography>
          Clínica: {receta.clinica}
        </Typography>
        <Typography>
          Especialidad: {receta.especialidad}
        </Typography>
      </Stack>

    </Stack>
  );
};

export default P_PInformation;