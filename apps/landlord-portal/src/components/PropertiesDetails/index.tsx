/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Card, IconButton, Box, Typography } from '@mui/material';
import ControlledSelect from '../ControlledComponents/ControlledSelect';
import ControlledTextField from '../ControlledComponents/ControlledTextField';
import PropertiesFormStyle from './PropertiesDetailsStyle';
import { useState, useRef, FC } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
	useGetPropertiesMetaDataQuery,
	useGetSignedUrlMutation,
} from '../../store/PropertyPageStore/propertyApiSlice';
import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { multiply, sum } from 'lodash';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import dayjs from 'dayjs';
import UploadWorker from '../../services/uploadWorker?worker';
import { deleteData } from '../../services/indexedDb';

const PropertiesDetails: FC<{ formik: any }> = ({ formik }) => {
	const [passportFiles, setPassportFiles] = useState<File[]>([]);
	const [, setTotalImageSize] = useState(0);
	const uploadFolder = 'properties';

	const dispatch = useDispatch();
	const { user } = useSelector(getAuthState);
	const formState = useSelector(getAddPropertyState);
	const [getSignedUrl] = useGetSignedUrlMutation();

	const {
		data: propertyMetaData,
		//, isLoading: isPropertyMetaDataLoading
	} = useGetPropertiesMetaDataQuery();

	const inputRef = useRef<HTMLInputElement | null>(null);
	const dispatchUploadMessage = (message: string) => {
		dispatch(
			openSnackbar({
				message,
				severity: 'info',
				isOpen: true,
			}),
		);
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = event?.target?.files;
		if (files) {
			const selectedFiles = Array.from(files);
			if (selectedFiles.length < 1) {
				dispatchUploadMessage('Please select a photo to upload.');
				return;
			}
			const currentImageSize = selectedFiles[0]?.size || 0;

			const fileArray = Array.from(files).map((file) =>
				URL.createObjectURL(file),
			);

			const uploadTimeStamp = dayjs(new Date()).unix();
			if (passportFiles.length === 0) {
				const body = {
					folder: uploadFolder,
					organization: user?.organization,
					organizationUuid: user?.organizationUuid,
					timestamp: uploadTimeStamp,
				};

				const { data } = await getSignedUrl(body);
				const storageLimit = multiply(data?.storageLimit, 1048576);

				if (sum([currentImageSize, data.storageUsed]) > storageLimit) {
					dispatchUploadMessage(`You have exceeded your plan's storage limit`);
					return;
				}
				deleteData('images', 'new-property');
				const worker = new UploadWorker();

				worker.postMessage({
					files: files,
					apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
					timestamp: uploadTimeStamp,
					signature: data.signature,
					folder: `${uploadFolder}/${user?.organization}`,
					cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
				});
				worker.onmessage = (event: MessageEvent) => {
					const { status, data, error } = event.data;

					if (status === 'success') {
						formik.setFieldValue('images', [...data.value]);
					} else if (status === 'error') {
						console.error('Upload error:', error);
					}
				};
			}

			formik.setFieldValue('propertyImages', [
				...formik.values.images,
				...fileArray,
			]);

			setPassportFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
			setTotalImageSize((prev) => prev + currentImageSize);
		}
	};

	const handleImageRemove = (index: number) => {
		const removedImageSize = passportFiles[index]?.size || 0;

		setTotalImageSize((prev) => prev - removedImageSize);

		const updatedImages = formik.values.images.filter(
			(_: any, i: number) => i !== index,
		);
		formik.setFieldValue('propertyImages', updatedImages);

		const updatedFiles = passportFiles.filter((_, i) => i !== index);

		setPassportFiles(updatedFiles);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<Grid container spacing={0}>
			<Grid
				container
				spacing={2}
				component='form'
				onSubmit={formik.handleSubmit}
			>
				<Grid item xs={12}>
					<Card sx={PropertiesFormStyle.card}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<ControlledSelect
									// color='#002147'
									required
									name='typeId'
									label='PROPERTY TYPE '
									placeholder='Property Type'
									type='text'
									formik={formik}
									value={formik?.values?.typeId}
									options={propertyMetaData?.types}
									inputprops={{
										sx: {
											height: '40px',
										},
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<ControlledTextField
									// color='#002147'
									required
									name='name'
									label='PROPERTY NAME'
									value={formik?.values?.name}
									formik={formik}
									inputprops={{
										sx: {
											height: '40px',
										},
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<ControlledTextField
									// color='#002147'
									name='description'
									label='DESCRIPTION'
									// placeholder='Describe your property'
									value={formik?.values?.description}
									formik={formik}
									type='text'
									multiline
									minRows={20}
									sxTwo={{
										'& .MuiOutlinedInput-root': {
											height: 'max-content',
										},
									}}
								/>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				<Grid item xs={12}>
					<Card sx={PropertiesFormStyle.cardTwo}>
						<Grid container spacing={2} sx={PropertiesFormStyle.cardContent}>
							<Grid item xs={12}>
								<Typography variant='h1' fontSize={'20px'}>
									COVER PHOTO
								</Typography>
							</Grid>
							{(formik.values.propertyImages || formState.propertyImages)?.map(
								(image: string, index: number) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
										key={index}
										position='relative'
									>
										<img
											src={image}
											alt={`property-${index}`}
											style={{
												width: '250px',
												height: '170px',
												objectFit: 'cover',
											}}
										/>
										<IconButton
											size='small'
											onClick={() => handleImageRemove(index)}
											style={{
												position: 'absolute',
												top: -10,
												right: -10,
											}}
										>
											<HighlightOffIcon />
										</IconButton>
									</Grid>
								),
							)}
							{formik.values.propertyImages.length === 0 && (
								<Grid item xs={12} sm={6} md={4} lg={3}>
									<Box
										component='label'
										htmlFor='upload-photo'
										display='flex'
										alignItems='center'
										justifyContent='center'
										width='250px'
										height='170px'
										border='1px dashed #ccc'
										borderRadius={'5px'}
										style={{ cursor: 'pointer' }}
									>
										<Box sx={PropertiesFormStyle.uploadBox}>
											<CloudUploadOutlinedIcon sx={PropertiesFormStyle.icon} />

											<Typography sx={PropertiesFormStyle.typo}>
												Upload a cover photo for your property
											</Typography>
										</Box>
										<input
											ref={inputRef}
											type='file'
											id='upload-photo'
											style={{ display: 'none' }}
											accept='image/*'
											onChange={handleFileChange}
											readOnly={formik.values.propertyImages.length > 0}
										/>
									</Box>
								</Grid>
							)}
						</Grid>
					</Card>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PropertiesDetails;
