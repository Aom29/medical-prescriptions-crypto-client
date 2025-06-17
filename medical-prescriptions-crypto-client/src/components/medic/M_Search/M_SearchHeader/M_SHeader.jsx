import { useState } from 'react';
import { Card, Box, Stack }  from '@mui/material';
import background from '../../../../img/background.jpg';
import M_SButton from './M_SButton';

function M_SHeader ({ onBuscar }) {
  const [matricula, setMatricula] = useState('');

  const handleBuscar = () => {
    const pacienteSimulado = [
      {
        matricula: '2025938495',
        curp: 'RAMS990202HDFRRG09',
        nombre: 'Ramírez Sergio',
        fechaNacimiento: '02/02/1999',
        sexo: 'Hombre',
        recetas: [
          {
            fechaEmision: '11/06/2025',
            diagnostico: 'Ébola'
          },
          {
            fechaEmision: '01/05/2025',
            diagnostico: 'Influenza'
          }
        ]
      },
      {
        matricula: '2033441122',
        curp: 'MALU010101MDFLCN09',
        nombre: 'Martínez Lucía',
        fechaNacimiento: '01/01/2001',
        sexo: 'mujer',
        recetas: [
          { fechaEmision: '10/04/2025', diagnostico: 'Gripe común' },
          { fechaEmision: '12/02/2025', diagnostico: 'Dolor muscular' }
        ]
      },
      {
        matricula: '2055667799',
        curp: 'LOAN970707MDFTRN03',
        nombre: 'López Ana',
        fechaNacimiento: '07/07/1997',
        sexo: 'mujer',
        recetas: []
      },
      {
        matricula: '2066123444',
        curp: 'TOMI950505HDFLKL08',
        nombre: 'Torres Miguel',
        fechaNacimiento: '05/05/1995',
        sexo: 'hombre',
        recetas: [
          { fechaEmision: '20/05/2025', diagnostico: 'Diabetes tipo 2' },
          { fechaEmision: '28/05/2025', diagnostico: 'Hipertensión' },
          { fechaEmision: '01/06/2025', diagnostico: 'Dolor de cabeza' }
        ]
      },
    ];

    const pacienteEncontrado = pacienteSimulado.find(
      (p) => p.matricula === matricula
    );

    if (pacienteEncontrado) {
      onBuscar(pacienteEncontrado);
    } else {
      alert('paciente no encontrado');
      onBuscar(null);
    }
  };

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
        <M_SButton 
          matricula={matricula}
          setMatricula={setMatricula}
          handleBuscar={handleBuscar}
        />  
      </Stack>
    </Card>
  );
};

export default M_SHeader;