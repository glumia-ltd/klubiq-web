import { LoadingSubmitButton } from '../../../styles/button';
import {
	Box,
	Button,
	Stack,
	Typography,
	useTheme,
	useMediaQuery,
	Link,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import { useNavigate } from 'react-router-dom';
import { authEndpoints } from '../../../helpers/endpoints';
import { api } from '../../../api';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { CheckCircle } from '@mui/icons-material';
import { DynamicModal } from '@klubiq/ui-components';

const validationSchema = yup.object({
	email: yup.string().email().required('Please enter your email'),
});

type IValuesType = {
	email: string;
};

const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [loading, setLoading] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const onSubmit = async (values: IValuesType) => {
		setLoading(true);

		try {
			await api.post(authEndpoints.sendResetPasswordEmail(), values);

			setOpenModal(true);

			formik.resetForm();
		} catch (e) {
			dispatch(
				openSnackbar({
					message: 'An error occurred.',
					severity: 'error',
					isOpen: true,
				}),
			);
		} finally {
			setLoading(false);
		}
	};

	const routeToLogin = () => {
		navigate('/', { replace: true });
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit,
	});

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			component='form'
			onSubmit={formik.handleSubmit}
		>
			<Stack
				width={isMobile ? '100%' : '33rem'}
				height='100vh'
				justifyContent='center'
				alignItems='center'
			>
				<Stack width={isMobile ? '90%' : '30rem'} spacing={3}>
					<Stack direction='row' alignItems='center'>
						<Button
							variant='klubiqTextButton'
							startIcon={<ArrowBackIosIcon />}
							onClick={routeToLogin}
						>
							Back to login
						</Button>
					</Stack>

					<Stack spacing={3}>
						<Typography
							variant='h3'
							textAlign='left'
							fontSize={isMobile ? '1.25rem' : '1.75rem'}
						>
							Forgot your password?
						</Typography>

						<Typography
							variant='body2'
							fontSize={isMobile ? '1rem' : '1.25rem'}
						>
							Don't worry, happens to all of us. Enter your email below to
							recover your password.
						</Typography>

						<ControlledTextField
							name='email'
							label='Enter your registered email'
							type='email'
							placeholder='enter your email'
							formik={formik}
						/>

						<Box sx={{ textAlign: 'center' }}>
							{loading ? (
								<LoadingSubmitButton
									loading
									loadingPosition='center'
									variant='klubiqOutlinedButton'
								>
									Set Password
								</LoadingSubmitButton>
							) : (
								<Button fullWidth variant='klubiqMainButton' type='submit'>
									{' '}
									Set Password{' '}
								</Button>
							)}
						</Box>
					</Stack>
				</Stack>
				<DynamicModal
					open={openModal}
					onClose={handleClose}
					header={
						<Stack direction='row' spacing={2} alignItems='center' width='100%'>
							<CheckCircle color='success' fontSize='large' sx={{ fontSize: '3rem' }} />
							<Typography variant='h4'>
								Password Reset Instructions Sent
							</Typography>
						</Stack>
					}
					children={
						<Stack direction='column' mt={2} spacing={2} alignItems='center' width='100%'>
							<Typography variant='subtitle1'>
								Instructions to reset your password have been sent to the email
								provided. <br />
								If you did not receive it, please contact us at{' '}
								<Link href='mailto:support@glumia.com'>support@glumia.com</Link>.
							</Typography>
						</Stack>
					}
					borderRadius={2}
					contentAlign='center'
					maxWidth='xs'
					fullScreenOnMobile={false}
					sx={{
						maxHeight: '250px',
					}}
				/>
			</Stack>
		</Box>
	);
};

export default ForgotPassword;
