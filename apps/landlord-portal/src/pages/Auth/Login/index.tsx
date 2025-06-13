/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../../Layouts/LoginLayout';
import { BoldTextLink } from '../../../styles/links';
import { Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
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
import { DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';
import { z } from 'zod';

type IValuesType = {
	password: string;
	email: string;
};
const Login = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	// const [loading, setLoading] = useState<boolean>(false);
	const [verifying, setIsVerifying] = useState<boolean>(false);
	const [verifyMFAOtp] = useVerifyMFAOtpMutation();
	const [is2faRequired, set2FARequired] = useState<boolean>(false);
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const dispatch = useDispatch();
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();
	const [errorAlertData, setErrorAlertData] = useState<{title: string, message: string}>({title: 'Invalid credentials', message: 'Please check your email and password and try again.'});

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
			// setLoading(true);
			await signIn({ email, password }).unwrap();
			loadUserAfterSignIn();
			return;
		} catch (error: any) {
			if (error.message === 'MFA-required') {
				consoleError('MFA Required to continue sign in');
				set2FARequired(true);
			} else {
				set2FARequired(false);
				setErrorAlertData({title: 'Login failed', message: error.message});
				throw error;
			}
		}
	};

	const routeToSignUp = () => {
		navigate('/signup/createaccount', { replace: true });
	};
	const getErrorAlertMessage = () => {
		return errorAlertData.message;
	};
	const getErrorAlertTitle = () => {
		return errorAlertData.title;
	};
	const routeToForgotPassword = () => {
		navigate('/forgot-password', { replace: true });
	};
	const loginFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Typography variant='h1' sx={styles.title} textAlign='center'>
				Sign in
			</Typography>
		),
		subHeader: (
			<Typography variant='h2' sx={styles.subTitle} textAlign='center'>
				Welcome back! Please enter your details.
			</Typography>
		),
		submitButtonText: 'Sign in',
		underSubmitButtonNode: (
			<Typography textAlign='center'>
				Don't have an account?{' '}
				<BoldTextLink onClick={routeToSignUp}>Sign up</BoldTextLink>
			</Typography>
		),
		fullWidthButtons: true,
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: [
			{
				name: 'email',
				type: 'email',
				label: 'Email',
				placeholder: 'Enter your email address',
				validation: {
					schema: z
						.string({required_error: 'Email is required'})
						.email({ message: 'Enter a valid email address' }),
				},
			},
			{
				name: 'password',
				type: 'password',
				label: 'Password',
				placeholder: 'Enter your password',
				validation: {
					schema: z
						.string({required_error: 'Password is required'})
						.min(8, { message: 'Password must be at least 8 characters long' }),
				},
			},
			{
				name: 'forgotPassword',
				type: 'custom',
				label: '',
				component: (
					<Typography textAlign='left' onClick={routeToForgotPassword}>
						<BoldTextLink>Forgot password</BoldTextLink>
					</Typography>
				),
			},
		],
		onSubmit: onSubmit,
		initialValues: {
			email: '',
			password: '',
		},
		enableErrorAlert: true,
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
				<LoginLayout>
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
								}}
							>
								<KlubiqFormV1 {...loginFormConfig} />
							</Stack>
						</Grid>
					</Grid>
				</LoginLayout>
			)}
		</>
	);
};

export default Login;
