import { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import FeedbackContent from '../../components/FeedbackContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { applyActionCode } from 'firebase/auth';
import successImage from '../../assets/images/circle-ok.svg';
import errorImage from '../../assets/images/error.svg';
import { Container, Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
import { consoleLog } from '../../helpers/debug-logger';
import { styles } from './style';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
	const { user } = useSelector(getAuthState);
	const invocationCount = useRef(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [resendEnabled, setResendEnabled] = useState(false);

	// const mode = searchParams.get('mode');
	const oobCode = searchParams.get('oobCode');
	const continueUrl = searchParams.get('continueUrl');
	const isPending = searchParams.get('is_pending');

	const checkEmailVerification = async (oobCode: string) => {
		try {
			applyActionCode(auth, oobCode);
			setLoading(false);
			setError(false);
		} catch (error) {
			consoleLog('verification error: ', error);
			setLoading(false);
			setErrorMessage('Verification Code expired. Contact Support');
			setError(true);
		}
	};
	const toggleResendEnabled = () => {
		setTimeout(() => {
			setResendEnabled(true);
		}, 10000);
	};

	useEffect(() => {
		invocationCount.current++;
		if (invocationCount.current === 1 && oobCode && loading) {
			checkEmailVerification(oobCode);
		} else if (invocationCount.current === 1 && isPending) {
			toggleResendEnabled();
		}
	});
	const resendVerificationEmail = () => {
		setResendEnabled(false);
		api.post(authEndpoints.emailVerification(), {
			email: user?.email,
			firstName: user?.firstName,
			lastName: user?.lastName,
		});
		toggleResendEnabled();
	};

	const navigateToContinueUrl = () => {
		continueUrl && navigate(continueUrl, { replace: true });
	};
	const navigateToMFASetUp = () => {
		navigate(`/2fa-enroll?continueUrl=${continueUrl}`, { replace: true });
	};

	const renderViewContent = () => {
		if (!error) {
			return (
				<FeedbackContent
					content={
						loading
							? 'We are verifying your email address...'
							: 'Your Email Address has been verified. You can continue using the application.'
					}
					onClick={navigateToContinueUrl}
					onMFASetupClick={navigateToMFASetUp}
					showButton={loading ? false : true}
					header={loading ? 'Please be patient' : 'Email Verified'}
					imageLink={loading ? '' : successImage}
				/>
			);
		} else if (errorMessage) {
			return (
				<FeedbackContent
					content={(errorMessage as string) || 'An error occurred'}
					onClick={navigateToContinueUrl}
					header={'Verify Your Email'}
					imageLink={errorImage}
				/>
			);
		}
	};
	return (
		<Container maxWidth='lg' sx={{}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				{isPending ? (
					<Stack
						direction={'column'}
						spacing={2}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							maxWidth: '400px',
							margin: 'auto',
							textAlign: 'center',
						}}
					>
						<Paper elevation={3} sx={styles.pendingPaper}>
							<MarkEmailUnreadIcon sx={styles.envelopeIcon} />
							<Typography sx={styles.pendingTitle}>Account Created!</Typography>
							<Typography sx={styles.pendingSubtitle}>
								We've sent you an email.
							</Typography>
							<Typography sx={styles.pendingText}>
								Please confirm your email address by clicking on the link in
								your inbox.
							</Typography>
							{user?.email && (
								<Button
									variant='contained'
									disabled={!resendEnabled}
									onClick={resendVerificationEmail}
								>
									Resend Verification Email
								</Button>
							)}
						</Paper>
					</Stack>
				) : (
					renderViewContent()
				)}
			</Box>
		</Container>
	);
};

export default EmailVerification;
