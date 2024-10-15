import Axios from 'axios';
import cookie from 'cookie';

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const axios = Axios.create({
  baseURL: `${apiURL}/api/v1`,
  headers: {
    'X-API-Key': apiKey,
  },
});

export const csrf = () =>
  axios.get('/sanctum/csrf-cookie', {
    baseURL: apiURL,
  });

axios.interceptors.request.use((config) => {
  if (config.url?.includes('csrf')) return config;

  const { NEXT_LOCALE } = cookie.parse(document.cookie);

  if (NEXT_LOCALE) {
    config.baseURL = `${apiURL}/api/v1/${NEXT_LOCALE}`;
  }

  return config;
});
