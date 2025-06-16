import { useRef, useState } from 'react';
import { Card, Typography, CardContent, Stack, Box }  from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
//* Componentes
import ButtonsMod from '../../layout/ButtonsMod';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';

function HomeComponent () {
  const [archivoCargado, setArchivoCargado] = useState(false);
  const inputRef = useRef(null);
  const [privateKey, setPrivateKey] = useState(null);

  const handleClickBoton = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleArchivoCargado = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        const contenido = reader.result;
        setPrivateKey(contenido);
        console.log('Contenido del archivo:', contenido);
        setArchivoCargado(true);
      }
      reader.readAsText(archivo);
    } else {
      setArchivoCargado(false);
    }
  }

  return (
    <>
    <Header />
    <Card position='static' 
      sx={{
        borderRadius: 2,
        padding: '2%',
      }}>

      <CardContent>
        <Stack direction='column'>
          <Subtitle subtitulo='Estado del sistema' />
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              borderWidth: 2,
              border: '2px solid',
              boxShadow: 1,
              borderColor: archivoCargado ? '#00ff21' : '#ff3c3c',
              transition: 'border-color 0.3s ease',
            }}
          >
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyIcon sx={{ fontSize: '1.6rem' }} />
              <Typography fontSize='1.1rem' sx={{ marginLeft: '10px' }}>
                Llave privada 
              </Typography>
            </Stack>

            <div>
              <input
                type='file'
                accept='.key,.pem'
                ref={inputRef}
                onChange={handleArchivoCargado}
                style={{ display: 'none' }}
              />
              <ButtonsMod
                variant='principal'
                textCont='Cargar archivo'
                width='100%'
                height='2.5rem'
                clickEvent={handleClickBoton}
                type='button'
              />
            </div>
          </Box>
        </Stack>
      </CardContent>
    </Card>
    </>
  );
};

export default HomeComponent;