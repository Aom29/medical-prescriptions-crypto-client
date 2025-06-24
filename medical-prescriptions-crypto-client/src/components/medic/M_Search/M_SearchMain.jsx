import { useState } from "react";
import { Card, Box, Stack, TextField, InputAdornment }  from '@mui/material';
import M_SCMain from "./M_SearchContent/M_SCMain";
import background from '../../../img/background.jpg';
import ButtonsMod from "../../layout/ButtonsMod";

import Usuario from "../../../services/user/Usuario";
import { useAuth } from "../../../context/Auth/AuthContext";

function M_SearchMain ({ setView }) {
  const { auth } = useAuth();
  const [paciente, setPaciente] = useState(null);
  const [matricula, setMatricula] = useState('');

  const handleBuscar =  async (e) => {
    const data = await Usuario.getUsuarios(matricula, auth.token);
    console.log(data);
    let nuevoPaciente = {}
    nuevoPaciente.matricula = data.matricula
    nuevoPaciente.nombre = data.name
    nuevoPaciente.fechaNacimiento = data.fechaNacimiento
    nuevoPaciente.curp = data.curp
    nuevoPaciente.recetas = []
    nuevoPaciente.id = data.id

    setPaciente(nuevoPaciente)

    return;
  }

  return (
    <>
      {/* Botón para buscar al paciente ---------------------------------------------------- */}
      <Card position='static' 
        sx={{ height: '6rem', position: 'relative', overflow: 'hidden', borderRadius: 2, marginBottom: '50px', padding: '2%', alignItems: 'center', display: 'center', width: '100%' }}>
      <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)', 
            zIndex: 0,
          }}
        />

        <Stack direction='row' sx={{ display: 'flex', justifyContent: {md: 'flex-end', xs: 'center' }, alignItems: 'center', width: '100%' }}>
          <TextField
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            id='filled-basic'
            label='Buscar Matrícula'
            variant='filled'
            placeholder='Ej. 2025336644'
            sx={{ backgroundColor: 'white', width: { xs: '100%', md: '40%' }, borderRadius: '5px' }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: '5px' }}>
                    <ButtonsMod
                      variant='principal'
                      textCont='Buscar'
                      width='6rem'
                      height='2.2rem'
                      clickEvent={handleBuscar}
                      type='button'
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </Card>

      {/* Aquí se muestra la información del paciente ---------------------------------------------------- */}
      <M_SCMain setView={setView} paciente={paciente}/>
    </>
  );
}

export default M_SearchMain;


