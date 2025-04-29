import { Box, Step, StepLabel, Stepper, StepperProps } from '@mui/material'
import { ReactNode } from 'react'

interface CustomStepperProps extends Omit<StepperProps, 'children'> {
  steps: {
    label: string
    description?: string
    icon?: ReactNode
    disabled?: boolean
  }[]
  activeStep: number
  orientation?: 'horizontal' | 'vertical'
  alternativeLabel?: boolean
}

const CustomStepper = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  alternativeLabel = true,
  ...props
}: CustomStepperProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        orientation={orientation}
        alternativeLabel={alternativeLabel}
        {...props}
      >
        {steps.map((step) => (
          <Step key={step.label} disabled={step.disabled}>
            <StepLabel
              optional={step.description ? <Box>{step.description}</Box> : null}
              icon={step.icon}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default CustomStepper 