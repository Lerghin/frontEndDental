import axios from 'axios';
import { LS } from './LS';
import { logoutUser } from './../../src/pages/Store/Actions/authActions';
import store from './../../src/pages/Store/store';

const API = axios.create({
  baseURL: 'https://pruebajavaspringdental-8-jctd.onrender.com', // Cambia a la ruta proxy configurada
});

API.interceptors.request.use(config => {
  const token = LS.getText('token');
  const role = LS.getText('role');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (role) {
    config.headers['X-User-Role'] = role;
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
