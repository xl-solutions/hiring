import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

export const route = {
    posts:{
        list: async () => await api.get(`posts`),
        delete: async(id: number) => await api.delete(`posts/${id}`),
    },
    comments:{
        list: async(id: number) => await api.get(`posts/${id}/comments`),
    },
    users:{
        list: async() => await api.get(`users/`),
    },
    albums:{
        list: async(id: string) => await api.get(`/users/${id}/albums`)
    },
    photos:{
        list: async(id: string) => await api.get(`/albums/${id}/photos`)
    }

}
  