import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 100000,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const getResult = (response: AxiosResponse) => response.data;

export const get = async <T>(...args: Parameters<typeof httpClient.get>) => {
  return await httpClient.get<T>(...args).then(getResult);
};

export const post = async <T>(...args: Parameters<typeof httpClient.post>) => {
  return await httpClient.post<T>(...args).then(getResult);
};

export const put = async <T>(...args: Parameters<typeof httpClient.put>) => {
  return await httpClient.put<T>(...args).then(getResult);
};

export const del = async <T>(...args: Parameters<typeof httpClient.delete>) => {
  return await httpClient.delete<T>(...args).then(getResult);
};
