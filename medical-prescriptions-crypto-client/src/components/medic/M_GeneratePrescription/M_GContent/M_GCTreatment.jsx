import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import M_GCMedicament from './M_GCMedicament';
import ButtonsMod from '../../../layout/ButtonsMod';

function M_GCTreatment({ value, onChange }) {
  const [medicamentos, setMedicamentos] = useState(value.length > 0 ? value : [{ id: 0, nombre: '', dosis: '', frecuencia: '', duracion: '' }]);

  const handleChange = (id, updatedFields) => {
    const updatedMedicamentos = medicamentos.map((med) => 
      med.id === id ? { ...med, ...updatedFields } : med
    );
    setMedicamentos(updatedMedicamentos);
    onChange(updatedMedicamentos); // Esto pasará el estado actualizado al padre
  };

  const handleAgregarMedicamento = () => {
    const newId = medicamentos.length > 0 ? medicamentos[medicamentos.length - 1].id + 1 : 0;
    const nuevoMedicamento = { id: newId, nombre: '', dosis: '', frecuencia: '', duracion: '' };
    setMedicamentos([...medicamentos, nuevoMedicamento]);
    onChange([...medicamentos, nuevoMedicamento]); // Para propagar los cambios al padre
  };

  const handleEliminarMedicamento = (idToDelete) => {
    const updatedMedicamentos = medicamentos.filter(med => med.id !== idToDelete);
    setMedicamentos(updatedMedicamentos);
    onChange(updatedMedicamentos); // Actualiza en el padre
  };

  return (
    <Stack direction="column">
      {medicamentos.map((med) => (
        <M_GCMedicament
          key={med.id}
          id={med.id}
          data={med}
          showDelete={medicamentos.length > 1}
          onDelete={() => handleEliminarMedicamento(med.id)}
          onChange={handleChange} // Se pasa la función al hijo
        />
      ))}
      <Box>
        <ButtonsMod
          variant="secundario"
          textCont="Agregar medicamento"
          height="2.5rem"
          clickEvent={handleAgregarMedicamento}
          type="button"
        />
      </Box>
    </Stack>
  );
}

export default M_GCTreatment;
