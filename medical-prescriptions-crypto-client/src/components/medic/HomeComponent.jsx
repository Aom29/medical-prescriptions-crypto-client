import { Card, Typography, CardContent, Stack, Box }  from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import '../../css/medic/medic.css';
import ButtonsMod from '../ButtonsMod';

function HomeHeader () {
  return (
    <Card position='static' 
      sx={{
        borderRadius: 2,
        padding: '2%',
      }}>

      <CardContent>
        <Stack direction='column'>
          <Stack direction='row' sx={{ marginBottom: '30px' }}>
            <div className='medic-home-div' />
            <Typography variant='h6' fontWeight='bold'>
              Estado del sistema
            </Typography>
          </Stack>

          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              padding: 2,
              borderRadius: 1,
              boxShadow: 2,
              border: '0.1px solid #e0e0e0',
              backgroundColor: 'white',
            }}
          >
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyIcon sx={{ fontSize: '1.6rem' }} />
              <Typography fontSize='1.1rem' sx={{ marginLeft: '10px' }}>
                Llave privada 
              </Typography>
            </Stack>
            <div>
              <ButtonsMod
                variant='principal'
                textCont='Cargar archivo'
                width='100%'
                height='2.5rem'
                clickEvent=''
                type='submit'
              />
            </div>
          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
};

export default HomeHeader;