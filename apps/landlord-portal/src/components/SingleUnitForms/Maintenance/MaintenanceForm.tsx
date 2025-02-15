import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Box, Button, Skeleton } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState, useEffect } from 'react';
import { consoleLog } from '../../../helpers/debug-logger';

const Maintenance = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	// const [passportFiles, setPassportFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const validationSchema = yup.object({
		title: yup.string().required('This field is required'),
		unit: yup.string().required('This field is required'),
		category: yup.string().required('Select an option'),
		description: yup.string().required('This field is required'),
		photo: yup
			.array()
			.min(1, 'You need to upload at least one image')
			.max(4, 'You can upload a maximum of 4 images')
			.required('Images are required'),
	});

	type formValues = {
		category: string;
		unit: string;
		title: string;
		description: string;
		photo: string[];
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
		consoleLog(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			category: '',
			unit: '',
			title: '',
			description: '',
			photo: [],
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
			formik.setFieldValue('photo', [...formik.values.photo, ...fileArray]);
			//setPassportFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
		}
	};
	useEffect(() => {
		setTimeout(() => setLoading(false), 20000);
	}, []);
	return (
		<FormLayout Header='MAINTENANCE INFORMATION' sx={style.card}>
			{loading ? (
				<Grid container spacing={1} sx={style.content}>
					<Grid item xs={6}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={25} width='50%' />

						<Skeleton variant='rectangular' height={230} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={25} width='50%' />

						<Skeleton variant='rectangular' height={230} width='100%' />
					</Grid>

					<Grid item xs={12} sx={style.buttonGrid}>
						<Skeleton variant='rectangular' height={65} width='30%' />
						<Skeleton variant='rectangular' height={65} width='20%' />
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					spacing={1}
					sx={style.content}
					component='form'
					onSubmit={formik.handleSubmit}
				>
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
			)}
		</FormLayout>
	);
};

export default Maintenance;
