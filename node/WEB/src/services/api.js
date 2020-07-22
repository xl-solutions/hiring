import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
    transformResponse: [function (response) {
       
        if (response.erro) throw JSON.parse(response);

        return JSON.parse(response);
    }]

});



export default api;