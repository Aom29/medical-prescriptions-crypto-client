import { Card, Typography, Box }  from '@mui/material';
import '../../css/medic/medic.css';
import background from '../../img/background.jpg';
import pharmacist from '../../img/pharmacist.jpg';
import patient from '../../img/patient.jpg';
import admin from '../../img/admin.jpg';

function Header ({ nombre, rol = 'default' }) {
  const getBackgroundImage = () => {
    switch (rol) {
      case 'pharmacist':
        return pharmacist;
      case 'patient':
        return patient;
      case 'admin':
        return admin;
      default:
        return background;
    }
  }
  return (
    <Card position='static' 
      sx={{
        height: '6rem',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        marginBottom: '50px',
        width: '100%',
      }}>

     <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${getBackgroundImage()})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)', 
          zIndex: 0,
        }}
      />

      <div className='home-component-div'>
        <Typography
          fontSize='2rem'
          noWrap
          sx={{
            mr: 2,
            display: 'flex',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'white',
            zIndex: 2,
          }}
        >
          ¡Bienvenido {nombre}!
        </Typography>
      </div>
    </Card>
  );
};

export default Header;