import { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import setupImg from '../../assets/images/mfa-setup.png';
import appstorelogo from '../../assets/images/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import playstorelogo from '../../assets/images/GetItOnGooglePlay_Badge_Web_color_English.png';
import {
	multiFactor,
	TotpMultiFactorGenerator,
	TotpSecret,
	User,
} from 'firebase/auth';
import { auth } from '../../firebase';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import QRCode from 'react-qr-code';
import OTPInput from '../../components/ControlledComponents/OTPInputField';
import { ArrowBackIos } from '@mui/icons-material';

const MFASetUp = () => {
	const invocationCount = useRef(0);
	const isMobile = useMediaQuery('(max-width: 500px)');
	const navigate = useNavigate();
	const [qrCodeUrl, setQrCodeUrl] = useState('');
	const [secretKey, setSecretKey] = useState('');
	const [totpSecret, setTOTPSecret] = useState<TotpSecret | null>(null);
	const [error, setError] = useState('');
	const [otp, setOtp] = useState('');
	const startTOTPSetup = async () => {
		await generateTotpSecret(auth.currentUser!);
	};
	const generateTotpSecret = async (newUser: User) => {
		const multiFactorSession = await multiFactor(newUser).getSession();
		console.log('SESSION: ', multiFactorSession);
		const secret =
			await TotpMultiFactorGenerator.generateSecret(multiFactorSession);
		setTOTPSecret(secret);
		setSecretKey(secret.secretKey);
		const totpUri = secret.generateQrCodeUrl(newUser.email!, auth.app.name);
		setQrCodeUrl(totpUri);
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
				navigate('/dashboard', { replace: true });
			} catch (error) {
				console.log(error);
				setError('Unable to enroll MFA.');
			}
		} else {
			setError('Please enter a valid OTP');
		}
	};
	const routeToLogin = () => {
		navigate('/login', { replace: true });
	};
	useEffect(() => {
		invocationCount.current++;
		// if (auth?.currentUser) {
		// 	startTOTPSetup();
		// }
		startTOTPSetup();
	});

	return (
		<Grid
			container
			spacing={0}
			sx={{
				height: '100vh',
				p: 2,
			}}
		>
			<Stack
				direction='row'
				spacing={4}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<Stack
					direction={'column'}
					spacing={2}
					sx={{
						width: isMobile ? '100%' : '45%',
						paddingLeft: {
							xs: 0,
							sm: '1rem',
							md: '2rem',
							lg: '10rem',
						},
					}}
				>
					<Stack
						direction={'row'}
						sx={{
							justifyContent: 'flex-start',
						}}
					>
						<Button onClick={routeToLogin} startIcon={<ArrowBackIos />}>
							Back to login
						</Button>
					</Stack>

					<Typography textAlign={'left'} variant='h4'>
						2FA Enrollment
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
								<Avatar
									sx={{
										width: '30px',
										height: '30px',
										bgcolor: 'secondary.light',
									}}
								>
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
											<img width='100px' height='33px' src={appstorelogo} />
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
											<img width='100px' height='33px' src={playstorelogo} />
										</a>
									</Stack>
								</Stack>
							</Stack>
							<Stack
								spacing={3}
								direction={'row'}
								sx={{
									alignItems: 'center',
									justifyContent: 'flex-start',
								}}
							>
								<Avatar
									sx={{
										width: '30px',
										height: '30px',
										bgcolor: 'secondary.light',
									}}
								>
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
										Scan the <strong>QR Code</strong> on this page with the
										authenticator application.
									</Typography>
									{secretKey && (
										<Typography>
											You can also enter this secret code{' '}
											<strong>Secret Key:</strong> {secretKey}
										</Typography>
									)}
								</Stack>

								<Box
									sx={{
										height: 'auto',
										margin: '0 auto',
										width: '40%',
									}}
								>
									<QRCode
										size={256}
										style={{
											height: 'auto',
											maxWidth: '100%',
											width: '100%',
										}}
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
								<Avatar
									sx={{
										width: '30px',
										height: '30px',
										bgcolor: 'secondary.light',
									}}
								>
									<Typography variant='h6'>3</Typography>
								</Avatar>
								<Stack direction={'column'} spacing={1}>
									<Typography variant='body1'>
										Enter six- digit code generated by the authenticator app
									</Typography>
									<Stack
										direction={'column'}
										sx={{
											width: '50%',
										}}
										spacing={1}
									>
										<OTPInput value={otp} onChange={setOtp} length={6} />
										{error && <Typography color='error'>{error}</Typography>}
									</Stack>
								</Stack>
							</Stack>
						</Stack>
						<Divider />
						<Stack
							direction='row'
							spacing={1}
							sx={{
								marginTop: '1rem',
								justifyContent: 'flex-end',
							}}
						>
							<Button
								sx={{
									backgroundColor: 'secondary.light',
									color: 'white',
								}}
								variant='contained'
								onClick={routeToLogin}
							>
								Cancel
							</Button>
							<Button onClick={activateTOTP} variant='contained'>
								Activate MFA
							</Button>
						</Stack>
					</Paper>
				</Stack>
				{!isMobile && (
					<Stack
						sx={{
							width: '50%',
							height: '95%',
							background: `url(${setupImg})`,
							backgroundColor: 'secondary.light',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							position: 'relative',
							borderTopRightRadius: '16px',
							borderBottomRightRadius: '1rem',
							backgroundBlendMode: 'normal',
						}}
					></Stack>
				)}
			</Stack>
		</Grid>
	);
};
export default MFASetUp;
