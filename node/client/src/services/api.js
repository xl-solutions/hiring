import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

const api = {
  get(endpoint, options) {
    return axiosInstance.get(endpoint, options);
  },
  post(endpoint, options) {
    return axiosInstance.post(endpoint, options);
  },
};

export default api;
