import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Box, Button } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState } from 'react';

const Maintenance = () => {
	const [passportFiles, setPassportFiles] = useState<File[]>([]);

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

	return (
		<FormLayout Header='MAINTENANCE INFORMATION' sx={style.card}>
			<Grid container spacing={1} sx={style.content}>
				<Grid item xs={6}>
					<ControlledSelect
						name='category'
						label='Issue Category'
						type='text'
						formik={formik}
						options={property}
					/>
				</Grid>
				<Grid item xs={6}>
					<ControlledTextField
						name='unit'
						label='Unit'
						formik={formik}
						type='text'
					/>
				</Grid>

				<Grid xs={12}>
					<ControlledTextField
						name='title'
						label='Issue Title'
						formik={formik}
						type='text'
					/>
				</Grid>
				<Grid item xs={12}>
					<ControlledTextField
						color='#002147'
						name='description'
						label='Issue Description'
						formik={formik}
						type='text'
						multiline
						minRows={12}
						placeholder='Describe maintenace isssue'
						sxTwo={{
							'& .MuiOutlinedInput-root': {
								height: 'max-content',
							},
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Box sx={style.box}>
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
							<Box sx={style.uploadBox}>
								<CloudUploadOutlinedIcon sx={style.icon} />

								<Typography sx={style.typo}>
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
					</Box>
				</Grid>
				<Grid item xs={12} sx={style.buttonGrid}>
					<Button sx={style.plainButton}>Cancel </Button>
					<Button type='submit' sx={style.blueButton}>
						Create Request{' '}
					</Button>
				</Grid>
				<Grid item xs={6}></Grid>
			</Grid>
		</FormLayout>
	);
};

export default Maintenance;
