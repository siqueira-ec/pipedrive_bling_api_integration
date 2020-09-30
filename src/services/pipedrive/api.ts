import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PIPEDRIVE_API_URL,
  params: {
    api_token: process.env.PIPEDRIVE_API_KEY,
  },
});

export default api;
