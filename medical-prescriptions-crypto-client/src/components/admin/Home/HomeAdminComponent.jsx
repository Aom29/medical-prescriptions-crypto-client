import { Box } from '@mui/material';
import Header from '../../layout/Header';

function HomeAdminComponent () {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Header
        nombre='Admin'
      />
    </Box>
  );
};

export default HomeAdminComponent;