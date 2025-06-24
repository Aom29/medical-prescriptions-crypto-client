import api from '../api';

const Patient = (() => {
  const getPrivateKey = async (userId, token) => {
    try {
      const response = await api.get(`/private/${userId}`, {
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

  const grantAccessToPharmacist = async (recetaId, pharmacistId, password, token) => {
    console.log('token', token);
    console.log('recetaId', recetaId);
    console.log('pharmacistId', pharmacistId);
    console.log('password', password);
    try {
      const response = await api.post(`/patient/grant-access`, {
        idReceta: recetaId,
        idFarmaceutico: pharmacistId,
        password: password
      }, {
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
    getPrivateKey,
    grantAccessToPharmacist
  }
})();

export default Patient;