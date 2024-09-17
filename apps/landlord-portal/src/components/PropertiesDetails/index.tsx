import { Grid, Card, IconButton, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../ControlledComponents/ControlledSelect';
import ControlledTextField from '../ControlledComponents/ControlledTextField';
import PropertiesFormStyle from './PropertiesDetailsStyle';
import { useState, useEffect, useRef, FC } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import {
	getAddPropertyState,
	saveAddPropertyFormDetail,
} from '../../store/AddPropertyStore/AddPropertySlice';
import { useDispatch, useSelector } from 'react-redux';
// const validationSchema = yup.object({
// 	name: yup.string().required('Please enter the property name'),
// 	// description: yup.string().required('This field is required'),
// 	typeId: yup.string().required('Select an option'),
// 	images: yup
// 		.array()
// 		.min(1, 'You need to upload at least one image')
// 		.max(4, 'You can upload a maximum of 4 images')
// 		.required('Images are required'),
// });

type formValues = {
	name: string;
	description: string;
	typeId: number | string;
	images: string[];
};

const PropertiesDetails: FC<{ formik: any }> = ({ formik }) => {
	const [passportFiles, setPassportFiles] = useState<File[]>([]);

	const formState = useSelector(getAddPropertyState);

	const { data: propertyMetaData, isLoading: isPropertyMetaDataLoading } =
		useGetPropertiesMetaDataQuery();

	// useEffect(() => {
	// 	Object.keys(formik?.values)?.forEach((key) => {
	// 		formik.setFieldValue(key, formState[key]);
	// 	});
	// }, []);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files) {
			const fileArray = Array.from(files).map((file) =>
				URL.createObjectURL(file),
			);
			formik.setFieldValue('images', [...formik.values.images, ...fileArray]);
			setPassportFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
		}
	};

	const handleImageRemove = (index: number) => {
		const updatedImages = formik.values.images.filter(
			(_: any, i: number) => i !== index,
		);
		formik.setFieldValue('images', updatedImages);

		const updatedFiles = passportFiles.filter((_, i) => i !== index);

		setPassportFiles(updatedFiles);

		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	useEffect(() => {
		// Revoke URLs when the component unmounts
		return () => {
			formik.values?.images?.forEach((url: string) => URL.revokeObjectURL(url));
		};
	}, [formik.values?.images]);

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
									name='typeId'
									label='PROPERTY TYPE'
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
								<Typography
									variant='h1'
									fontSize={'20px'}
									// color='#002147'
								>
									PROPERTY IMAGE
								</Typography>
							</Grid>
							{(formik.values.images || formState.images)?.map(
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
												// backgroundColor: 'white',
											}}
										>
											<HighlightOffIcon />
										</IconButton>
									</Grid>
								),
							)}
							{
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
										style={{ cursor: 'pointer' }}
									>
										<Box sx={PropertiesFormStyle.uploadBox}>
											<CloudUploadOutlinedIcon sx={PropertiesFormStyle.icon} />

											<Typography sx={PropertiesFormStyle.typo}>
												Upload or drag photo here
											</Typography>
										</Box>

										<input
											ref={inputRef}
											type='file'
											id='upload-photo'
											style={{ display: 'none' }}
											multiple
											accept='image/*'
											onChange={handleFileChange}
										/>
									</Box>
								</Grid>
							}
						</Grid>
					</Card>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PropertiesDetails;
