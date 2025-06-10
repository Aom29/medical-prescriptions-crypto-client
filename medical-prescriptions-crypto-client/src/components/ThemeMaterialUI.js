import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins';
import '@fontsource/montserrat';

const ThemeMaterialUI = createTheme({
  palette: {
    primary: {
      main: '#6034FD', 
      dark: '#4224B0', 
      light: '#7D59FF', 
    },
    secondary: {
      main: '#489abb', 
      dark: '#2f6d9e', 
      light: '#7ab1d5', 
    },
    yellow: {
      main: '#f9a825', 
      dark: '#c17900', 
      light: '#ffdb56', 
    },
    black: {
      main: '#000000',
      dark: '#000000',
      light: '#000000',
    },
    dark: {
      main: '#333333',
      dark: '#000000', 
      light: '#666666',
    },
    gray: {
      main: '#6c6c6c', 
      dark: '#4a4a4a',
      light: '#999999', 
    },
    google: {
      main: '#db4437',
      dark: '#a52714', 
      light: '#ff5f52', 
    },
    lemon: {
      main: '#8bc34a',
      dark: '#5a9216', 
      light: '#bef67a',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    rem3: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    rem2: {
      fontSize: '2rem',
      fontWeight: 'medium',
    },
    midtext: {
      fontSize: '1.25rem',
      fontWeight: 'medium',
    },
  },
});

export default ThemeMaterialUI;
