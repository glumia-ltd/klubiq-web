import type { Meta, StoryObj } from '@storybook/react'
import ErrorComponent from './index'

const meta: Meta<typeof ErrorComponent> = {
  title: 'Components/ErrorComponent',
  component: ErrorComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
    },
    retryText: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ErrorComponent>

export const Default: Story = {
  args: {
    message: 'An unexpected error occurred. Please try again later.',
  },
}

export const WithRetry: Story = {
  args: {
    message: 'Failed to load data. Please try again.',
    retryText: 'Retry',
  },
  render: (args) => (
    <ErrorComponent
      {...args}
      onRetry={() => alert('Retrying...')}
    />
  ),
}

export const CustomMessage: Story = {
  args: {
    message: 'The service is currently unavailable. We are working on fixing the issue.',
    retryText: 'Check Status',
  },
  render: (args) => (
    <ErrorComponent
      {...args}
      onRetry={() => alert('Checking service status...')}
    />
  ),
} 