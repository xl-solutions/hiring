import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  transformResponse: [
    (response) => {
      if (response.erro) {
        throw JSON.parse(response);
      }
      return JSON.parse(response);
    },
  ],
});
