import axios from 'axios';

const api = axios.create({
    baseUrl: 'https://my-json-server.typicode.com/pedrotakahashi/fake-api/db'

});

export default api;