import { ThemeProvider } from '@mui/material/styles';
import { Container, Stack, Box, Typography } from '@mui/material';
import ThemeMaterialUI from '../components/ThemeMaterialUI.js';
import Navbar from '../components/Navbar.jsx';

const Login = () => {
    return (
        <ThemeProvider theme={ThemeMaterialUI}>
            <Navbar/>
            <p>OALSA</p>
            <Typography variant='body2'>hola a todos</Typography>
        </ThemeProvider>
    );
}

export default Login;