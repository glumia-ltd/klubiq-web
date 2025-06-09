/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
import { get } from 'lodash';
import { consoleDebug } from '../helpers/debug-logger';
import { dashboardEndpoints, fileEndpoints } from '../helpers/endpoints';
const baseURL = 
	import.meta.env.VITE_NODE_ENV !== 'local'
		? `${import.meta.env.VITE_BASE_URL_DEV}/api`
		: '/api';
const api = axios.create({ baseURL, withCredentials: true });
const CLIENT_ID = 'kbq_lp_app-web';
const DOWNLOAD_ENDPOINTS =[
	dashboardEndpoints.downloadReport(),
]
const UPLOAD_ENDPOINTS = [
	fileEndpoints.uploadImages(),
]
// const skippedEndpoints = [
// 	authEndpoints.login(),
// 	authEndpoints.signup(),
// 	authEndpoints.emailVerification(),
// 	authEndpoints.refreshToken(),
// 	authEndpoints.resetPassword(),
// 	authEndpoints.sendResetPasswordEmail()
// ];

// const getSessionToken = () => {
// 	const storedSession = sessionStorage.getItem(
// 		firebaseResponseObject.sessionStorage || '',
// 	);
// 	return storedSession && JSON.parse(storedSession);
// };
// const accessToken = getSessionToken()?.stsTokenManager?.accessToken;
// request config
// const getCookie = (name: string) => {
// 	return document.cookie
// 		.split('; ')
// 		.find((row) => row.startsWith(name))
// 		?.split('=')[1];
// };

// const hasCookie = (name: string) => {
// 	return document.cookie
// 		.split('; ')
// 		.some((row) => row.startsWith(name));
// };

function AxiosConfig(config: any) {
	// const token = getSessionToken()?.stsTokenManager?.accessToken;
	config.headers = {};
	if (config.url && !UPLOAD_ENDPOINTS.includes(config.url as string)) {
		config.headers['content-type'] = 'application/json';
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
		try {
			const requestFn = response.config;
			// Check if we need to retry the request
			if (response?.data?.action === 'RETRY_REQUEST') {
				// Update the CSRF token in your headers
				// const {newCsrfToken} = response.data;
				// api.defaults.headers.common['x-csrf-token'] = newCsrfToken;
				// Retry the original request
				return api(requestFn);
			}
			return response;
		} catch (error) {
			console.log('error', error);
			return Promise.reject(error);
		}
	},
	async (error) => {
		
		const originalRequest = error.config;
		// Don't retry if we're already on the login page
		if (window.location.pathname === '/login') {
			return Promise.reject(error);
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
