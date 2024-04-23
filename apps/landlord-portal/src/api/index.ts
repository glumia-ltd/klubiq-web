/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import store from '../store';

const api = axios.create({
  //TODO add base URL
  baseURL: '/',
});

// request config
function AxiosConfig(config: any) {
  //TODO token will be gotten from the store via onAuthStateChanged in firebase

  const token = store.getState();
  console.log(token);

  // const token = '';

  config.headers = {};

  config.headers['Content-Type'] = 'application/json';

  //TODOS: -  Add correlation ID to headers X-Correlation-Id (uuid v4)
  // - Add timezone offset  x-client-tzo

  config.headers['X-Client-Tzo'] = new Date().getTimezoneOffset();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

api.interceptors.request.use(AxiosConfig, (error) => Promise.reject(error));

// response config

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //TODO in case there is an error due to expired token. Get the status code from firebase.

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //TODO get from firebase
        // const refreshToken = '';

        // const response = await axios.post('/api/refresh-token', { refreshToken });
        // const { token } = response.data;

        // Retry the original request with the new token
        // originalRequest.headers.Authorization = `Bearer ${token}`;

        return axios(originalRequest);
      } catch (error) {
        return error;
      }
    }
    return Promise.reject(error);
  }
);

export const endpoints = {
  login: () => '/login',
};

export { api };
