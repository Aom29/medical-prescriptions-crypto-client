import { useState } from 'react';
import { Card, Box, Stack }  from '@mui/material';
import background from '../../../../img/pharmacist.jpg';
import F_SButton from './F_SButton.jsx';
import Usuario from '../../../../services/user/Usuario.js';
import { useAuth } from '../../../../context/Auth/AuthContext.jsx';

function F_SHeader ({ onBuscar }) {
  const { auth } = useAuth();
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

    onBuscar(nuevoPaciente);

    return;
  }
  
  return (
    <Card position='static' 
      sx={{
        height: '6rem',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        marginBottom: '50px',
        padding: '2%',
        alignItems: 'center',
        display: 'center',
        width: '100%',
      }}>
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
        <F_SButton
          matricula={matricula}
          setMatricula={setMatricula}
          handleBuscar={handleBuscar}
        />
      </Stack>
    </Card>
  );
};

export default F_SHeader;