import { useState } from 'react';
import { Stack } from '@mui/material';
import F_SHeader from "./F_SearchHeader/F_SHeader";
import F_SCMain from './F_SearchContent/F_SCMain';

function F_SearchMain () {
  const [paciente, setPaciente] = useState(null);

  return (
    <Stack direction='column' sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }} >
      <F_SHeader onBuscar={setPaciente} />
      <F_SCMain paciente={paciente}/>
    </Stack>
  );
}

export default F_SearchMain;