import { Box, LinearProgress, Typography } from '@mui/material'
import { zxcvbn } from '@zxcvbn-ts/core'
import { useEffect, useState } from 'react'

interface PasswordStrengthBarProps {
  password: string
  minLength?: number
}

const PasswordStrengthBar = ({ password, minLength = 8 }: PasswordStrengthBarProps) => {
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (password.length >= minLength) {
      const result = zxcvbn(password)
      setScore(result.score)
      setFeedback(result.feedback.warning || '')
    } else {
      setScore(0)
      setFeedback(`Password must be at least ${minLength} characters`)
    }
  }, [password, minLength])

  const getColor = () => {
    switch (score) {
      case 0:
        return 'error'
      case 1:
        return 'error'
      case 2:
        return 'warning'
      case 3:
        return 'info'
      case 4:
        return 'success'
      default:
        return 'error'
    }
  }

  const getStrengthText = () => {
    switch (score) {
      case 0:
        return 'Very Weak'
      case 1:
        return 'Weak'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      default:
        return 'Very Weak'
    }
  }

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={(score / 4) * 100}
        color={getColor()}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" color={getColor()}>
          {getStrengthText()}
        </Typography>
        {feedback && (
          <Typography variant="caption" color="error">
            {feedback}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default PasswordStrengthBar 