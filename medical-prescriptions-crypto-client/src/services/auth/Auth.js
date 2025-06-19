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

  const savePublicKey = async (publicKeyData) => {
    try {
      const response = await api.post(`/auth/savePublicKey`, publicKeyData);
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
      console.log(privateKeyData);
      console.log(token);
      const response = await api.post(`/auth/private/save`, privateKeyData, {
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

  return {
    login,
    savePublicKey,
    savePrivateKey,
  }
})();

export default Auth;