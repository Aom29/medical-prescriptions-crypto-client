import { Card, TextField, Box, Stack, InputAdornment }  from '@mui/material';
import '../../css/medic/medic.css';
import background from '../../img/background.jpg';
import ButtonsMod from '../ButtonsMod';

function SearchHeader () {
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

      <Stack direction='row' sx={{ display: 'flex', justifyContent: {md: 'flex-end', xs: 'center' }, alignItems: 'center' }}>
        <TextField
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
                      clickEvent={() => alert('hola saluditos')}
                      type='button'
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
      </Stack>
    </Card>
  );
};

export default SearchHeader;