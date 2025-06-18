import axios from 'axios';

const backendUrl = 'http://localhost:8080'

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

