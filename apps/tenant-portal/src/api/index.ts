/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
const baseURL =
	import.meta.env.VITE_NODE_ENV !== 'local'
		? `${import.meta.env.VITE_BASE_URL_DEV}/api`
		: '/api';
const api = axios.create({ baseURL, withCredentials: true });
const CLIENT_ID = 'kbq_tp_app-web';
const CSRF_IGNORE_ENDPOINTS = [
	authEndpoints.refreshToken(),
	authEndpoints.login(),
	authEndpoints.signOut(),
	authEndpoints.csrf(),
];
const getCsrfToken = () => sessionStorage.getItem('csrf_token');
const setCsrfToken = (token: string) =>
	sessionStorage.setItem('csrf_token', token);

const fetchNewCsrfToken = async () => {
	try {
		const response = await api.get(authEndpoints.csrf());
		console.log('refreshing csrf token response', response);
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
	if (
		config.method !== 'get' &&
		!CSRF_IGNORE_ENDPOINTS.includes(config.url as string)
	) {
		const csrfToken = getCsrfToken();
		if (csrfToken) {
			config.headers['x-csrf-token'] = csrfToken;
		}
	}
	config.headers['content-type'] = 'application/json';
	config.headers['x-correlation-id'] = crypto.randomUUID();
	config.headers['x-client-tzo'] = new Date().getTimezoneOffset();
	config.headers['x-client-tz-name'] =
		Intl.DateTimeFormat().resolvedOptions().timeZone;
	config.headers['x-client-id'] = CLIENT_ID;

	config.withCredentials = true;

	return config;
}

api.interceptors.request.use(AxiosConfig, (error) => Promise.reject(error));

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		// Don't retry if we're already on the login page
		if (window.location.pathname === '/login') {
			return Promise.reject(error);
		}

		// Handle CSRF token errors
		if (
			error.response?.status === 401 &&
			error.response?.data?.message?.includes('CSRF')
		) {
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
		if (
			error.response?.status === 401 &&
			error.response?.data?.message?.includes('expired token') &&
			!originalRequest._retry
		) {
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
