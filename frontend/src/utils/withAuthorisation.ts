import { AxiosRequestConfig } from 'axios';

export const WithAuthorisation = (token: string): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});