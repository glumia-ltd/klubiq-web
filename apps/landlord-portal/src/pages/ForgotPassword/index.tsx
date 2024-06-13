import { LoadingSubmitButton, SubmitButton } from '../../styles/button';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoginLayout from '../../Layouts/LoginLayout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useNavigate } from 'react-router-dom';
import { authEndpoints } from '../../helpers/endpoints';
import { api } from '../../api';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import successImage from '../../assets/images/circle-ok.svg';
import cancelImage from '../../assets/images/cancel.svg';

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
		<LoginLayout handleSubmit={formik.handleSubmit}>
			<Grid item xs={12} sm={6} md={6} lg={6} sx={{ width: '33rem' }}>
				<Grid
					container
					sx={{
						height: '100vh',
						justifyContent: 'center',
					}}
				>
					<Grid
						container
						sx={{
							width: '30rem',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								cursor: 'pointer',
								height: '2rem',
							}}
							onClick={routeToLogin}
						>
							<ArrowBackIosIcon />
							<Typography>Back to login</Typography>
						</Grid>
						<Grid
							container
							mt={-30}
							sx={{
								height: '25rem',
							}}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								sx={{
									textAlign: 'left',
								}}
							>
								<Typography variant='h3' sx={{ fontWeight: '700' }}>
									Forgot your password?
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								mb={5}
								sx={{
									textAlign: 'left',
									marginTop: '-30px',
									fontSize: '16px',
									color: '#1B1B1B',
									lineHeight: '22px',
								}}
							>
								<Typography
									sx={{
										fontSize: '16px',
										color: '#1B1B1B',
										lineHeight: '22px',
									}}
								>
									Don’t worry, happens to all of us. Enter your email below to
									recover your password.
								</Typography>
							</Grid>

							<Grid item sm={12} xs={12} lg={12}>
								<ControlledTextField
									name='email'
									label='Enter your registered email'
									type='email'
									placeholder='enter your email'
									formik={formik}
								/>
							</Grid>

							<Grid
								item
								sm={12}
								xs={12}
								lg={12}
								mt={-2}
								sx={{
									alignItems: 'center',
									textAlign: 'center',
								}}
							>
								{loading ? (
									<LoadingSubmitButton
										loading
										loadingPosition='center'
										variant='outlined'
									>
										Set Password
									</LoadingSubmitButton>
								) : (
									<SubmitButton type='submit'> Set Password </SubmitButton>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>

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

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
							}}
						>
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
						</div>

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

						<Button
							sx={{
								mt: 2,
								border: '1px solid #002147',
								borderRadius: '0.5rem',
								color: 'white',
								background: '#002147',
								padding: '6px 8px',
								height: '40px',
								width: '144px',
								fontSize: '18px',
								alignSelf: 'flex-end',
								'&:hover': {
									color: '#FFFFFF',
									background: '#6699CC',
									cursor: 'pointer',
									border: 'none',
								},
							}}
							onClick={handleClose}
						>
							Close
						</Button>
					</Box>
				</Modal>
			</Grid>
		</LoginLayout>
	);
};

export default ForgotPassword;
