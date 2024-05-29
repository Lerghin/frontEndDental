import axios from 'axios';
import { LS } from './LS';

const API = axios.create({
  baseURL: 'http://localhost:8080', 
});

API.interceptors.request.use(config => {
  const token = LS.getText('token'); // Asegúrate de que LS.getText obtenga correctamente el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    //console.log('Token añadido a los headers:', config.headers.Authorization); // Log para verificar el token
  } else {
    console.log('No token found');
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { API };
