import { useState } from "react";
import M_SHeader from "./M_SearchHeader/M_SHeader";
import M_SCMain from "./M_SearchContent/M_SCMain";

function M_SearchMain ({setView}) {
  const [paciente, setPaciente] = useState(null);

  return (
    <>
      <M_SHeader onBuscar={setPaciente} />
      <M_SCMain paciente={paciente} setView={setView} />
    </>
  );
}

export default M_SearchMain;