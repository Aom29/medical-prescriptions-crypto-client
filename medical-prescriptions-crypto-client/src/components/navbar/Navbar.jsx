import { AppBar, Toolbar, Typography, Container }  from '@mui/material';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

function Navbar () {
  return (
    <AppBar position='static' color='white'>
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <CoronavirusIcon sx={{ mr: 0.5 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cryptosoma
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;