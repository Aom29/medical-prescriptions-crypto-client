import api from '../api';

const Auth = (() => {

  const login = async (formData) => {
    try {
      const response = await api.post(`/auth/login`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor'};
    }
  }

  const savePublicKey = async (publicKeyData, token) => {
    try {
      const response = await api.post(`/auth/savePublicKey`, publicKeyData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor'};
    }
  }

  const savePrivateKey = async (privateKeyData, token) => {
    try {
      const response = await api.post(`/private/save`, privateKeyData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor'};
    }
  }

  return {
    login,
    savePublicKey,
    savePrivateKey,
  }
})();

export default Auth;