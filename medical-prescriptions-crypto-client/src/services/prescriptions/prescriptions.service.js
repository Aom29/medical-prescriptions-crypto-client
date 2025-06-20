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

//   [8:07 am, 19/06/2025] Sergew: Ruta:
// http://localhost:8080/prescription/encrypted/9d84f10a-ef3f-4872-82f2-3e66d27f1126
// [8:08 am, 19/06/2025] Sergew: {
//     "encryptedPrescription": "k69VWZP1SJEls4716PlW3/rnxp0ysN/ZMSgZ6Qk7ZD843GdfBK4ooqq4bFqTRzzC5rNIac+t7NNofThq1wZlW5MHwYtpCZeZ8+WR+O/tlNlM9x/lUaf/YSTJ9Wc9N7PvPW4jBICufXwnihFG/Iw0u1Aa7pIaBrxojzlUQPKFmwOe6ZOayvu2GdKhgBF5Ad/3tz6X16lnWUatCAPWERHGDartmQCRzErXhMAEDS9BN40ljfeBcHzDaS5ShWrfMrTtdd1BAK8hVzGmhj8lIlOVrEaFjkPx9i9NnciUWZgTldgh8f98U8SU1Bl6tMAq1sgPWhtyOSWwUS3dHOI7P0VK+3ECd8vtc/I/vVK43Gjw1FPlFo1GUFpj8vEDhs5IJi9BO+s8SA==",
//     "publicKeyServidor": "8T5ICnBuylTmWX1fjKbwOK/6JX7oQtuj7rwL4Sbcdhw=",
//     "accessKey": "ztxiom7dybp5tffedTUmLpi9OmOk0GWJ8Z7TlOp/7LigcyDKZFnEvmrC8rDB9nOKQUX6L3LfUxJm9Dec"
// }
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