import axios from 'axios';
import { LS } from './LS';
import { logoutUser } from './../../src/pages/Store/Actions/authActions';
import store from './../../src/pages/Store/store';

const API = axios.create({
  baseURL: 'http://localhost:8080', 
});

API.interceptors.request.use(config => {
  const token = LS.getText('token');
  const role = LS.getText('role'); // Obtener el rol del almacenamiento local (u otra fuente)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (role) {
    config.headers['X-User-Role'] = role; // Agregar el rol al encabezado
  }

  return config;
}, error => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser());
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export { API };
