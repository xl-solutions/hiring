import {
    API_URL_DEV, 
    API_URL_PROD
} from "../utils/constants"

const axios = require('axios');

let headers = {
  "Content-Type": "application/json" 
};

const api = axios.create({
  baseURL: API_URL_DEV,
  timeout: 20000, 
  headers
}); 

export default api; 