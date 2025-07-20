import {
	DynamicTanstackFormProps,
	FileUpload,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';

import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { MEASUREMENTS } from '../../helpers/utils';
import { FC, useEffect, useState } from 'react';

import FormSkeleton from '../skeletons/FormSkeleton';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import {
	Box,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { AmenitiesDialog } from '../CustomFormComponents/AmenitiesDialog';
import {
	useAddUnitMutation,
	useEditUnitMutation,
	useGetPropertiesMetaDataQuery,
} from '../../store/PropertyPageStore/propertyApiSlice';
import { CategoryMetaDataType, UnitImageType, UnitType } from '../../shared/type';
import { useDispatch } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';

interface UnitFormProps {
	propertyId: string;
	unit?: UnitType;
	onClose?: () => void;
}
const IMAGE_SIZE_LIMIT = 1024 * 1024 * 10; // 10MB

const UploadUnitImagesForm: FC<UnitFormProps> = ({
	propertyId,
	unit,
	onClose,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [unitData, setUnitData] = useState<UnitType | undefined>(undefined);
	const [editUnit] = useEditUnitMutation();
	const dispatch = useDispatch();


	useEffect(() => {
		if (unit) {
			setUnitData(unit);
		} else {
			setUnitData(undefined);
		}
	}, [unit]);

	const getUnitFields = () => {
		const unitFields: FormFieldV1[] = [
			{
				name: 'images',
				type: 'file',
				label: '',
				validation: {
					schema: z.any().optional(),
				},
				fileConfig: {
					subtitle: 'UNIT IMAGES',
					caption: 'Drag and drop or click to upload images of this unit',
					accept: 'image/*',
					multiple: true,
					maxSize: IMAGE_SIZE_LIMIT,
					onUpload: async (formData) => {
						console.log('formData', formData);
						return [];
					},
					onDelete: async (publicId) => {
						console.log('publicId', publicId);
						return true;
					},
					uploadButtonText: 'Upload Images',
					tooltipMessages: {
						upload: 'Upload unit images',
						sizeLimit: `Maximum file size is ${IMAGE_SIZE_LIMIT / 1024 / 1024}MB`,
						delete: 'Delete image',
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
			console.log('values', values);
		} catch (error) {
			const errorMessage = (error as any)?.message;
			dispatch(
				openSnackbar({
					message: errorMessage,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
			throw error;
		}
	};
	const onReset = () => {
		setUnitData(unit);
		onClose?.();
	};

	const unitFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		// submitButtonText: unitData ? 'Update Unit' : 'Add Unit',
		// resetButtonText: 'Cancel',
		// enableReset: true,
		fields: unitFormFields,
		initialValues: unitData || initialValues,
		onSubmit,
		// onReset,
		showBackdrop: true,
		backdropText: 'Uploading unit images...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
		hideSubmitButton: true,
		
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '80%'}}>
			<KlubiqFormV1 {...unitFormConfig} />
		</Box>
	);
};

export default UploadUnitImagesForm;
