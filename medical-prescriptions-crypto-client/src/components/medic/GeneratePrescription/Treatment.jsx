import { useState } from 'react';
import { Stack, Box }  from '@mui/material';
import ButtonsMod from '../../ButtonsMod';
import Medicament from './Medicament';
import '../../../css/medic/medic.css';

function Treatment ({ value, onChange }) {
  const [medicamentos, setMedicamentos] = useState(
    value.length > 0 ? value : [{ id: 0, nombre: '', dosis: '', frecuencia: '', duracion: ''}]
  );

  const handleAgregarMedicamento = () => {
    const newId = medicamentos.length > 0
      ? medicamentos[medicamentos.length - 1].id + 1
      : 0;
    
    const nuevoMedicamento = { id: newId, nombre: '', dosis: '', frecuencia: '', duracion: '' };
    const actualizado = [...medicamentos, nuevoMedicamento];
    setMedicamentos(actualizado);
    onChange(actualizado);
  }

  const handleEliminarMedicamento = (idToDelete) => {
    if (medicamentos.length > 1) {
      const actualizados = medicamentos.filter(m => m.id !== idToDelete);
      setMedicamentos(actualizados);
      onChange(actualizados);
    }
  }

  // Agregué método para actualizar campos de un medicamento
  const handleChange = (id, updatedFields) => {
    const updatedMedicamentos = medicamentos.map(med => 
      med.id === id ? { ...med, ...updatedFields } : med
    );
    setMedicamentos(updatedMedicamentos);
    onChange(updatedMedicamentos);
  }

  return (
    <Stack direction='column' >
      {medicamentos.map((med) => (
        <Medicament
          key={med.id}
          id={med.id}
          data={med}
          showDelete={medicamentos.length > 1}
          onDelete={() => handleEliminarMedicamento(med.id)}
          onChange={(updatedFields) => handleChange(med.id, updatedFields)}
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