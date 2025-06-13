import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Box, Card, Typography, CardContent, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import ThemeMaterialUI from '../components/ThemeMaterialUI.js';
import Navbar from '../components/navbar/Navbar.jsx';
import ButtonsMod from '../components/layout/ButtonsMod.jsx';

import '../css/login/login.css';
import background from '../img/background.jpg';
import logo from '../img/virus2.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Navbar/>
      <Box sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Card sx= {{ width: { xs: '70%', md: '40%'}, padding: '4%'}}>
            <CardContent>
              <Stack direction='row'>
                <div className='login-div'/>
                <Stack direction='column'>
                  <div className='login-logo-div'>
                    <img src={logo} alt='Logo' className='login-logo'/>
                  </div>
                  <Typography fontSize='3rem' fontWeight='800' >
                    Login
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>

            <CardContent>
              <Stack direction='column' sx= {{ marginTop: '30px', marginBottom: '30px'  }}>
                <div className='login-matricula-div'>
                  <TextField
                    sx={{ width: '100%' }}
                    required
                    variant='outlined'
                    label='Matrícula'
                    placeholder='Ej. 2025449933'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>

                <div className='login-matricula-div'>
                  <TextField
                    sx= {{ width: '100%' }}
                    required
                    variant='outlined'
                    type={showPassword ? 'text' : 'password'}
                    label='Contraseña'
                    placeholder='Ingresa tu contraseña'
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge='end'
                              aria-label='mostrar/ocultar contraseña'
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
              </Stack>

              <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <ButtonsMod
                  variant='principal'
                  textCont='Login'
                  width='100%'
                  height='2.5rem'
                  clickEvent=''
                  type='submit'
                />
              </Box>

            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;