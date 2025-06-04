import { createApi } from '@reduxjs/toolkit/query/react';
import { publicEndpoints, fileEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import {
	FileUploadRequest,
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
		uploadImages: builder.mutation<FileUploadResponse[], FileUploadRequest>({
			query: ({ files, organizationUuid, organizationName, rootFolder }) => {
				const formData = new FormData();
				files.forEach((file) => formData.append('files', file)); // field name matches NestJS controller
				formData.append('organizationUuid', organizationUuid);
				formData.append('organizationName', organizationName);
				formData.append('rootFolder', rootFolder);
				return {
					url: fileEndpoints.uploadImages(),
					method: 'POST',
					body: formData,
					formData: true,
				};
			},
		}),
		deleteFile: builder.mutation<void, string>({
			query: (fileId) => ({
				url: fileEndpoints.deleteFile(fileId),
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetRolesQuery,
	useUploadImagesMutation,
	useDeleteFileMutation,
} = globalApiSlice;
