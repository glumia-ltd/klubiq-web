/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
// import store from '../store';

const api = axios.create({
  //TODO add base URL
  baseURL:
    import.meta.env.NODE_ENV !== 'local'
      ? `${import.meta.env.VITE_BASE_URL_DEV}/api`
      : '/api',
});

const skippedEndpoints = [
  authEndpoints.login(),
  authEndpoints.signup(),
  authEndpoints.emailVerification(),
];

// request config
function AxiosConfig(config: any) {
  const token = localStorage.getItem('token');

  console.log(config);

  config.headers = {};

  config.headers['content-type'] = 'application/json';

  config.headers['x-correlation-id'] = crypto.randomUUID();

  config.headers['x-client-tzo'] = new Date().getTimezoneOffset();

  config.headers['x-client-name'] = 'landlord-portal';

  if (!skippedEndpoints.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`Bearer ${token}`);
  }

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

export { api };
