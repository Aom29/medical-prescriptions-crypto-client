import { TextField, InputAdornment } from "@mui/material";
import ButtonsMod from "../../../layout/ButtonsMod";

function M_SButton ({ matricula, setMatricula, handleBuscar }) {
  return (
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
  );
}

export default M_SButton;