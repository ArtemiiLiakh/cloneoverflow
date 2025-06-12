import axios from 'axios';
import axiosRetry from 'axios-retry';
import urls from './urls';

const api = axios.create({
  withCredentials: true,
});

axiosRetry(api, {
  retries: 1,
  onRetry: async () => {
    await axios.post(urls.refreshToken, {}, {
      withCredentials: true,
    }).catch(() => null);
  },
  retryCondition: (error) => {
    return error.response?.status === 401 || error.response?.status === 403;
  }
});

export default api;