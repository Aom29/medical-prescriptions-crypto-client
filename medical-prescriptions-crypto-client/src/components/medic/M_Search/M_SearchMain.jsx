import { useState } from "react";
import M_SHeader from "./M_SearchHeader/M_SHeader";
import M_SCMain from "./M_SearchContent/M_SCMain";

function M_SearchMain ({setView, setPaciente, paciente}) {

  return (
    <>
      <M_SHeader onBuscar={setPaciente} />
      <M_SCMain setView={setView} paciente={paciente}/>
    </>
  );
}

export default M_SearchMain;