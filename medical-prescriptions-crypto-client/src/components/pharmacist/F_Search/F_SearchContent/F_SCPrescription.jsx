import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ButtonsMod from '../../../layout/ButtonsMod';
import F_PMMain from '../../F_PrescriptionModal/F_PMMain';

function F_SCPrescription ({ receta }) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Box sx={{
      display: 'flex',
      width: '100%',
      padding: 2,
    }}>
      <Stack sx={{ justifyContent: { sm: 'space-between' }, alignItems: 'center', width:'100%', flexDirection: {sm: 'row', xs: 'column'}}}>
        <Stack direction='column' sx={{ justifyContent: {xs: 'flex-start', width: { xs: '100%' }, alignContent: 'flex-start' }}}>
          <Typography>
            Fecha de emisión: {receta.fecha_emision}
          </Typography>
          <Typography>
            Diagnóstico: {receta.diagnostico}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <ButtonsMod
            variant='secundario'
            textCont='Ver detalles'
            width='10rem'
            height='2.5rem'
            clickEvent={() => setOpen(true)}
            type=''
          />
        </Box>
      </Stack>
    </Box>

    <F_PMMain
      open={open}
      onClose={() => setOpen(false)}
      receta={{
        matricula: '392039029304',
        curp: '2329832938',
        nombrePaciente: 'Sergio martínez de la nieves',
        fechaNacimiento: '03/05/1293',
        sexo: 'Indefinido',
        cedula: '2390290329',
        nombreMedico: 'Sergino Fininino',
        clinica: 'escom',
        especialidad: 'alta especialidad',
        fechaEmision: '03/04/2025',
        diagnostico: 'Lorem ipsum dolor sit amet...'
      }}
      medicamentos={[
        { nombre: 'Paracetamol', dosis: '500mg', duracion: '5 días', frecuencia: 'cada 8h' },
        { nombre: 'Ibuprofeno', dosis: '200mg', duracion: '3 días', frecuencia: 'cada 6h' },
      ]}
    />
    </>
  );
}

export default F_SCPrescription;