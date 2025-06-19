import api from '../api';

const Prescriptions = (() => {

  const uploadPrescription = async (prescriptionData) => {
    try {
      const response = await api.post(`/prescription/save`, prescriptionData);
      return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor'};
    }
  }


  return {
    uploadPrescription
  }
})();

export default Prescriptions;