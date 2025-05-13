import { LoadingSubmitButton, SubmitButton } from '../../../styles/button';
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginLayout from '../../../Layouts/LoginLayout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import { useNavigate } from 'react-router-dom';
import { authEndpoints } from '../../../helpers/endpoints';
import { api } from '../../../api';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import successImage from '../../../assets/images/circle-ok.svg';
import cancelImage from '../../../assets/images/cancel.svg';

const validationSchema = yup.object({
	email: yup.string().email().required('Please enter your email'),
});

type IValuesType = {
	email: string;
};

const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
		<Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} component="form" onSubmit={formik.handleSubmit}>
			<Stack 
				width="33rem" 
				height="100vh" 
				justifyContent="center" 
				alignItems="center"
			>
				<Stack width="30rem" spacing={3}>
					<Stack 
						direction="row" 
						alignItems="center" 
					>
						<Button variant='klubiqTextButton' startIcon={<ArrowBackIosIcon />}  onClick={routeToLogin}>Back to login</Button>
					</Stack>

					<Stack spacing={3}>
						<Typography variant='h3' sx={{ fontWeight: '700', textAlign: 'left' }}>
							Forgot your password?
						</Typography>

						<Typography variant='body2'>
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
								<SubmitButton type='submit'> Set Password </SubmitButton>
							)}
						</Box>
					</Stack>
				</Stack>

				<Modal
					open={openModal}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '90%',
							maxWidth: '788px',
							bgcolor: 'background.paper',
							borderRadius: '10px',
							p: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							textAlign: 'left',
							gap: '1rem',
						}}
					>
						<img
							onClick={handleClose}
							src={cancelImage}
							alt='cancel'
							style={{
								position: 'absolute',
								right: '20px',
								top: '20px',
								cursor: 'pointer',
								width: '23px',
								height: '23px',
							}}
						/>

						<Stack direction="row" alignItems="center" width="100%">
							<img
								src={successImage}
								alt='success'
								style={{
									width: '32px',
									height: '32px',
									marginRight: '1rem',
								}}
							/>

							<Typography variant='h3' sx={{ fontWeight: '700' }}>
								Password Reset Instructions Sent
							</Typography>
						</Stack>

						<Typography
							sx={{
								fontWeight: '400',
								fontSize: '18px',
								lineHeight: '28px',
								opacity: '0.75',
								color: '#1B1B1B',
							}}
						>
							Instructions to reset your password have been sent to the email
							provided. <br />
							If you did not receive it, please contact us at{' '}
							<a
								href='mailto:support@glumia.com'
								style={{
									color: '#2573C1',
									cursor: 'pointer',
									textDecoration: 'none',
								}}
							>
								support@glumia.com
							</a>
							.
						</Typography>

						<Button variant='klubiqTextButton' onClick={handleClose}>
							Close
						</Button>
					</Box>
				</Modal>
			</Stack>
		</Box>
	);
};

export default ForgotPassword;
