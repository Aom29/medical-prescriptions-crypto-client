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

  return {
    getPrivateKey,
  }
})();

export default Patient;