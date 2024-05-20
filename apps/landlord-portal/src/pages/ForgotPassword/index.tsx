import { Button, Grid, Typography } from '@mui/material';
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
import LoadingButton from '@mui/lab/LoadingButton';

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

	const onSubmit = async (values: IValuesType) => {
		setLoading(true);

		try {
			await api.post(authEndpoints.resetPassword(), values);

			dispatch(
				openSnackbar({
					message: 'We have sent you an email.',
					severity: 'info',
					isOpen: true,
				}),
			);
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
									<LoadingButton
										loading
										loadingPosition='center'
										variant='outlined'
										sx={{
											border: '1px solid #002147',
											borderRadius: '0.5rem',
											color: 'white',
											height: '3.1rem',
											width: '100%',
										}}
									/>
								) : (
									<Button
										type='submit'
										sx={{
											border: '1px solid #002147',
											borderRadius: '0.5rem',
											fontSize: '18px',
											color: 'white',
											background: '#002147',
											height: '3.1rem',
											width: '100%',
											'&:hover': {
												color: '#FFFFFF',
												background: '#6699CC',
												cursor: 'pointer',
											},
										}}
									>
										Set Password
									</Button>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</LoginLayout>
	);
};

export default ForgotPassword;
