import axios, { AxiosError } from 'axios';
import urls from './urls';
import { useCookie } from '../hooks/useCookie';
import axiosRetry from 'axios-retry';

const api = axios.create({
  withCredentials: true,
});

axiosRetry(api, {
  retries: 1,
  onRetry: async (count) => {
    await axios.post(urls.refreshToken, {}, {
      withCredentials: true,
    }).catch(() => null);
  },
  retryCondition: (error) => {
    return error.response?.status === 401 || error.response?.status === 403;
  }
});

export default api;