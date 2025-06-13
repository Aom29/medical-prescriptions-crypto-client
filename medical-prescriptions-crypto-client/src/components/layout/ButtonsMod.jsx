import ThemeMaterialUI from '../ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// variant: principal-->Rosa, secundario-->Blanco
// textCont: texto del boton
// clickEvent: funcion que se ejecuta al hacer click (ej: () => alert('Boton presionado'))
// width: ancho del boton (auto por defecto)
// height: alto del boton (auto por defecto)
// margin: margen del boton (auto por defecto)

/* ejemplo de uso:
  <ButtonsMod
    variant='principal'
    textCont='Eliminar'
    width='auto'
    height='9rem'
    clickEvent={funcionAEjecutar}
    startIcon={<DeleteIcon />}
    type='submit'
  />
*/

function ButtonsMod({ variant, textCont, clickEvent, width, height, startIcon, type }) {
  // condicion para el color del boton
  let buttonStyle = {
    width,
    height,
    transition: '0.4s',
  }

  if (variant == 'principal') {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: '#6034FD',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#4224B0',
      }
    }
  } else if (variant === 'secundario') {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: '#FFFFFF',
      color: '#6034FD',
      '&:hover': {
        backgroundColor: '#6034FD',
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
      }
    }
  } else {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: '#FFFFFF',
      borderColor: '#FF4D4F',
      color: '#FF4D4F',
      '&:hover': {
        backgroundColor: '#FF4D4F',
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
      }
    }
  }

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      {/* Boton principal */}
      <Button
        variant='outlined'
        startIcon={startIcon}
        sx={buttonStyle}
        onClick={clickEvent}
        type={type}
      >
        <Typography fontFamily='Poppins' sx={{fontSize: '0.9rem'}}>
          {textCont}
        </Typography>

      </Button>

    </ThemeProvider>
  )
}

export default ButtonsMod