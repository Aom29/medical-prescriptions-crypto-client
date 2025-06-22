import api from '../api';

const Prescriptions = (() => {

  const uploadPrescription = async (prescriptionData, token) => {
    try {
    //   const response = await api.post(`/prescription/save`, prescriptionData);
        // Peticion con bearer token
      const response = await api.post(`/prescription/save`, prescriptionData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
        return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor'};
    }
  }

  const getDecipherementInformation = async (prescriptionId, token) => {
    try {
      const response = await api.get(`/prescription/encrypted/${prescriptionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      return { status: 'error', message: 'Error al conectar con el servidor' };
    }
  }


  return {
    uploadPrescription,
    getDecipherementInformation
  }
})();

export default Prescriptions;