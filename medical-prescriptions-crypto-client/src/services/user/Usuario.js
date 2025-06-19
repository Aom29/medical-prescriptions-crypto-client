import api from '../api';

const Usuario = (() => {
  const getUsuarios = async(matricula, token) => {
    console.log("Datos recibidos: ", matricula)
    console.log("Datos recibidos: ", token)
    try {
      const response = await api.get(`/user/${matricula}`,  {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response: ", response)
      return response.data;
    } catch (error) {
      console.log("error: ",error)
      if(error.response?.data) {
        return error.response.data;
      }
      return {status: 'error', message: 'Error al conectar con el servidor'}
    }
  }

  return {
    getUsuarios,
  }
})();

export default Usuario;