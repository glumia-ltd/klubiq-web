/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
import { firebaseResponseObject } from '../helpers/FirebaseResponse';
import { get } from 'lodash';
import { consoleDebug } from '../helpers/debug-logger';

const baseURL =
  import.meta.env.VITE_NODE_ENV !== 'local'
    ? `${import.meta.env.VITE_BASE_URL_DEV}/api`
    : '/api';
const api = axios.create({ baseURL });

const skippedEndpoints = [
  authEndpoints.login(),
  authEndpoints.signup(),
  authEndpoints.emailVerification(),
];

const getSessionToken = () => {
  const storedSession = sessionStorage.getItem(
    firebaseResponseObject.sessionStorage || '',
  );
  return storedSession && JSON.parse(storedSession);
};
const accessToken = getSessionToken()?.stsTokenManager?.accessToken;
// request config

function AxiosConfig(config: any) {
  const token = getSessionToken()?.stsTokenManager?.accessToken;

  config.headers = {};

  config.headers['content-type'] = 'application/json';

  config.headers['x-correlation-id'] = crypto.randomUUID();

  config.headers['x-client-tzo'] = new Date().getTimezoneOffset();
  config.headers['x-client-tz-name'] =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  config.headers['x-client-id'] = 'app-web';
  const orgSettingString = sessionStorage.getItem('org-settings');
  const tenant_id = sessionStorage.getItem('tenant_id');
  if (
    token &&
    token.length > 0 &&
    orgSettingString &&
    orgSettingString.length > 0
  ) {
    //getData('org-settings', 'client-config');
    const orgSettings = JSON.parse(orgSettingString as string);
    consoleDebug('orgSettings: ', orgSettings);
    config.headers['x-client-lang'] = get(orgSettings, 'language', '');
    config.headers['x-client-locale'] = get(orgSettings, 'countryCode', '');
    config.headers['x-client-currency'] = get(orgSettings, 'currency', '');
    config.headers['x-tenant-id'] = tenant_id ?? '';
  }
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('_kbq_csrf'))
    ?.split('=')[1] ?? '';

  if (!skippedEndpoints.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (csrfToken && config.method !== 'GET') {
    config.headers['x-csrf-token'] = csrfToken;
  }

  return config;
}

api.interceptors.request.use(AxiosConfig, (error) => Promise.reject(error));

// response config

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const {
      status,
      data: { message },
    } = error.response;

    if (
      status &&
      status > 400 &&
      message?.includes('expired token') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getSessionToken()?.stsTokenManager;
        const {
          data: {
            data: {
              access_token,
              // refresh_token
            },
          },
        } = await axios.post(
          `${baseURL}${authEndpoints.refreshToken()}`,
          {
            refreshToken,
          },
        );

        // if (access_token && refresh_token) {
        //  localStorage.setItem('token', access_token);
        //  localStorage.setItem('refreshToken', refresh_token);
        // }

        // Retry the original request with the new token

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return axios(originalRequest);
      } catch (error) {
        return error;
      }
    }
    return Promise.reject(error);
  },
);

export { api, baseURL, accessToken };
