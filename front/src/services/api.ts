import axios from 'axios';

function axiosconfig(): any {
  switch (process.env.REACT_APP_ENV_SETUP) {
    case 'development-docker':
      return process.env.REACT_APP_API_DOCKER_URL;
    default:
      return process.env.REACT_APP_API_LOCAL_URL;
  }
}

const api = axios.create({
  baseURL: axiosconfig(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
