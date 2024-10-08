import { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import FeedbackContent from '../../components/FeedbackContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { applyActionCode } from 'firebase/auth';
import successImage from '../../assets/images/circle-ok.svg';
import errorImage from '../../assets/images/error.svg';
import { Container } from '@mui/system';

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
	const invocationCount = useRef(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// const mode = searchParams.get('mode');
	const oobCode = searchParams.get('oobCode');
	const continueUrl = searchParams.get('continueUrl');

	const checkEmailVerification = async (oobCode: string) => {
		try {
			applyActionCode(auth, oobCode);
			setLoading(false);
			setError(false);
		} catch (error) {
			console.log('verification error: ', error);
			setLoading(false);
			setErrorMessage('Verification Code expired. Contact Support');
			setError(true);
		}
	};

	useEffect(() => {
		invocationCount.current++;
		if (invocationCount.current === 1 && oobCode && loading) {
			checkEmailVerification(oobCode);
		}
	});
	const navigateToContinueUrl = () => {
		continueUrl && navigate(continueUrl, { replace: true });
	};
	const navigateToMFASetUp = () => {
		navigate(`/2fa-enroll`, { replace: true });
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
			<Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
				{renderViewContent()}
			</Box>
		</Container>
	);
};

export default EmailVerification;
