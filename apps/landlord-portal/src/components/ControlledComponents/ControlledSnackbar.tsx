import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Alert } from '@mui/material';

type Props = {
  message: string;
  autoHideDuration: number;
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
  };
  severity: 'success' | 'info' | 'warning' | 'error';
};

function ControlledSnackbar({
  message,
  autoHideDuration,
  anchorOrigin,
  severity,
}: Props): JSX.Element | null {
  const [notiOpen, setNotiOpen] = useState(true);

  if (!message) {
    return null;
  }

  return (
    <Snackbar
      open={notiOpen}
      autoHideDuration={autoHideDuration}
      onClose={() => setNotiOpen(false)}
      message={message}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={() => setNotiOpen(false)}
        severity={severity}
        variant='filled'
        sx={{
          width: '100%',
          fontFamily: 'Maven Pro, sans-serif',
          fontSize: '16px',
        }}
        action={
          <>
            <Button
              color='secondary'
              size='small'
              onClick={() => setNotiOpen(false)}
            >
              Close
            </Button>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setNotiOpen(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
export default ControlledSnackbar;
