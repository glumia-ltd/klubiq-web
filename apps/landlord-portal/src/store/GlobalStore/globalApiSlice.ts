import { createApi } from '@reduxjs/toolkit/query/react';
import { publicEndpoints, fileEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import {
	FileUploadResponse,
	GenericType,
} from './global.types';

export const globalApiSlice = createApi({
	reducerPath: 'globalApiSlice',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getRoles: builder.query<GenericType[], void>({
			query: () => ({
				url: publicEndpoints.getRoles(),
				method: 'GET',
			}),
		}),
		uploadImages: builder.mutation<FileUploadResponse[], FormData>({
			query: (formData) => {
				return {
					url: fileEndpoints.uploadImages(),
					method: 'POST',
					body: formData,
					formData: true,
				};
			},
		}),
		deleteFile: builder.mutation<void, { publicId: string }>({
			query: (file) => ({
				url: fileEndpoints.deleteFile(),
				method: 'DELETE',
				body: {
					publicId: file.publicId,
				},
			}),
		}),
	}),
});

export const {
	useGetRolesQuery,
	useUploadImagesMutation,
	useDeleteFileMutation,
} = globalApiSlice;
