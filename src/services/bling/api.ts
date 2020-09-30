import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BLING_API_URL,
});

export default api;
