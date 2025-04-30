import {
	Grid,
	Typography,
	Box,
	Button,
	Skeleton,
	Avatar,
	IconButton,
} from '@mui/material';
import { styles } from './styles';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import AddTenantModal from '../../Modals/AddTenantModal';
import LeaseFormLayout from '../../Layouts/LeaseFormLayout';
import { consoleDebug } from '../../helpers/debug-logger';

const TenantProfile = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 200);
	}, []);
	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		lastName: yup.string().required('This field is required'),
		notification: yup.string().required('Option is required'),
		name: yup.string().required('Name is required'),
		image: yup.mixed().required('Image is required'),
		email: yup
			.string()
			.email('Invalid email format')
			.required('Email is required'),
	});

	type formValues = {
		firstName: string;
		lastName: string;
		email: string;
		name: string;
		notification: string;
		image: string;
	};

	const onSubmit = async (values: formValues) => {
		consoleDebug(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			name: '',
			image: '',
			notification: '',
		},
		validationSchema,
		onSubmit,
	});
	const option = [
		{ value: 'one', label: 'Email' },
		{ value: 'two', label: 'Text' },
		{ value: 'three', label: 'Email & Text' },
	];

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result as string;
				formik.setFieldValue('image', base64Image);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<LeaseFormLayout
			Header='LandMark Estate > Single unit'
			sx={styles.tenantCard}
		>
			{loading ? (
				<Grid container spacing={1} sx={styles.content}>
					<Grid item xs={12}>
						<Skeleton variant='text' height={15} width='100%' />
						<Skeleton variant='text' height={15} width='100%' />
					</Grid>
					<Grid item xs={6}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='60%' />
					</Grid>
					<Grid item xs={12} sx={styles.boxTwo}>
						<Box sx={styles.boxThree}>
							<Skeleton variant='circular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='80px' />
						</Box>
						<Box sx={styles.boxThree}>
							<Skeleton variant='circular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='80px' />
						</Box>
						<Box sx={styles.boxThree}>
							<Skeleton variant='circular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='80px' />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={styles.box}>
						<Box>
							<Skeleton variant='rectangular' height={30} width='150px' />
						</Box>
						<Box>
							<Skeleton variant='rectangular' height={30} width='150px' />
						</Box>
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					spacing={0}
					sx={styles.content}
					component='form'
					onSubmit={formik.handleSubmit}
				>
					<Grid item xs={12} sx={styles.infobox}>
						<Box sx={{ position: 'relative' }}>
							<Avatar sx={styles.AvatarStyle} src={formik.values.image || ''}>
								{!formik.values.image && <PhotoCamera fontSize='large' />}
							</Avatar>

							<IconButton component='label' sx={styles.IconStyle}>
								<PhotoCamera />
								<input
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									hidden
								/>
							</IconButton>
						</Box>

						<Box>
							<Typography variant='h6' sx={styles.imageText}>
								Aisha Rohni
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='firstName'
							label='First Name'
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='lastName'
							label='Last Name'
							formik={formik}
							type='text'
						/>
					</Grid>

					<Grid item xs={6}>
						<ControlledTextField
							name='email'
							label='Email '
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledTextField
							name='mobile'
							label='Mobile'
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledSelect
							name='notification'
							label='Notification Method'
							placeholder='Notification Method'
							type='text'
							formik={formik}
							options={option}
						/>
					</Grid>
					<Grid item xs={12} sx={styles.buttonGrid}>
						<Button sx={styles.plainButton}>Cancel </Button>
						<Button type='submit' sx={styles.blueButton}>
							Save{' '}
						</Button>
					</Grid>
				</Grid>
			)}
			{/* {isModalOpen && (
				<AddTenantModal
					open={isModalOpen}
					onClose={() => {
						setOpenModal(false);
					}}
				/>
			)} */}
		</LeaseFormLayout>
	);
};

export default TenantProfile;
