/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
import { get } from 'lodash';
import { consoleDebug } from '../helpers/debug-logger';
import { fileEndpoints } from '../helpers/endpoints';
const baseURL = (() => {
	switch (import.meta.env.VITE_NODE_ENV) {
		case 'local':
			return '/api';
		case 'development':
			return `${import.meta.env.VITE_BASE_URL_DEV}/api`;
		case 'staging':
			return `${import.meta.env.VITE_BASE_URL_STAGING}/api`;
		case 'production':
			return `${import.meta.env.VITE_BASE_URL_PROD}/api`;
		default:
			return `${import.meta.env.VITE_BASE_URL_LOCAL}/api`;
	}
})();
const api = axios.create({ baseURL, withCredentials: true });
const CLIENT_ID = 'kbq_lp_app-web';
const DOWNLOAD_ENDPOINTS =[
	'/api/dashboard/download-revenue-report',
]
const UPLOAD_ENDPOINTS = [
	fileEndpoints.uploadImages(),
]
const CSRF_IGNORE_ENDPOINTS = [
	authEndpoints.refreshToken(),
	authEndpoints.login(),
	authEndpoints.signOut(),
	authEndpoints.signup(),
	authEndpoints.sendResetPasswordEmail(),
	authEndpoints.resetPassword(),
	authEndpoints.verifyOobCode(),
	authEndpoints.emailVerification(),
	authEndpoints.csrf(),
]

// CSRF token management
const getCsrfToken = () => sessionStorage.getItem('csrf_token');
const setCsrfToken = (token: string) => sessionStorage.setItem('csrf_token', token);

const fetchNewCsrfToken = async () => {
    try {
        const response = await api.get(authEndpoints.csrf());
        const { data } = response.data;
        setCsrfToken(data.token);
        return data.token;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        return null;
    }
};

function AxiosConfig(config: any) {
	// const token = getSessionToken()?.stsTokenManager?.accessToken;
	config.headers = {};
	if (config.url && !UPLOAD_ENDPOINTS.includes(config.url as string)) {
		config.headers['content-type'] = 'application/json';
	}
	 // Add CSRF token for non-GET requests
	 if (config.method !== 'get' && !CSRF_IGNORE_ENDPOINTS.includes(config.url as string)) {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
            config.headers['x-csrf-token'] = csrfToken;
        }
    }
	config.headers['x-correlation-id'] = crypto.randomUUID();
	config.headers['x-client-tzo'] = new Date().getTimezoneOffset();
	config.headers['x-client-tz-name'] =
		Intl.DateTimeFormat().resolvedOptions().timeZone;
	config.headers['x-client-id'] = CLIENT_ID;
	const orgSettingString = sessionStorage.getItem('org-settings');
	const tenant_id = sessionStorage.getItem('tenant_id');
	if (
		orgSettingString &&
		orgSettingString.length > 0
	) {
		const orgSettings = JSON.parse(orgSettingString as string);
		consoleDebug('orgSettings: ', orgSettings);
		config.headers['x-client-lang'] = get(orgSettings, 'language', '');
		config.headers['x-client-locale'] = get(orgSettings, 'countryCode', '');
		config.headers['x-client-currency'] = get(orgSettings, 'currency', '');
		config.headers['x-tenant-id'] = tenant_id ?? '';
	}

	if (DOWNLOAD_ENDPOINTS.includes(config.url as string)) {
		config.responseType = 'arraybuffer';
		config.headers['content-type'] = 'blob';
	}
	config.withCredentials = true;

	return config;
}

api.interceptors.request.use(AxiosConfig, (error) => Promise.reject(error));

api.interceptors.response.use(
	async (response) => {
		return response;
	},
	async (error) => {
		
		const originalRequest = error.config;
		// Don't retry if we're already on the login page
		if (window.location.pathname === '/login') {
			return Promise.reject(error);
		}
		 // Handle CSRF token errors
		 if (error.response?.status === 401 && error.response?.data?.message?.includes('CSRF')) {
            try {
                const newToken = await fetchNewCsrfToken();
				console.log('newToken', newToken);
                if (newToken) {
                    originalRequest.headers['x-csrf-token'] = newToken;
                    return api(originalRequest);
                }
            } catch (csrfError) {
                console.error('Failed to refresh CSRF token:', csrfError);
            }
        }

		// Only retry if it's a 401 and we haven't retried yet
		if (error.response?.status === 401 && error.response?.data?.message?.includes('expired token') && !originalRequest._retry) {
			// Check if we're already on the refresh token endpoint
			originalRequest._retry = true;
			try {
				await api.post(authEndpoints.refreshToken());
				return api(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login only if not already there
				if (window.location.pathname !== '/login') {
					window.location.href = '/login';
				}
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);
export { api, baseURL };
