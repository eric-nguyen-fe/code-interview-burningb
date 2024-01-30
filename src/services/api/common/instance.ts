import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: '',
});

axiosInstance.interceptors.request.use(
  ($config: AxiosRequestConfig): AxiosRequestConfig => {
    if ($config.headers) {
      $config.headers.Accept = "*/*";
    }
    return $config;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/";
          return Promise.reject(
            (error.response.data as { content: any }).content
          );
        case 422:
          return Promise.reject(
            (error.response.data as { content: any }).content
          );
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
