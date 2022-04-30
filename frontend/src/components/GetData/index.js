import axios from 'axios';

const be_prefix = "http://localhost:8080"

async function GetData(method, url, body = {}) {
    try {
        const response = await axios({
            method,
            baseURL: be_prefix + url,
            params: body
        });
        return response.data;
    } catch (error) {
        throw(error);
    }
};

export default GetData;