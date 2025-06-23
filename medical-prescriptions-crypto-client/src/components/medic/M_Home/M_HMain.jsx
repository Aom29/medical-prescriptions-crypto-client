import { useRef } from 'react';
import { Card, Typography, CardContent, Stack, Box } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
//* Componentes
import ButtonsMod from '../../layout/ButtonsMod';
import Header from '../../layout/Header';
import Subtitle from '../../layout/Subtitle';
import M_HButtonsKeys from './M_HButtonKeys';
import { useAuth } from '../../../context/Auth/AuthContext';

function M_HMain() {
  const { auth } = useAuth();
  const inputRefEdDSA = useRef(null);
  const inputRefX25519 = useRef(null);

  const { privateKeyEdDSA, privateKeyECDH, storePrivateKeys } = useAuth();

  const handleClickEdDSA = () => inputRefEdDSA.current?.click();
  const handleClickX25519 = () => inputRefX25519.current?.click();

  const handleArchivoEdDSA = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        storePrivateKeys({ eddsa: reader.result });
        console.log('Llave privada EdDSA cargada:', reader.result);
      };
      reader.readAsText(archivo);
    }
  };

  const handleArchivoX25519 = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        storePrivateKeys({ ecdh: reader.result });
        console.log('Llave privada X25519 cargada:', reader.result);
      };
      reader.readAsText(archivo);
    }
  };

  return (
    <>
      <Header nombre={auth.nombre}/>
      <Card
        position='static'
        sx={{
          borderRadius: 2,
          padding: '2%',
        }}
      >
        <CardContent>
          <Stack direction='column' spacing={3}>
            <Subtitle subtitulo='Estado del sistema' />

            {/* Caja para Llave EdDSA */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                border: '2px solid',
                boxShadow: 1,
                borderColor: privateKeyEdDSA ? '#00ff21' : '#ff3c3c',
                transition: 'border-color 0.3s ease',
              }}
            >
              <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
                <KeyIcon sx={{ fontSize: '1.6rem' }} />
                <Typography fontSize='1.1rem' sx={{ marginLeft: '10px' }}>
                  Llave privada EdDSA
                </Typography>
              </Stack>

              <div>
                <input
                  type='file'
                  accept='.key,.pem'
                  ref={inputRefEdDSA}
                  onChange={handleArchivoEdDSA}
                  style={{ display: 'none' }}
                />
                <ButtonsMod
                  variant='principal'
                  textCont='Cargar EdDSA'
                  width='100%'
                  height='2.5rem'
                  clickEvent={handleClickEdDSA}
                  type='button'
                />
              </div>
            </Box>

            {/* Caja para Llave X25519 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                border: '2px solid',
                boxShadow: 1,
                borderColor: privateKeyECDH ? '#00ff21' : '#ff3c3c',
                transition: 'border-color 0.3s ease',
              }}
            >
              <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
                <KeyIcon sx={{ fontSize: '1.6rem' }} />
                <Typography fontSize='1.1rem' sx={{ marginLeft: '10px' }}>
                  Llave privada X25519
                </Typography>
              </Stack>

              <div>
                <input
                  type='file'
                  accept='.key,.pem'
                  ref={inputRefX25519}
                  onChange={handleArchivoX25519}
                  style={{ display: 'none' }}
                />
                <ButtonsMod
                  variant='principal'
                  textCont='Cargar X25519'
                  width='100%'
                  height='2.5rem'
                  clickEvent={handleClickX25519}
                  type='button'
                />
              </div>
            </Box>

            <M_HButtonsKeys />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default M_HMain;
