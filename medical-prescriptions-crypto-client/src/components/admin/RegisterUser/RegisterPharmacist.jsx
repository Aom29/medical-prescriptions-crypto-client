import { Box, Card, TextField, CardContent } from '@mui/material';
import Subtitle from '../../layout/Subtitle';
import ButtonsMod from '../../layout/ButtonsMod';
import RegisterHomeButton from './RegisterHomeButton';

function RegisterPharmacist ({ setView }) {
  return (
    <Box width='100%' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <RegisterHomeButton setView={setView} />
      <Card sx={{ width:'80%', padding: '3%' }}>
        <CardContent>
          <Subtitle subtitulo='Registrar farmacéutico' />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Correo electrónico'
            multiline
            rows={1}
          />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Nombre'
            multiline
            rows={1}
          />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Fecha de nacimiento'
            multiline
            rows={1}
          />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Farmacia'
            multiline
            rows={1}
          />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Teléfono celular'
            multiline
            rows={1}
          />
          <TextField
            sx={{ width: '100%', marginBottom: '20px' }}
            id='filled-multiline-static'
            label='Contraseña'
            multiline
            rows={1}
          />

          <Box sx={{ display: 'flex', width: '100%', marginTop: '10px' }}>
            <ButtonsMod
              variant='principal'
              textCont='Registrar'
              width='100%'
              clickEvent=''
              type='submit'
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPharmacist;