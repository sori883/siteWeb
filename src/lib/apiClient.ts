import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {},
  withCredentials: true,
});

export default apiClient;
