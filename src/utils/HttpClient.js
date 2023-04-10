import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.0.101:3001';

const HttpClient = axios.create({
  baseURL,
});

HttpClient.interceptors.request.use(async req => {
  const data = await AsyncStorage.getItem('user_info');
  const info = JSON.parse(data);

  let token = info?.token || null;
  req.headers = {
    Authorization: `Bearer ${token}`,
  };
  return req;
});

HttpClient.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    let msg = 'Error desconocido';

    if (!response || !response.status) {
      msg = 'No se pudo conectar con el servidor';
    } else {
      switch (response.status) {
        case 401:
          msg = response.data;
          break;
        case 404:
          msg = 'Recurso no encontrado';
          break;
        case 500:
          msg = 'Error en el servidor';
          break;
        default:
          msg =
            error?.response?.data?.errors[0]?.message ||
            'Se produjo un error al realizar la peticion';
          break;
      }
      if (response.config.method === 'get') alert(msg);
    }

    return Promise.reject(msg);
  },
);

export default HttpClient;
