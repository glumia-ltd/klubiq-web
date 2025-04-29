import type { Meta, StoryObj } from '@storybook/react'
import AlertBanner from './index'

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    message: {
      control: 'text',
    },
    autoHideDuration: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof AlertBanner>

export const Success: Story = {
  args: {
    severity: 'success',
    message: 'Operation completed successfully!',
  },
}

export const Error: Story = {
  args: {
    severity: 'error',
    message: 'An error occurred. Please try again.',
  },
}

export const Warning: Story = {
  args: {
    severity: 'warning',
    message: 'Please review your changes before proceeding.',
  },
}

export const Info: Story = {
  args: {
    severity: 'info',
    message: 'New features are available!',
  },
} 