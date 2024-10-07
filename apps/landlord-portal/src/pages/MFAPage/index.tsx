import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import appstorelogo from '../../assets/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import playstorelogo from '../../assets/images/GetItOnGooglePlay_Badge_Web_color_English.png';
import {
	multiFactor,
	TotpMultiFactorGenerator,
	TotpSecret,
	User,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	EmailAuthProvider,
} from 'firebase/auth';
import { useFormik } from 'formik';
import { auth } from '../../firebase';
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	InputAdornment,
	Link,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import * as yup from 'yup';
import QRCode from 'react-qr-code';
import OTPInput from '../../components/ControlledComponents/OTPInputField';
import { ArrowBackIos } from '@mui/icons-material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { BoldTextLink } from '../../styles/links';
import LoadingButton from '@mui/lab/LoadingButton';
import { styles } from './style';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
type modalContent = {
	title: string;
	subtitle: string;
	actionText: string;
};
type AuthValuesType = {
	password: string;
	email: string;
};
const MFASetUp = () => {
	const [searchParams] = useSearchParams();
	const continueUrl = searchParams.get('continueUrl');
	const dispatch = useDispatch();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const invocationCount = useRef(0);
	const validationSchema = yup.object({
		password: yup.string().required('Please enter your password'),
		email: currentUser?.email
			? yup.string().optional()
			: yup.string().email().required('Please enter your email'),
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
	const [initializing, setInitializing] = useState<boolean>(true);
	const navigate = useNavigate();
	const [qrCodeUrl, setQrCodeUrl] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const [totpSecret, setTOTPSecret] = useState<TotpSecret | null>(null);
	const [modalContent, setModalContent] = useState<modalContent>({
		title: 'Verify your identity',
		subtitle: `Since you're trying to perform a sensitive operation, we need re-verification to let you proceed.`,
		actionText: 'Confirm Password',
	});
	const [error, setError] = useState('');
	const [otp, setOtp] = useState('');
	const [reAuthenticationRequired, setRAuthenticationRequired] =
		useState<boolean>(false);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const startTOTPSetup = async () => {
		try {
			await generateTotpSecret(auth.currentUser!);
		} catch (error) {
			setEmailEnabled(false);
			setRAuthenticationRequired(true);
		}
		setInitializing(false);
	};
	const onReAuthenticate = async (values: AuthValuesType) => {
		const { email, password } = values;
		try {
			setLoading(true);
			if (
				currentUser &&
				currentUser.email?.toLocaleLowerCase() === email.toLocaleLowerCase()
			) {
				const credential = EmailAuthProvider.credential(
					currentUser.email,
					password,
				);
				await reauthenticateWithCredential(currentUser, credential);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
			}
			startTOTPSetup();
			setLoading(false);
			setOpenDialog(false);
			setRAuthenticationRequired(false);
			setError('');
		} catch (error) {
			console.log(error);
			setOpenDialog(true);
			setError('Unable to re-authenticate. Please try again.');
			setLoading(false);
		}
	};
	const formData = useFormik({
		initialValues: {
			email: currentUser?.email || '',
			password: '',
		},
		// enableReinitialize: true,
		validationSchema,
		onSubmit: onReAuthenticate,
	});
	const generateTotpSecret = async (newUser: User) => {
		const multiFactorSession = await multiFactor(newUser).getSession();
		const secret =
			await TotpMultiFactorGenerator.generateSecret(multiFactorSession);
		setTOTPSecret(secret);
		setSecretKey(secret.secretKey);
		const totpUri = secret.generateQrCodeUrl(newUser.email!, auth.app.name);
		setQrCodeUrl(totpUri);
	};
	const notify = (message: string, type: string) => {
		dispatch(
			openSnackbar({
				message,
				severity: type as 'success' | 'info' | 'warning' | 'error',
				isOpen: true,
			}),
		);
	};
	const activateTOTP = async () => {
		if (otp && otp.length === 6) {
			try {
				const multiFactorAssertion =
					TotpMultiFactorGenerator.assertionForEnrollment(totpSecret!, otp);
				await multiFactor(auth.currentUser!).enroll(
					multiFactorAssertion,
					'totp',
				);
				setError('');
				notify('Successfully enrolled in OTP Authentication.', 'success');
				navigate('/dashboard', { replace: true });
			} catch (error) {
				console.log(error);
				setError('Unable to enroll in OTP Authentication.');
			}
		} else {
			setError('Please enter a valid OTP. OTP must be 6 digits.');
		}
	};
	const continueToUrl = () => {
		if (continueUrl) {
			navigate(continueUrl, { replace: true });
		}
	};
	const routeToLogin = () => {
		auth.signOut();
		sessionStorage.clear();
		navigate('/login', { replace: true });
	};
	const routeToForgotPassword = () => {
		navigate('/forgot-password', { replace: true });
	};
	const startReAuthentication = () => {
		setEmailEnabled(true);
		setRAuthenticationRequired(true);
		setModalContent({
			title: 'Sign in to setup your OTP authentication',
			subtitle: `Since you're trying to perform a sensitive operation, we need verify your account before you can proceed.`,
			actionText: 'Sign in',
		});
		setInitializing(false);
	};

	const handleClose = () => {
		currentUser ? setEmailEnabled(false) : setEmailEnabled(true);
		setOpenDialog(false);
		setError('');
		setLoading(false);
		formData.resetForm();
	};
	const toggleEmailField = () => {
		setEmailEnabled(!emailEnabled);
	};
	useEffect(() => {
		invocationCount.current++;
		if (invocationCount.current === 1) {
			auth.onAuthStateChanged((user) => {
				if (user) {
					setCurrentUser(user);
					startTOTPSetup();
				} else {
					setCurrentUser(null);
					startReAuthentication();
				}
			});
		}
	});

	return (
		<>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				fullWidth={false}
				maxWidth={'xs'}
				PaperProps={{
					component: 'form',
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						formData.handleSubmit();
					},
				}}
			>
				<DialogTitle>{modalContent.title}</DialogTitle>
				<DialogContent>
					{error && (
						<DialogContentText color='error'>{error}</DialogContentText>
					)}
					<DialogContentText>{modalContent.subtitle}</DialogContentText>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 0,
							mt: 1,
						}}
					>
						<ControlledTextField
							name='email'
							type='email'
							value={!emailEnabled ? currentUser?.email : formData.values.email}
							placeholder='Enter your email address'
							formik={formData}
							InputProps={{
								endAdornment: !emailEnabled && (
									<InputAdornment position='end'>
										<Link
											sx={{
												cursor: 'pointer',
											}}
											underline='none'
											onClick={toggleEmailField}
										>
											Not you?
										</Link>
									</InputAdornment>
								),
								readOnly: !emailEnabled,
								sx: {
									height: '40px',
								},
							}}
						/>
						<ControlledPasswordField
							name='password'
							type='password'
							placeholder='Enter your password'
							formik={formData}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
						<Typography textAlign={'right'}>
							<BoldTextLink onClick={routeToForgotPassword}>
								Forgot password
							</BoldTextLink>
						</Typography>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant='outlined' onClick={handleClose}>
						Cancel
					</Button>
					{loading ? (
						<LoadingButton
							loading
							loadingPosition='center'
							variant='outlined'
						></LoadingButton>
					) : (
						<Button variant='contained' type='submit'>
							{' '}
							{modalContent.actionText}{' '}
						</Button>
					)}
				</DialogActions>
			</Dialog>
			<Grid container spacing={0} sx={styles.gridContainer}>
				<Grid
					xs={12}
					sm={12}
					md={6}
					lg={6}
					xl={6}
					spacing={0}
					sx={styles.leftSplit}
				>
					<Stack direction={'column'} spacing={2}>
						<Stack
							direction={'row'}
							sx={{
								justifyContent: 'flex-start',
							}}
						>
							{initializing && (
								<Box sx={{ display: 'flex' }}>
									<CircularProgress />
								</Box>
							)}
							{!initializing && (
								<Button
									onClick={continueUrl ? continueToUrl : routeToLogin}
									startIcon={<ArrowBackIos />}
								>
									{continueUrl ? 'Return to site' : 'Back to login'}
								</Button>
							)}
						</Stack>
						{reAuthenticationRequired && (
							<Typography>
								You're trying to perform a sensitive operation.{' '}
								<Link
									onClick={() => {
										setOpenDialog(true);
									}}
									sx={{
										cursor: 'pointer',
									}}
									underline='none'
								>
									Click here
								</Link>{' '}
								to verify yourself!
							</Typography>
						)}
						{qrCodeUrl && !reAuthenticationRequired && (
							<>
								<Typography textAlign={'left'} variant='h4'>
									OTP Authenticator Enrollment
								</Typography>
								<Typography variant='body1'>
									Follow below steps to set up an OTP with Google Authenticator.
								</Typography>
								<Paper
									elevation={3}
									sx={{
										padding: '1.5rem',
									}}
								>
									<Stack
										direction={'column'}
										spacing={4}
										sx={{
											marginBottom: '2.5rem',
										}}
									>
										<Stack
											direction={'row'}
											spacing={2}
											sx={{
												alignItems: 'flex-start',
												justifyContent: 'flex-start',
											}}
										>
											<Avatar sx={styles.avatarBulletStyle}>
												<Typography variant='h6'>1</Typography>
											</Avatar>
											<Stack direction={'column'} spacing={1}>
												<Typography variant='body1'>
													Download Google Authenticator:
												</Typography>
												<Stack direction={'row'} spacing={1}>
													<a
														href={
															'https://apps.apple.com/us/app/google-authenticator/id388497605'
														}
														target='_blank'
														style={{
															textDecoration: 'none',
															color: 'inherit',
														}}
													>
														<img
															width='100px'
															height='33px'
															src={appstorelogo}
														/>
													</a>

													<a
														href={
															'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&pli=1'
														}
														target='_blank'
														style={{
															textDecoration: 'none',
															color: 'inherit',
														}}
													>
														<img
															width='100px'
															height='33px'
															src={playstorelogo}
														/>
													</a>
												</Stack>
											</Stack>
										</Stack>
										<Stack
											spacing={3}
											direction={'row'}
											sx={{
												alignItems: 'flex-start',
												justifyContent: 'flex-start',
											}}
										>
											<Avatar sx={styles.avatarBulletStyle}>
												<Typography variant='h6'>2</Typography>
											</Avatar>
											<Stack
												spacing={2}
												direction={'column'}
												sx={{
													width: '60%',
												}}
											>
												<Typography variant='body1'>
													Scan the <strong>QR Code</strong> on this page with
													the authenticator application.
												</Typography>
												{secretKey && (
													<Typography>
														You can also enter this secret code{' '}
														<strong>Secret Key:</strong> {secretKey}
													</Typography>
												)}
											</Stack>

											<Box sx={styles.qrBox}>
												<QRCode
													size={256}
													style={styles.qr}
													value={qrCodeUrl}
													viewBox={`0 0 256 256`}
												/>
											</Box>
										</Stack>

										<Stack
											direction={'row'}
											spacing={2}
											sx={{
												alignItems: 'flex-start',
												justifyContent: 'flex-start',
											}}
										>
											<Avatar sx={styles.avatarBulletStyle}>
												<Typography variant='h6'>3</Typography>
											</Avatar>
											<Stack direction={'column'} spacing={1}>
												<Typography variant='body1'>
													Enter six- digit code generated by the authenticator
													app
												</Typography>
												<Stack
													direction={'column'}
													sx={{
														width: '50%',
													}}
													spacing={1}
												>
													<OTPInput
														value={otp}
														onChange={setOtp}
														length={6}
														onEnterKeyPress={activateTOTP}
													/>
													{error && (
														<Typography color='error'>{error}</Typography>
													)}
												</Stack>
											</Stack>
										</Stack>
									</Stack>
									<Divider />
									<Stack
										direction='row'
										spacing={1}
										sx={styles.enrollActionContainerStyle}
									>
										<Button
											sx={styles.cancelEnrollStyle}
											variant='contained'
											onClick={continueUrl ? continueToUrl : routeToLogin}
										>
											Cancel
										</Button>
										<Button onClick={activateTOTP} variant='contained'>
											Enroll
										</Button>
									</Stack>
								</Paper>
							</>
						)}
					</Stack>
				</Grid>
				<Grid
					xs={0}
					sm={0}
					md={6}
					lg={6}
					xl={6}
					sx={styles.splitScreenStyle}
				></Grid>
			</Grid>
		</>
	);
};
export default MFASetUp;
