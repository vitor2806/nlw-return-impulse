import axios from 'axios';

//get API url from .env.local
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
