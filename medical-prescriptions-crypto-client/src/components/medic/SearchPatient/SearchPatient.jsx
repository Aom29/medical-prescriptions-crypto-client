import SearchPatientHeader from "./SearchPatientHeader/SearchPatientHeader";
import SearchPatientData from "./SearchPatientData/SearchPatientData";

function SearchPatient ({setView}) {
  return (
    <>
      <SearchPatientHeader/>
      <SearchPatientData setView={setView} />
    </>
  );
}

export default SearchPatient;