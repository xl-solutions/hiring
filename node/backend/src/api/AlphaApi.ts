import axios from 'axios';

export const api = axios.create({
	baseURL: `${process.env.ALPHA_VANTAGE_URL}`
});
