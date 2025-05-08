/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../../Layouts/LoginLayout';
import { SubmitButton, LoadingSubmitButton } from '../../../styles/button';
import { BoldTextLink } from '../../../styles/links';
import {
	// Checkbox,
	// FormControlLabel,
	// FormGroup,
	Grid,
	Typography,
} from '@mui/material';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import {
	getMultiFactorResolver,
	MultiFactorError,
	MultiFactorResolver,
	TotpMultiFactorGenerator,
} from 'firebase/auth';
import { useState } from 'react';
import { firebaseResponseObject } from '../../../helpers/FirebaseResponse';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import OTPPrompt from '../../../components/Dialogs/OtpPrompt';
import { styles } from './style';
import {
	useLazyGetUserByFbidQuery,
	useSignOutMutation,
	useSignInMutation,
} from '../../../store/AuthStore/authApiSlice';
import { saveUser } from '../../../store/AuthStore/AuthSlice';
import { consoleDebug, consoleLog } from '../../../helpers/debug-logger';
import { resetStore } from '../../../store';
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
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();


	const setupMFA = searchParams.get('enroll2fa');
	const continuePath = searchParams.get('continue');
	const [userSignOut] = useSignOutMutation();
	const [signIn] = useSignInMutation();
	const verifyOTP = async () => {
		setIsVerifying(true);
		if (otp.length != 6) {
			setOtpError('Invalid code');
			setIsVerifying(false);
			return;
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
				navigate(continuePath || '/dashboard', { replace: true });
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
			setIsVerifying(false);
		}

		//
	};
	const cancelOtpVerification = () => {
		set2FARequired(false);
		setOtpError('');
		setOtp('');
		setIsVerifying(false);
		setMFAResolver(null);
	};
	const initOTP = (error: MultiFactorError) => {
		const resolver = getMultiFactorResolver(auth, error);
		setMFAResolver(resolver);
		set2FARequired(true);
	};

	const deAuthenticateUser = async () => {
		await userSignOut({}).unwrap();
		resetStore();
	};
	const setSessionStorage = (record: Record<string, any>[]) => {
		record.forEach((item) => {
			const value = typeof item.value === 'object' 
				? JSON.stringify(item.value) 
				: item.value;
			sessionStorage.setItem(item.key, value);
			consoleDebug(`Setting ${item.key} in session storage:`, value);
		});
	};



	const onSubmit = async (values: IValuesType) => {
		
		const { email, password } = values;
		try {
			setLoading(true);
			const signInResult = await signIn({ email, password });
			if (!signInResult) {
				throw new Error('Invalid credentials');
			}
			const user = await triggerGetUserByFbid().unwrap();
			if (user && user.profileUuid) {
				const sessionStorageData = [
					{
						key: 'tenant_id',
						value: user.tenantId || user.organizationUuid || '',
					},
					{ key: 'org-settings', value: JSON.stringify(user.orgSettings)  },
					{ key: 'org-subscription', value: JSON.stringify(user.orgSubscription) },
				];
				setSessionStorage(sessionStorageData);
				// const userName = user?.displayName?.split(' ');
				// const firstName = userName && userName[0];
				// const lastName = userName && userName[1];

				// if (!user.emailVerified) {
				// 	const requestBody = { email, firstName, lastName };

				// 	await api.post(authEndpoints.emailVerification(), requestBody);

				// 	setLoading(false);
				// 	dispatch(
				// 		openSnackbar({
				// 			message: 'Please verify your email!',
				// 			severity: 'info',
				// 			isOpen: true,
				// 		}),
				// 	);
				// } else {
				// 	const response = await triggerGetUserByFbid();
				// 	if (!response.data) {
				// 		throw new Error('User not found');
				// 	}
				// 	if (!response.data?.organizationUuid) {
				// 		throw new Error('Organization ID is undefined');
				// 	}
				// 	const orgSettings = await triggerGetOrgSettingsQuery({
				// 		orgId: response.data?.organizationUuid,
				// 	}).unwrap();
				// 	const orgSubscription = await triggerGetOrgSubscriptionQuery({
				// 		orgId: response.data?.organizationUuid,
				// 	}).unwrap();
				// 	const payload = {
				// 		token: userToken,
				// 		user: response?.data as UserProfile,
				// 		isSignedIn: true,
				// 		orgSettings: orgSettings,
				// 		orgSubscription: orgSubscription,
				// 	};
				// 	dispatch(saveUser(payload));
				// 	openSnackbar({
				// 		message: 'That was easy',
				// 		severity: 'success',
				// 		isOpen: true,
				// 	});
				// 	if (setupMFA) {
				// 		navigate('/2fa-enroll', { replace: true });
				// 	} else {
				// 		navigate('/dashboard', { replace: true });
				// 	}
				// }
				const payload = {
					user: user,
					isSignedIn: true,
				};
				dispatch(saveUser(payload));
				
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
		} catch (error: any) {
			console.error('Login error:', error);
			switch (error.code) {
				case 'auth/multi-factor-auth-required':
					initOTP(error as MultiFactorError);
					break;
				default:
					consoleLog('Error:', error);
					deAuthenticateUser();
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
			consoleDebug('Sign in failed, setting loading to false');
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
		<>
			<LoginLayout handleSubmit={formik.handleSubmit}>
				<Grid
					item
					xs={12}
					sm={12}
					md={6}
					lg={6}
					xl={6}
					sx={{
						width: '33rem',
					}}
				>
					<Grid container sx={styles.container}>
						<Grid container sx={styles.formContainer}>
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
							<Grid
								container
								sx={{
									height: '25rem',
								}}
								mt={-15}
							>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<Typography variant='h1' sx={styles.title}>
										Sign in
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<Typography sx={styles.subTitle}>
										Welcome back! Please enter your details.
									</Typography>
								</Grid>

								<Grid item sm={12} xs={12} lg={12}>
									<ControlledTextField
										name='email'
										label='Email'
										type='email'
										autoComplete='username'
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
										autoComplete='current-password'
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
									sx={styles.forgotPassword}
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

								<Grid item sm={12} xs={12} lg={12} sx={styles.buttonGroupStyle}>
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
									sx={styles.lastGridStyle}
									onClick={routeToSignUp}
								>
									<Typography>
										Don't have an account? <BoldTextLink>Sign up</BoldTextLink>
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* <ControlledSnackbar/> */}
			</LoginLayout>
			<OTPPrompt
				open={is2faRequired}
				onCancel={cancelOtpVerification}
				onVerifyOtpClick={verifyOTP}
				otp={otp}
				setOtp={setOtp}
				otpError={otpError}
				verifying={verifying}
				verifyOtp={verifyOTP}
			/>
		</>
	);
};

export default Login;
