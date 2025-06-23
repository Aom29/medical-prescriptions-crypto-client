import { Stack, Typography }  from '@mui/material';

function P_PInformation ({ paciente, medico, fechaEmision }) {
  return (
    <>
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
          Cédula Profesional: {medico.cedula}
        </Typography>
        <Typography>
          Médico: {medico.usuario.nombre}
        </Typography>
        <Typography>
          Clínica: {medico.clinica}
        </Typography>
        <Typography>
          Especialidad: {medico.especialidad}
        </Typography>
      </Stack>

    </Stack>
    <Stack direction='row' sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: '10px' }}>
      <Typography fontWeight='bold' color='#00a1b4'>
        Fecha de emisión: {fechaEmision}
      </Typography>
    </Stack>
    </>
  );
};

export default P_PInformation;