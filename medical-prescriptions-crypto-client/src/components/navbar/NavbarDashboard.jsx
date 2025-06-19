import { Typography, IconButton, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import '../../css/medic/medic.css';
import logo from '../../img/virus2.svg';

import { useAuth } from '../../context/Auth/AuthContext';

function NavbarDashboard () {
  const { logout } = useAuth();
  const onLogout = () => {
    logout();
    window.location.href = '/';
  }

  return (
    <>
    <Stack direction='row'>
      <div className='medic-logo-div'>
        <img src={logo} alt='Logo' className='medic-logo'/>
      </div>
      <Typography variant='h6' noWrap component='div' fontWeight='bold' color='black'>
        Cryptosoma
      </Typography>
    </Stack>
    <IconButton
      color='black'
      aria-label='logout'
      onClick={onLogout}
    >
      <LogoutIcon />
    </IconButton>
    </>
  );
};

export default NavbarDashboard;