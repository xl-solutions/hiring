import _axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/';

export const axios = _axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
});

export default async ({
    method,
    url,
    dados,
  }) => {
    try {
      const response = await axios({
        url,
        method,
        data: dados,
      });
  
      return new Promise((resolve) => resolve(response));
    } catch (error) {
      console.log(`%c${error.message}`, '');
  
      return {
        success: false,
        message: 'Tivemos um problema. Tente novamente mais tarde',
      };
    }
  };