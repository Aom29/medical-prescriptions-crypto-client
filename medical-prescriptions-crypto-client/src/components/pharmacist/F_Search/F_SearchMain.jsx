import { useState } from 'react';
import { Stack, Card, Box, TextField, InputAdornment } from '@mui/material';
import F_SCMain from './F_SearchContent/F_SCMain';
import ButtonsMod from '../../layout/ButtonsMod';
import background from '../../../img/pharmacist.jpg';

import { useAuth } from '../../../context/Auth/AuthContext';
import Usuario from '../../../services/user/Usuario';

function F_SearchMain () {
  const { auth } = useAuth();
  const [paciente, setPaciente] = useState(null);
  const [matricula, setMatricula] = useState('');
  
  const handleBuscar = async (e) => {
    console.log(auth.token);
    const data = await Usuario.getUsuarios(matricula, auth.token);
    console.log('data', data);

    let nuevoPaciente = {}
        nuevoPaciente.matricula = data.matricula
        nuevoPaciente.nombre = data.name
        nuevoPaciente.fechaNacimiento = data.fechaNacimiento
        nuevoPaciente.curp = data.curp
        nuevoPaciente.recetas = []  

    setPaciente(nuevoPaciente);

    return;
  }

  return (
    <Stack direction='column' sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }} >
      <Card sx={{ height: '6rem', position: 'relative', overflow: 'hidden', borderRadius: 2, marginBottom: '50px', padding: '2%', alignItems: 'center', display: 'center', width: '100%' }}>
      <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)', 
            zIndex: 0,
          }}
        />

        <Stack direction='row' sx={{ display: 'flex', justifyContent: {md: 'flex-end', xs: 'center' }, alignItems: 'center', width: '100%' }}>
          <TextField
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            id='filled-basic'
            label='Buscar Matrícula'
            variant='filled'
            placeholder='Ej. 2025336644'
            sx={{ backgroundColor: 'white', width: { xs: '100%', md: '40%' }, borderRadius: '5px' }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: '5px' }}>
                    <ButtonsMod
                      variant='principal'
                      textCont='Buscar'
                      width='6rem'
                      height='2.2rem'
                      clickEvent={handleBuscar}
                      type='button'
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Card>
      
      {/* Aquí se muestra la información del paciente ---------------------------------------------------- */}
      <F_SCMain paciente={paciente}/>
    </Stack> 
  );
}

export default F_SearchMain;