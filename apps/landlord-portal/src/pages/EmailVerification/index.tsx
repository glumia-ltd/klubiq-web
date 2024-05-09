import { FC } from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import FeedbackContent from '../../components/FeedbackContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { applyActionCode } from 'firebase/auth';
import successImage from '../../assets/images/circle-ok.svg';
import errorImage from '../../assets/images/error.svg';
import { firebaseResponseObject } from '../../helpers/FirebaseResponse';

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
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
      await applyActionCode(auth, oobCode);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMessage(firebaseResponseObject[(error as Error).message]);
    }
  };

  useEffect(() => {
    if (oobCode && loading) {
      checkEmailVerification(oobCode);
    }
  }, []);

  const navigateToContinueUrl = () => {
    continueUrl && navigate(continueUrl, { replace: true });
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
    <Grid container spacing={1} bgcolor='white'>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Box
          sx={{
            // minHeight: 280,
            px: 8,
            py: 6,
            minWidth: 485,
            maxWidth: 725,
            alignSelf: 'center',
            marginTop: '205px',
          }}
        >
          {/* <FeedbackContent
            content="A verification link has been sent to your email address. Please check your email and click on the link to continue"
            type="error"
            onClick={()=>console.log("here")}

          /> */}
          {renderViewContent()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
