import type { Meta, StoryObj } from '@storybook/react'
import CustomStepper from './index'
import { Check, Settings, ShoppingCart } from '@mui/icons-material'

const meta: Meta<typeof CustomStepper> = {
  title: 'Components/CustomStepper',
  component: CustomStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: 'number',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    alternativeLabel: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof CustomStepper>

const steps = [
  {
    label: 'Select campaign settings',
    description: 'For each ad campaign that you create, you can control how much you\'re willing to spend on clicks and conversions.',
    icon: <Settings />,
  },
  {
    label: 'Create an ad group',
    description: 'An ad group contains one or more ads which target a shared set of keywords.',
    icon: <ShoppingCart />,
  },
  {
    label: 'Create an ad',
    description: 'Try out different ad text to see what brings in the most customers.',
    icon: <Check />,
  },
]

export const Default: Story = {
  args: {
    steps,
    activeStep: 1,
  },
}

export const Vertical: Story = {
  args: {
    steps,
    activeStep: 1,
    orientation: 'vertical',
    alternativeLabel: false,
  },
}

export const WithDisabledStep: Story = {
  args: {
    steps: [
      ...steps,
      {
        label: 'Review',
        description: 'Review your campaign settings before proceeding.',
        disabled: true,
      },
    ],
    activeStep: 1,
  },
} 