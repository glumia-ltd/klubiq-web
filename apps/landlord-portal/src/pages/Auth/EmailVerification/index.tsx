import { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import FeedbackContent from '../../../components/FeedbackContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import successImage from '../../../assets/images/circle-ok.svg';
import errorImage from '../../../assets/images/error.svg';
import { Container } from '@mui/system';
import { consoleLog } from '../../../helpers/debug-logger';
import { useVerifyEmailMutation } from '../../../store/AuthStore/authApiSlice';

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
	const invocationCount = useRef(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [verifyEmail] = useVerifyEmailMutation();

	// const mode = searchParams.get('mode');
	const token = searchParams.get('token');
	const email = searchParams.get('email');
	const continueUrl = searchParams.get('continueUrl') || '/dashboard';

	const checkEmailVerification = async (token: string, email: string) => {
		try {
			const verifyEmailResult = await verifyEmail({
				email: email,
				token: token,
			}).unwrap();
			if (verifyEmailResult.emailVerified) {
				navigateToLogin();
			} else {
				setLoading(false);
				setErrorMessage('Verification Code expired. Contact Support');
				setError(true);
			}
		} catch (error) {
			consoleLog('verification error: ', error);
			setLoading(false);
			setErrorMessage('Verification Code expired. Contact Support');
			setError(true);
		}
	};

	useEffect(() => {
		invocationCount.current++;
		if (invocationCount.current === 1 && token && email && loading) {
			checkEmailVerification(token, email);
		}
	});


	// const navigateToMFASetUp = () => {
	// 		navigate(`/2fa-enroll?continueUrl=${continueUrl}`, { replace: true });
	// 	};
	const navigateToLogin = () => {
		navigate('/login', { replace: true });
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
					continueUrl={continueUrl}
					showButton={loading ? false : true}
					header={loading ? 'Please be patient' : 'Email Verified'}
					imageLink={loading ? '' : successImage}
				/>
			);
		} else if (errorMessage) {
			return (
				<FeedbackContent
					content={(errorMessage as string) || 'An error occurred'}
					continueUrl={continueUrl}
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
				{renderViewContent()}
			</Box>
		</Container>
	);
};

export default EmailVerification;
