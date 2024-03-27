import axios, { AxiosError } from 'axios';
import urls from '../utils/urls';

const api = axios.create({
  withCredentials: true,
});

api.interceptors.response.use((config) => config.data,
  async (error: AxiosError) => {
    const originalRequest = {
      ...error.config,
      _isRetry: true,
    };

    if (
      error.response?.status === 401 || error.response?.status === 403
    ) {
      const resp = await axios.post(urls.refreshToken, {}, {
        withCredentials: true,
      }).catch(() => null);

      if (resp) {
        return api.request(originalRequest);
      }  
    }
    return Promise.reject(error);
  } 
);

export default api;