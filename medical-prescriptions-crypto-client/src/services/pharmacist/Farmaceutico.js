import api from '../api';

const Farmaceutico = (() => {
  const getFarmaceuticos = async (token) => {
    try {
      const response = await api.get('/pharmacist/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log("Error al obtener farmacéuticos:", error);
      return [];
    }
  };

  return {
    getFarmaceuticos
  };
})();

export default Farmaceutico;
