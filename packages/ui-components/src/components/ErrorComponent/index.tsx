import { Box, Button, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

interface ErrorComponentProps {
  message?: string
  onRetry?: () => void
  retryText?: string
}

const ErrorComponent = ({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try again',
}: ErrorComponentProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
      }}
    >
      <ErrorOutline color="error" sx={{ fontSize: 48, mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        Error
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </Box>
  )
}

export default ErrorComponent 