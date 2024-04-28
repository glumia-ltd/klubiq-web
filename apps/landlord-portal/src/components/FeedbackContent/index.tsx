import { Stack, Typography, Button } from '@mui/material';
import Logo1 from '../../assets/images/circle-ok.svg';
import Logo2 from '../../assets/images/error.svg';

interface FeedbackProps {
  content: string;
  type: 'success' | 'error';
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
const FeedbackContent = ({ content, type, onClick }: FeedbackProps) => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent='center'
      spacing={1}
      sx={{ minWidth: '650px' }}
    >
      {type === 'success' ? (
        <>
          {' '}
          <div style={{ marginBottom: '32px' }}>
            <img src={Logo1} alt='logo' width={'100px'} height={'100px'} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Typography align='center' fontSize={'30px'} fontWeight={700}>
              {'Email Verified '}
            </Typography>{' '}
          </div>
          <div style={{ marginBottom: '30px' }}>
            <Typography fontSize={'18px'} fontWeight={500} textAlign={'left'}>
              {content || 'Verify Your '}
            </Typography>
          </div>
          <Button
            onClick={onClick}
            sx={{
              border: '1px solid #002147',
              color: 'white',
              background: '#002147',
              height: '40px',
              width: '90px',
              borderRadius: '8px',
              '&:hover': {
                color: '#002147',
                background: '#FFFFFF',
                cursor: 'pointer',
              },
            }}
          >
            Sign In
          </Button>
        </>
      ) : type === 'error' ? (
        <>
          {' '}
          <div style={{ marginBottom: '32px' }}>
            <img src={Logo2} alt='logo' width={'100px'} height={'100px'} />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <Typography align='center' fontSize={'30px'} fontWeight={700}>
              {'Verify Your Email '}
            </Typography>
          </div>
          <div>
            <Typography fontSize={'18px'} fontWeight={500} textAlign={'left'}>
              {content}
            </Typography>
          </div>
        </>
      ) : null}
    </Stack>
  );
};

export default FeedbackContent;
