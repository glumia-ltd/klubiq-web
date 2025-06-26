import { Alert, AlertProps, Snackbar, useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'

interface AlertBannerProps extends AlertProps {
  message: string
  open?: boolean
  autoHideDuration?: number
  onClose?: () => void
}

const AlertBanner = ({
  message,
  open = true,
  autoHideDuration = 6000,
  onClose,
  ...alertProps
}: AlertBannerProps) => {
  const [isOpen, setIsOpen] = useState(open)
  const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: isMobile ? 'bottom' : 'top', horizontal: isMobile ? 'center' : 'right' }}
    >
      <Alert onClose={handleClose} {...alertProps}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertBanner 