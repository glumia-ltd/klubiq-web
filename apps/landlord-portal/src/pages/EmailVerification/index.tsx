import { FC } from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import FeedbackContent from '../../components/FeedbackContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { applyActionCode } from 'firebase/auth';

interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
  const [loading, setLoading] = useState(true);
  const [verifySuccess] = useState(true);
  const [error] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  console.log(oobCode);
  const continueUrl = searchParams.get('continueUrl');

  useEffect(() => {
    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          console.log('Email address verified.');
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [oobCode]);

  const navigateToContinueUrl = () => {
    continueUrl && navigate(continueUrl, { replace: true });
  };

  const renderViewContent = () => {
    if (verifySuccess)
      return (
        <FeedbackContent
          content={
            loading
              ? 'Verifying your email address...'
              : 'Your Email Address has been verified. You can continue using the application.'
          }
          onClick={navigateToContinueUrl}
          type='success'
        />
      );
    if (error)
      return (
        <FeedbackContent
          content='A verification link has been sent to your email address. Please check your email and click on the link to continue'
          type='error'
          onClick={() => console.log('here')}
        />
      );
    else return null;
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
