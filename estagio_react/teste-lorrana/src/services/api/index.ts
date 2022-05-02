import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

export const route = {
    posts:{
        list: async () => await api.get(`posts`),
        delete: async(id: number) => await api.delete(`posts/${id}`),
    }
}
  