import axios from 'axios';

const be_prefix = "http://localhost:8080"

async function GetData(method, url, params = {}, body = {}) {
    try {
        const response = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            baseURL: be_prefix + url,
            params: params,
            data: body
        });
        return response.data;
    } catch (error) {
        throw (error);
    }
};

export default GetData;