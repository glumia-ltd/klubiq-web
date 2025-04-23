import { Box, Typography } from '@mui/material'
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material'

type FeedbackType = 'success' | 'error' | 'warning' | 'info'

interface FeedbackContentProps {
  type: FeedbackType
  title: string
  message: string
  icon?: React.ReactNode
}

const getIcon = (type: FeedbackType) => {
  switch (type) {
    case 'success':
      return <CheckCircle color="success" sx={{ fontSize: 40 }} />
    case 'error':
      return <Error color="error" sx={{ fontSize: 40 }} />
    case 'warning':
      return <Warning color="warning" sx={{ fontSize: 40 }} />
    case 'info':
      return <Info color="info" sx={{ fontSize: 40 }} />
    default:
      return null
  }
}

const FeedbackContent = ({ type, title, message, icon }: FeedbackContentProps) => {
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
      {icon || getIcon(type)}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

export default FeedbackContent 