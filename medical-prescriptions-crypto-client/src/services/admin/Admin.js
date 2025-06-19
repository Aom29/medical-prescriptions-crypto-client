import { data } from 'react-router-dom';
import api from '../api';

const Admin = (() => {
  const registerDoctor = async (formData) => {
    try {
      const response = await api.post(`/admin/register-doctor`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      if(error.response?.data) {
        return error.response.data;
      }

      return { status: 'error', message: 'Error al conectar con el servidor' };
    } 
  }

  const registerPharmacist = async (formData) => {
    try {
      const response = await api.post(`/admin/register-pharmacist`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      } 

      return { status: 'error', message: 'Error al conectar con el servidor' };
    }
  }

  const registerPatient = async (formData) => {
    try {
      const response = await api.post(`/admin/register-patient`, formData);
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
    registerDoctor,
    registerPharmacist,
    registerPatient
  }
})();

export default Admin;