import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost',
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export default axios;