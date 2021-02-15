import axios from 'axios';

export const api = axios.create({
    baseUrl: "http://localhost:3001/",
});


