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
// ## ENDPOINT DELETE
// ```
// http://localhost:8080/patient/revoke-access?prescriptionId=21d0e6c3-6d0a-4d75-a58e-1cdb5e72f06f&pharmacistId=b1060168-b395-476c-b97e-5cc6000acf40
  const revokeAccessToPharmacist = async (recetaId, pharmacistId, token) => {
    try {
      const response = await api.delete(`/patient/revoke-access`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          prescriptionId: recetaId,
          pharmacistId: pharmacistId
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
    grantAccessToPharmacist,
    revokeAccessToPharmacist
  }
})();

export default Patient;