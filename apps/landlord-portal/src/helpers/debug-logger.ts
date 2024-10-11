const nonProdEnv = ['development', 'test', 'dev', 'local', 'qa'];
const environment = import.meta.env.VITE_NODE_ENV;
export const consoleDebug = (
	message?: unknown,
	...optionalParams: unknown[]
) => {
	if (nonProdEnv.includes(environment)) {
		console.debug(message, ...optionalParams);
	}
};

export const consoleError = (
	message?: unknown,
	...optionalParams: unknown[]
) => {
	if (nonProdEnv.includes(environment)) {
		console.error(message, ...optionalParams);
	}
};

export const consoleInfo = (
	message?: unknown,
	...optionalParams: unknown[]
) => {
	if (nonProdEnv.includes(environment)) {
		console.info(message, ...optionalParams);
	}
};

export const consoleLog = (message?: unknown, ...optionalParams: unknown[]) => {
	if (nonProdEnv.includes(environment)) {
		console.log(message, ...optionalParams);
	}
};

export const consoleTabulate = (optionalParams: unknown) => {
	if (nonProdEnv.includes(environment)) {
		console.table(optionalParams);
	}
};

export const consoleWarn = (
	message?: unknown,
	...optionalParams: unknown[]
) => {
	if (nonProdEnv.includes(environment)) {
		console.warn(message, ...optionalParams);
	}
};
