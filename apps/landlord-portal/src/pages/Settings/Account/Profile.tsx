import {
	Box,
	Typography,
	Button,
	Stack,
	InputAdornment,
	Avatar,
	IconButton,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ControlledPasswordField from '../../../components/ControlledComponents/ControlledPasswordField';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import { styles } from './styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Profile = () => {
	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		companyName: yup.string().required('This field is required'),
		lastName: yup.string().required('This field is required'),
		currentPassword: yup.string().required('Please enter your password'),
		email: yup.string().email().required('Please enter your email'),
		newPassword: yup
			.string()
			.required('Your new password must be more than 8 characters.'),
		newPasswordConfirm: yup
			.string()
			.required('Your new password must be more than 8 characters.'),
	});

	type IValuesType = {
		firstName: string;
		companyName: string;
		lastName: string;
		newPasswordConfirm: string;
		currentPassword: string;
		newPassword: string;
		phoneNumber: string;
		email: string;
	};

	const onSubmit = async (values: IValuesType) => {
		console.log(values, 'val');
	};
	const formik = useFormik({
		initialValues: {
			firstName: '',
			companyName: '',
			lastName: '',
			newPasswordConfirm: '',
			newPassword: '',
			currentPassword: '',
			email: '',
			phoneNumber: '',
		},

		validationSchema,
		onSubmit,
	});

	return (
		<Stack spacing={2} width='100%'>
			<Stack direction={'column'} mb={3} sx={styles.contentStyle}>
				<Stack direction='row' spacing={2} mt={2} sx={styles.headContainer}>
					<Box sx={styles.imageDiv}>
						<Box sx={{ position: 'relative' }}>
							<Avatar
								sx={styles.AvatarStyle}
								src={formik.values.currentPassword || ''}
							>
								{!formik.values && <PhotoCamera fontSize='large' />}
							</Avatar>

							<IconButton component='label' sx={styles.IconStyle}>
								<PhotoCamera />
								<input
									type='file'
									accept='image/*'
									// onChange={handleImageChange}
									hidden
								/>
							</IconButton>
						</Box>
						<Box>
							<Typography variant='h6'>Profile Photo</Typography>
							<Typography variant='body2' color='textSecondary'>
								PNG, JPEG under 15MB
							</Typography>
						</Box>
					</Box>
					<Box sx={styles.buttonDiv}>
						<Button variant='contained' sx={{ width: '100%' }}>
							Change Photo
						</Button>
						<Button variant='outlined' color='error' sx={{ width: '100%' }}>
							Delete Photo
						</Button>
					</Box>
				</Stack>
				<Stack direction={'row'} spacing={2}>
					<ControlledTextField
						name='firstName'
						label='First Name'
						formik={formik}
						type='text'
						sx={{ width: '100%' }}
					/>
					<ControlledTextField
						name='lastName'
						label='Last Name'
						formik={formik}
						type='text'
						sx={{ width: '100%' }}
					/>
				</Stack>
			</Stack>
			{/* Contact Info Section */}
			<Stack sx={styles.contentStyle} direction={'column'}>
				<Typography variant='h6' sx={styles.headerText}>
					Contact Info
				</Typography>
				<Typography
					variant='body2'
					color='textSecondary'
					gutterBottom
					sx={styles.subHeaderText}
				>
					Manage your account's email address
				</Typography>
				<ControlledTextField
					name='email'
					label='Email '
					placeholder='Enter your email address'
					formik={formik}
					type='email'
					autoComplete='email'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<MailOutlineIcon />
							</InputAdornment>
						),
					}}
				/>
				<ControlledTextField
					name='phoneNumber'
					label='Phone Number'
					formik={formik}
					type='text'
				/>
			</Stack>
			{/* Password Section */}
			<Stack direction={'column'} sx={styles.contentStyle}>
				<Typography variant='h6' sx={styles.headerText}>
					Password
				</Typography>
				<Typography
					variant='body2'
					color='textSecondary'
					gutterBottom
					sx={styles.subHeaderText}
				>
					Please enter your current password to change your password.
				</Typography>
				<Stack spacing={2} direction={'column'}>
					<ControlledPasswordField
						name='currentPassword'
						label='Current password'
						type='password'
						placeholder='Current password'
						formik={formik}
						autoComplete='new-password'
					/>
					<ControlledPasswordField
						name='newPassword'
						label='New password'
						type='password'
						placeholder='New password'
						formik={formik}
						autoComplete='new-password'
					/>
					<ControlledPasswordField
						name='newPasswordConfirm'
						label=' Confirm New password'
						type='password'
						placeholder='Confirm New password'
						formik={formik}
						autoComplete='new-password'
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Profile;
