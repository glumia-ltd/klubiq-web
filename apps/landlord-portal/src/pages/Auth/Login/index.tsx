/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../../Layouts/LoginLayout';
import { LoadingSubmitButton } from '../../../styles/button';
import { BoldTextLink } from '../../../styles/links';
import {
	Button,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { firebaseResponseObject } from '../../../helpers/FirebaseResponse';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import OTPPrompt from '../../../components/Dialogs/OtpPrompt';
import { styles } from './style';
import {
	useLazyGetUserByFbidQuery,
	useSignInMutation,
	useVerifyMFAOtpMutation,
} from '../../../store/AuthStore/authApiSlice';
import { saveUser } from '../../../store/AuthStore/AuthSlice';
import { consoleDebug, consoleError } from '../../../helpers/debug-logger';
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
	const [verifyMFAOtp] = useVerifyMFAOtpMutation();
	const [is2faRequired, set2FARequired] = useState<boolean>(false);
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const dispatch = useDispatch();
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();

	const setupMFA = searchParams.get('enroll2fa');
	const continuePath = searchParams.get('continue');
	const [signIn] = useSignInMutation();
	const verifyOTP = async () => {
		setIsVerifying(true);
		if (otp.length != 6) {
			setOtpError('Invalid code');
			setIsVerifying(false);
			return;
		}
		try {
			const verifyResult = await verifyMFAOtp({ otp });
			if (!verifyResult) {
				throw new Error('Invalid OTP');
			} else {
				setOtpError('');
				loadUserAfterSignIn();
			}
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

		//
	};
	const cancelOtpVerification = () => {
		set2FARequired(false);
		setOtpError('');
		setOtp('');
		setIsVerifying(false);
	};

	const setSessionStorage = (record: Record<string, any>[]) => {
		record.forEach((item) => {
			const value =
				typeof item.value === 'object'
					? JSON.stringify(item.value)
					: item.value;
			sessionStorage.setItem(item.key, value);
			consoleDebug(`Setting ${item.key} in session storage:`, value);
		});
	};

	const loadUserAfterSignIn = async () => {
		const user = await triggerGetUserByFbid().unwrap();
		if (user && user.profileUuid) {
			const sessionStorageData = [
				{
					key: 'tenant_id',
					value: user.tenantId || user.organizationUuid || '',
				},
				{ key: 'org-settings', value: JSON.stringify(user.orgSettings) },
				{
					key: 'org-subscription',
					value: JSON.stringify(user.orgSubscription),
				},
			];
			setSessionStorage(sessionStorageData);
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
				navigate(continuePath || '/dashboard', { replace: true });
			}
		}
	};

	const onSubmit = async (values: IValuesType) => {
		const { email, password } = values;
		try {
			setLoading(true);
			await signIn({ email, password }).unwrap();
			loadUserAfterSignIn();
		} catch (error: any) {
			if (error.message === 'MFA-required') {
				consoleError('MFA Required to continue sign in');
				set2FARequired(true);
			} else {
				set2FARequired(false);
				dispatch(
					openSnackbar({
						message:
							firebaseResponseObject[(error as Error).message] ||
							(error as Error).message,
						severity: 'error',
						isOpen: true,
						duration: 7000,
					}),
				);
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
		<>
			{is2faRequired ? (
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
			) : (
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
						<Stack
									justifyContent='center'
									direction='column'
									width='50%'
									gap={1}
									sx={{
										height: '100vh',
										// width: {
										// 	xs: '70%',
										// 	md: '50%'
										// }
									}}
								>
									<Typography variant='h1' textAlign='center'>
											Sign in
										</Typography>
										<Typography variant='subtitle1' textAlign='center'>
											Welcome back! Please enter your details.
										</Typography>
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
										<Typography onClick={routeToForgotPassword}>
											<BoldTextLink>Forgot password</BoldTextLink>
										</Typography>
										{loading ? (
											<LoadingSubmitButton
												loading
												loadingPosition='center'
												variant='outlined'
											>
												Sign In
											</LoadingSubmitButton>
										) : (
											<Button fullWidth variant='klubiqMainButton' type='submit'>
												Sign In
											</Button>
										)}
										<Typography textAlign='center'>
											Don't have an account?{' '}
											<BoldTextLink onClick={routeToSignUp}>Sign up</BoldTextLink>
										</Typography>
								</Stack>
						</Grid>
					</Grid>
				</LoginLayout>
			)}
		</>
	);
};

export default Login;
