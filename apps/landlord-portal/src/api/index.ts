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

  config.headers = {};

  config.headers['content-type'] = 'application/json';

  config.headers['x-correlation-id'] = crypto.randomUUID();

  config.headers['x-client-tzo'] = new Date().getTimezoneOffset();

  config.headers['x-client-name'] = 'landlord-portal';

  if (!skippedEndpoints.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
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

    if (
      error.response.status &&
      error.response.status > 400 &&
      //TODO: Check the error message.
      'expired token' in error.message.toLowerCase() &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        //TODO: Confirm the response.

        const {
          data: {
            data: { access_token, refresh_token },
          },
        } = await axios.post(
          `https://devapi.klubiq.com/api/${authEndpoints.refreshToken()}`,
          {
            refreshToken,
          }
        );

        if (access_token && refresh_token) {
          localStorage.setItem('token', access_token);
          localStorage.setItem('refreshToken', refresh_token);
        }

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return axios(originalRequest);
      } catch (error) {
        return error;
      }
    }
    return Promise.reject(error);
  }
);

export { api };
