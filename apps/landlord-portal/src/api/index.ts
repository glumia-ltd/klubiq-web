/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { authEndpoints } from '../helpers/endpoints';
import { firebaseResponseObject } from '../helpers/FirebaseResponse';

const baseURL =
	import.meta.env.VITE_NODE_ENV !== 'local'
		? `${import.meta.env.VITE_BASE_URL_DEV}/api`
		: '/api';
const api = axios.create({
	baseURL:
		import.meta.env.VITE_NODE_ENV !== 'local'
			? `${import.meta.env.VITE_BASE_URL_DEV}/api`
			: '/api',
});

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
				const refreshToken = getSessionToken()?.stsTokenManager.refreshToken;
				const {
					data: {
						data: {
							access_token,
							// refresh_token
						},
					},
				} = await axios.post(
					`https://devapi.klubiq.com/api/${authEndpoints.refreshToken()}`,
					{
						refreshToken,
					},
				);

				// if (access_token && refresh_token) {
				// 	localStorage.setItem('token', access_token);
				// 	localStorage.setItem('refreshToken', refresh_token);
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
