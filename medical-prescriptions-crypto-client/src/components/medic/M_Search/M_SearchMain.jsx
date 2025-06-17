import M_SHeader from "./M_SearchHeader/M_SHeader";
import M_SCMain from "./M_SearchContent/M_SCMain";

function M_SearchMain ({setView}) {
  return (
    <>
      <M_SHeader/>
      <M_SCMain setView={setView} />
    </>
  );
}

export default M_SearchMain;