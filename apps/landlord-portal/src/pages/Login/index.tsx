/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../Layouts/LoginLayout';
import { SubmitButton, LoadingSubmitButton } from '../../styles/button';
import { BoldTextLink } from '../../styles/links';
import {
	// Checkbox,
	// FormControlLabel,
	// FormGroup,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import OTPInput from '../../components/ControlledComponents/OTPInputField';
import {
	getMultiFactorResolver,
	MultiFactorError,
	MultiFactorResolver,
	signInWithEmailAndPassword,
	TotpMultiFactorGenerator,
} from 'firebase/auth';
import { useState } from 'react';
import { firebaseResponseObject } from '../../helpers/FirebaseResponse';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
// import { saveUser } from '../../store/AuthStore/AuthSlice';

const validationSchema = yup.object({
	password: yup.string().required('Please enter your password'),
	email: yup.string().email().required('Please enter your email'),
});
type IValuesType = {
	password: string;
	email: string;
};

const Login = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [verifying, setIsVerifying] = useState<boolean>(false);
	const [mfaResolver, setMFAResolver] = useState<MultiFactorResolver | null>(
		null,
	);
	const [is2faRequired, set2FARequired] = useState<boolean>(false);
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const dispatch = useDispatch();

	const setupMFA = searchParams.get('enroll2fa');
	const verifyOTP = async () => {
		setIsVerifying(true);
		if (otp.length != 6) {
			setOtpError('Invalid code');
		}
		if (
			mfaResolver?.hints[0]?.factorId === TotpMultiFactorGenerator.FACTOR_ID
		) {
			const multiFactorAssertion = TotpMultiFactorGenerator.assertionForSignIn(
				mfaResolver.hints[0].uid,
				otp,
			);
			try {
				await mfaResolver.resolveSignIn(multiFactorAssertion);
				setOtpError('');
				navigate('/dashboard', { replace: true });
			} catch (error: any) {
				dispatch(
					openSnackbar({
						message: error.message || 'An error occurred',
						severity: 'error',
						isOpen: true,
					}),
				);
				set2FARequired(false);
			}
		}
		setIsVerifying(false);

		//
	};
	const initOTP = (error: MultiFactorError) => {
		const resolver = getMultiFactorResolver(auth, error);
		setMFAResolver(resolver);
		set2FARequired(true);
	};

	const onSubmit = async (values: IValuesType) => {
		const { email, password } = values;

		try {
			setLoading(true);

			const { user } = await signInWithEmailAndPassword(auth, email, password);

			const userToken: any = await user.getIdTokenResult();

			if (userToken) {
				// const payload = {
				// 	token: user.accessToken,
				// 	user,
				// };

				// dispatch(saveUser(payload));

				const userName = user?.displayName?.split(' ');
				const firstName = userName && userName[0];
				const lastName = userName && userName[1];

				if (!user.emailVerified) {
					const requestBody = { email, firstName, lastName };

					await api.post(authEndpoints.emailVerification(), requestBody);

					setLoading(false);
					dispatch(
						openSnackbar({
							message: 'Please verify your email!',
							severity: 'info',
							isOpen: true,
						}),
					);
				} else {
					openSnackbar({
						message: 'That was easy',
						severity: 'success',
						isOpen: true,
					});
					if (setupMFA) {
						navigate('/2fa-enroll', { replace: true });
					} else {
						navigate('/dashboard', { replace: true });
					}
				}
			}
		} catch (error: any) {
			switch (error.code) {
				case 'auth/multi-factor-auth-required':
					initOTP(error as MultiFactorError);
					break;
				default:
					dispatch(
						openSnackbar({
							message:
								firebaseResponseObject[(error as Error).message] ||
								'An error occurred',
							severity: 'error',
							isOpen: true,
						}),
					);
					break;
			}
			setLoading(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit,
	});

	const routeToSignUp = () => {
		navigate('/signup/createaccount', { replace: true });
	};
	const routeToForgotPassword = () => {
		navigate('/forgot-password', { replace: true });
	};

	return (
		<LoginLayout handleSubmit={formik.handleSubmit}>
			<Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: '33rem' }}>
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
							width: {
								xs: '20rem',
								sm: '25rem',
								md: '27rem',
								lg: '30rem',
								xl: '33rem',
							},
						}}
					>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							mt={4}
							sx={{
								textAlign: 'right',
							}}
						>
							{/* <Typography>
                Are you a tenant?{' '}
                <span
                  style={{
                    color: '#002147',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Sign in here
                </span>
              </Typography> */}
						</Grid>
						{!is2faRequired && (
							<Grid
								container
								sx={{
									height: '25rem',
								}}
								mt={-15}
							>
								<Grid
									item
									xs={12}
									sm={12}
									md={12}
									lg={12}
									mb={2}
									sx={{
										textAlign: 'center',
									}}
								>
									<Typography variant='h1' sx={{ fontWeight: '700' }}>
										Sign in
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
										textAlign: 'center',
									}}
								>
									<Typography
										sx={{
											fontWeight: 500,
											lineHeight: '30px',
											fontSize: '20px',
										}}
									>
										Welcome back! Please enter your details.
									</Typography>
								</Grid>

								<Grid item sm={12} xs={12} lg={12}>
									<ControlledTextField
										name='email'
										label='Email'
										type='email'
										placeholder='Enter your email address'
										formik={formik}
										inputProps={{
											sx: {
												height: '40px',
											},
										}}
									/>
								</Grid>

								<Grid item sm={12} xs={12} lg={12}>
									<ControlledPasswordField
										name='password'
										label='Password'
										type='password'
										placeholder='Enter your password'
										formik={formik}
										inputProps={{
											sx: {
												height: '40px',
											},
										}}
									/>
								</Grid>
								<Grid
									item
									sm={12}
									xs={12}
									lg={12}
									mt={-1}
									m={0.5}
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									{/* <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember this computer"
                  />
                </FormGroup> */}
									<Typography onClick={routeToForgotPassword}>
										<BoldTextLink>Forgot password</BoldTextLink>
									</Typography>
								</Grid>

								<Grid
									item
									sm={12}
									xs={12}
									lg={12}
									// m={0.5}
									sx={{
										alignItems: 'center',
										textAlign: 'center',
										marginTop: '1rem',
									}}
								>
									{loading ? (
										<LoadingSubmitButton
											loading
											loadingPosition='center'
											variant='outlined'
										>
											Sign In
										</LoadingSubmitButton>
									) : (
										<SubmitButton type='submit'> Sign In </SubmitButton>
									)}
								</Grid>

								<Grid
									item
									sm={12}
									xs={12}
									lg={12}
									mt={2}
									sx={{
										alignItems: 'center',
										textAlign: 'center',
										cursor: 'pointer',
									}}
									onClick={routeToSignUp}
								>
									<Typography>
										Don't have an account? <BoldTextLink>Sign up</BoldTextLink>
									</Typography>
								</Grid>
							</Grid>
						)}
						{is2faRequired && (
							<Stack direction={'column'} spacing={2}>
								<Typography textAlign={'left'} variant='h4'>
									Two-Factor Authentication
								</Typography>
								<Typography variant='body1'>
									Enter the 6-digit code generated by your authentication app to
									confirm your identity.
								</Typography>
								<Stack
									direction='column'
									gap={2}
									sx={{
										maxWidth: '20rem',
									}}
								>
									<OTPInput
										value={otp}
										separator={<span>&nbsp; &nbsp;</span>}
										onChange={setOtp}
										length={6}
										onEnterKeyPress={verifyOTP}
									/>
									{otpError && (
										<Typography color='error'>{otpError}</Typography>
									)}
									{verifying ? (
										<LoadingSubmitButton
											loading
											loadingPosition='center'
											variant='outlined'
										></LoadingSubmitButton>
									) : (
										<SubmitButton onClick={verifyOTP}>Verify</SubmitButton>
									)}
								</Stack>
							</Stack>
						)}
					</Grid>
				</Grid>
			</Grid>
			{/* <ControlledSnackbar/> */}
		</LoginLayout>
	);
};

export default Login;
