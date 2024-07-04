import { Grid, Card, IconButton, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import PropertiesFormStyle from './PropertiesFormStyle';
import { useState, useEffect } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// import { Delete } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const validationSchema = yup.object({
	propertyName: yup.string().required('Please enter the property name'),
	description: yup.string().required('This field is required'),
	propertyType: yup.string().required('Select an option'),
	propertyImage: yup
		.array()
		.min(1, 'You need to upload at least one image')
		.max(4, 'You can upload a maximum of 4 images')
		.required('Images are required'),
});

type formValues = {
	propertyName: string;
	description: string;
	propertyType: string;
	propertyImage: string[];
};

const PropertiesFormLayout = () => {
	const [passportFiles, setPassportFiles] = useState<File[]>([]);

	const property = [
		{
			value: 'A',
			label: 'A',
		},
		{
			value: 'B',
			label: 'B',
		},
	];

	const onSubmit = async (values: formValues) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			description: '',
			propertyName: '',
			propertyType: '',
			propertyImage: [],
		},
		validationSchema,
		onSubmit,
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const fileArray = Array.from(files).map((file) =>
				URL.createObjectURL(file),
			);
			formik.setFieldValue('propertyImage', [
				...formik.values.propertyImage,
				...fileArray,
			]);
			setPassportFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
		}
	};

	const handleImageRemove = (index: number) => {
		const updatedImages = formik.values.propertyImage.filter(
			(_, i) => i !== index,
		);
		formik.setFieldValue('propertyImage', updatedImages);

		const updatedFiles = passportFiles.filter((_, i) => i !== index);
		setPassportFiles(updatedFiles);
	};

	useEffect(() => {
		// Revoke URLs when the component unmounts
		return () => {
			formik.values.propertyImage.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [formik.values.propertyImage]);

	return (
		<Grid container spacing={2} component='form' onSubmit={formik.handleSubmit}>
			<Grid item xs={12}>
				<Card sx={PropertiesFormStyle.card}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<ControlledSelect
								name='propertyType'
								label='PROPERTY TYPE'
								type='text'
								formik={formik}
								options={property}
								inputProps={{
									sx: {
										height: '40px',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<ControlledTextField
								name='propertyName'
								label='PROPERTY NAME'
								formik={formik}
								inputProps={{
									sx: {
										height: '40px',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<ControlledTextField
								name='description'
								label='DESCRIPTION'
								formik={formik}
								multiline
								type='text'
								rows={8}
							/>
						</Grid>
					</Grid>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card sx={PropertiesFormStyle.cardTwo}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' fontSize={'20px'}>
								PROPERTY IMAGE ({formik.values.propertyImage.length}/4)
							</Typography>
						</Grid>
						{formik.values.propertyImage.map((image: string, index: number) => (
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
										backgroundColor: 'white',
									}}
								>
									<HighlightOffIcon />
								</IconButton>
							</Grid>
						))}
						{formik.values.propertyImage.length < 4 && (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Box
									component='label'
									htmlFor='upload-photo'
									display='flex'
									alignItems='center'
									// justifyContent='center'
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
										type='file'
										id='upload-photo'
										style={{ display: 'none' }}
										multiple
										accept='image/png, image/jpeg'
										onChange={handleFileChange}
									/>
								</Box>
							</Grid>
						)}
					</Grid>
				</Card>
			</Grid>
		</Grid>
	);
};

export default PropertiesFormLayout;
