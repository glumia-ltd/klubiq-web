/* eslint-disable @typescript-eslint/no-explicit-any */
import { api as axiosInstance } from '../api';

export const customApiFunction = async (args: any) => {
	try {
		const result = await axiosInstance({
			method: args.method,
			url: args.url,
			data: args.body,
			params: args.params,
		});

		return { data: result.data.data };
	} catch (error) {
		return { error: (error as any).response.data } as any;
	}
};
