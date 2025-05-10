/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { api as axiosInstance } from '../api';

export const customApiFunction = async (args: any) => {
	try {
		const result = await axiosInstance({
			method: args.method,
			url: args.url,
			data: args.body,
			params: args.params,
		});

		 // Check if result.data exists and has the expected structure
		 if (result.data && result.data.data !== undefined) {
			return { data: result.data.data };
		  }
		  
		  // If result.data exists but doesn't have the expected structure, return it as is
		  if (result.data) {
			return { data: result.data };
		  }
	  
		  // If no data, return empty object
		  return { data: {} };
	} catch (error: any) {
		return {
			error: {
			  status: error.response?.status,
			  data: (error as any).response?.data,
			} as FetchBaseQueryError,
		  };
		// return { error: (error as any).response?.data } as any;
	}
};
