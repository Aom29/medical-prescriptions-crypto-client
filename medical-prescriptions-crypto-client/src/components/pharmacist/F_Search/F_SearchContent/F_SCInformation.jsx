import { Box, Typography }  from '@mui/material';

function F_SCInformation ({ paciente }) {
  return (
    <Box sx={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
      <Typography variant='body1' fontWeight='bold' color='#4224B0'>
        Matrícula: {paciente.matricula}
      </Typography>
    </Box>
  );
};

export default F_SCInformation;