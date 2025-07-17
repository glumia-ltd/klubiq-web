/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../../Layouts/LoginLayout';
import { BoldTextLink } from '../../../styles/links';
import { Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import OTPPrompt from '../../../components/Dialogs/OtpPrompt';
import { styles } from './style';
import {
	useLazyFetchCsrfTokenQuery,
	useLazyGetUserByFbidQuery,
	useSignInMutation,
	useVerifyMFAOtpMutation,
} from '../../../store/AuthStore/authApiSlice';
import { saveUser } from '../../../store/AuthStore/AuthSlice';
import { consoleDebug, consoleError } from '../../../helpers/debug-logger';
import { DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';
import { z } from 'zod';
import { defaultOrgSettings } from '../../../helpers/constants';
import logo from '../../../assets/images/logo-1.png';
import logoText from '../../../assets/images/logo-text-2.png';
import lightLogo from '../../../assets/images/logo-3.png';
import lightLogoText from '../../../assets/images/logo-text-3.png';

type IValuesType = {
	password: string;
	email: string;
};
const Login = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [verifying, setIsVerifying] = useState<boolean>(false);
	const [verifyMFAOtp] = useVerifyMFAOtpMutation();
	const [is2faRequired, set2FARequired] = useState<boolean>(false);
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const dispatch = useDispatch();
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();
	const [fetchCsrfTokenQuery] = useLazyFetchCsrfTokenQuery();

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
	const fetchCsrfToken = async () => {
		try {
			const { token } = await fetchCsrfTokenQuery().unwrap();
			sessionStorage.setItem('csrf_token', token);
		} catch (error) {
			console.error('Failed to fetch CSRF token:', error);
			throw new Error('An error occurred during sign in');
		}
	};
	const loadUserAfterSignIn = async () => {
		const user = await triggerGetUserByFbid().unwrap();
		if (user && user.profileUuid) {
			const sessionStorageData = [
				{
					key: 'tenant_id',
					value: user.tenantId || user.organizationUuid || '',
				},
				{ key: 'org-settings', value: JSON.stringify(user.orgSettings?.settings || defaultOrgSettings) },
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
			await loadUserAfterSignIn();
			await fetchCsrfToken();
			return;
		} catch (error: any) {
			if (error.message === 'MFA-required') {
				consoleError('MFA Required to continue sign in');
				set2FARequired(true);
			} else {
				set2FARequired(false);
				throw error;
			}
		}
	};

	const routeToSignUp = () => {
		navigate('/signup/createaccount', { replace: true });
	};
	const routeToForgotPassword = () => {
		navigate('/forgot-password', { replace: true });
	};
	const loginFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Stack direction='row' justifyContent='flex-start' alignItems='center' gap={2} sx={{ width: '100%' }}>
				<img src={theme.palette.mode === 'dark' ? logo : lightLogo} alt='logo' style={{ width: '10%', height: 'auto' }} />
				<img src={theme.palette.mode === 'dark' ? logoText : lightLogoText} alt='logo' style={{ width: '25%', height: 'auto' }} />
			</Stack>
		),
		subHeader: (
			<Typography variant='h2' sx={styles.subTitle} textAlign='left'>
				Please sign in to your account.
			</Typography>
		),
		submitButtonText: 'Sign in',
		underSubmitButtonNode: (
			<Typography textAlign='left'>
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
							width: isMobile ? '100%' : '33rem',
						}}
					>
						<Grid container sx={styles.container}>
							<Stack
								justifyContent='center'
								direction='column'
								width={isMobile ? '90%' : '50%'}
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
