import api from '../api';

const Admin = (() => {
  const registerDoctor = async (formData) => {
    try {
      const response = await api.post(`/admin/register-doctor`, formData);
      return response.data;
    } catch (error) {
      if(error.response) {
        return {
          status: "error",
          message: error.response.data.message
        }
      }
    } 
  };

  const registerPharmacist = async (formData) => {
    try {
      const response = await api.post(`/admin/register-pharmacist`, formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error desconocido');
      } else {
        throw new Error('Error al conectar con el servidor');
      }
    }
  }

  return {
    registerDoctor,
    registerPharmacist
  }
})();

export default Admin;