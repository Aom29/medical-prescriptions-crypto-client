import { useState } from 'react';
import { Stack, Box }  from '@mui/material';
import ButtonsMod from '../../ButtonsMod';
import Medicament from './Medicament';
import '../../../css/medic/medic.css';

function Treatment () {
  const [medicamentos, setMedicamentos] = useState([{ id: 0 }]);

  const handleAgregarMedicamento = () => {
    console.log('Agregando nuevo medicamento...');
    const newId = medicamentos.length > 0
      ? medicamentos[medicamentos.length - 1].id + 1
      : 0;

    setMedicamentos(prev => [...prev, { id: newId }]);
  }

  const handleEliminarMedicamento = (idToDelete) => {
    if (medicamentos.length > 1) {
      setMedicamentos(prev => prev.filter(m => m.id !== idToDelete));
    }
  }

  return (
    <Stack direction='column' >
      {medicamentos.map((med) => (
        <Medicament
          key={med.id}
          id={med.id}
          showDelete={medicamentos.length > 1}
          onDelete={() => handleEliminarMedicamento(med.id)}
        />
      ))}

      
      <Box>
        <ButtonsMod
          variant='secundario'
          textCont='Agregar medicamento'
          height='2.5rem'
          clickEvent={handleAgregarMedicamento}
          type='button'
        />
      </Box>

    </Stack>
  );
};

export default Treatment;