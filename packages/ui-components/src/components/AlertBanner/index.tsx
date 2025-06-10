import { Alert, AlertProps, Snackbar } from '@mui/material'
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
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} {...alertProps}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertBanner 