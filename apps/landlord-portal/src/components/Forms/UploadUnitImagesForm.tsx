import {
	DynamicTanstackFormProps,
	FileUpload,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';

import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { FC, useState } from 'react';

import { z } from 'zod';
import {
	Box,
} from '@mui/material';
import {
	useEditUnitMutation,
} from '../../store/PropertyPageStore/propertyApiSlice';
import { UnitImageType, UnitType } from '../../shared/type';
import { useDispatch, useSelector } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';
import { useDeleteFileMutation, useUploadImagesMutation } from '../../store/GlobalStore/globalApiSlice';
import { consoleError, consoleInfo } from '../../helpers/debug-logger';
import { getAuthState } from '../../store/AuthStore/AuthSlice';

interface UnitFormProps {
	propertyId: string;
	unit: UnitType;
	onClose?: () => void;
}
const IMAGE_SIZE_LIMIT = 1024 * 1024 * 10; // 10MB

const UploadUnitImagesForm: FC<UnitFormProps> = ({
	propertyId,
	unit,
	onClose,
}) => {
	const { user } = useSelector(getAuthState);
	const [uploadImages] = useUploadImagesMutation();
	const [deleteFile] = useDeleteFileMutation();
	const [unitData, setUnitData] = useState<UnitType>(unit);
	const [editUnit] = useEditUnitMutation();
	const dispatch = useDispatch();


	const getUnitFields = () => {
		const unitFields: FormFieldV1[] = [
			{
				name: 'images',
				type: 'file',
				label: 'UNIT IMAGES',
				validation: {
					schema: z.any().optional(),
				},
				fileConfig: {
					subtitle: 'Add or delete images of this unit',
					caption: 'Drag and drop or click to upload images of this unit',
					accept: 'image/*',
					multiple: true,
					maxSize: IMAGE_SIZE_LIMIT,
					maxFavorites: 1,
					onUpload: uploadUnitImages,
					onDelete: deleteUnitImage,
					uploadButtonText: 'Upload Images',
					tooltipMessages: {
						upload: 'Upload unit images',
						sizeLimit: `Maximum file size is ${IMAGE_SIZE_LIMIT / 1024 / 1024}MB`,
						favorite: 'Mark as cover photo',
						unfavorite: 'Unmark as cover photo',
						delete: 'Delete image',
						maxFavoritesReached: 'You can only have one cover photo',
					},
				},
				customComponent: (fieldApi, fieldConfig, form) => (
					<FileUpload
						value={fieldApi.state.value}
						onChange={fieldApi.handleChange}
						onBlur={fieldApi.handleBlur}
						error={!!fieldApi.state.meta.errors[0]}
						helperText={fieldApi.state.meta.errors[0]}
						form={form}
						fieldName="images"
						{...fieldConfig.fileConfig}
					/>
				),
			},
		];
		return [
			...unitFields,
		];
	};
	const uploadUnitImages = async (formData: FormData) => {
		if(user?.organizationUuid){
			formData.append('organizationUuid', user?.organizationUuid);
		}
		if(user?.organization){
			formData.append('organization', user?.organization);
		}
		formData.append('rootFolder', 'properties');
		return await uploadImages(formData).unwrap();
	}
	const deleteUnitImage = async (fileId: string) => {
		try {
			const response = await deleteFile({ publicId: fileId }).unwrap();
			consoleInfo('Delete property image response', response);
			return true;
		} catch (error) {
			consoleError('Error deleting unit image', error);
			throw error;
		}
	}
	const unitImages = (unit: UnitType | undefined) => {
		return unit?.images?.map((image: UnitImageType) => ({
			publicId: image.externalId,
			url: image.url,
			fileName: image.fileName,
			fileSize: image.fileSize,
			isMain: image.isMain,
		}));
	}
	const initialValues = {
		images: unitImages(unit),
	};

	const unitFormFields: FormFieldV1[] = getUnitFields();

	const onSubmit = async (values: any) => {
		try {
			if(values.images.length > 0){
				const body = values.images.map((image: any) => {
					return {
						externalId: image.externalId,
						url: image.url,
						fileName: image.fileName,
						fileSize: image.fileSize,
						isMain: image.isMain,
					}
				});
				const response = await editUnit({
					propertyUuid: propertyId,
					unitId: unitData.id!,
					data: {
						images: body,
					},
				}).unwrap();
				dispatch(
					openSnackbar({
						message: screenMessages.unit.uploadImages.success,
						severity: 'success',
						isOpen: true,
						duration: 5000,
					}),
				);
				onClose?.();
				return response;
			}
			throw new Error('No images uploaded');
		} catch (error: unknown) {
			const errorMessage =
				(error as any)?.message || 
				(error instanceof Error ? error.message : screenMessages.unit.uploadImages.error);
			throw new Error(errorMessage);
		}
	};
	const onReset = () => {
		setUnitData(unit);
		onClose?.();
	};

	const unitFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Save',
		resetButtonText: 'Cancel',
		enableReset: true,
		fields: unitFormFields,
		initialValues: unitData || initialValues,
		onSubmit,
		onReset,
		showBackdrop: true,
		backdropText: 'Uploading unit images...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '80%'}}>
			<KlubiqFormV1 {...unitFormConfig} />
		</Box>
	);
};

export default UploadUnitImagesForm;
