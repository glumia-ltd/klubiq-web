import type { Meta, StoryObj } from '@storybook/react'
import FeedbackContent from './index'

const meta: Meta<typeof FeedbackContent> = {
  title: 'Components/FeedbackContent',
  component: FeedbackContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof FeedbackContent>

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'This action cannot be undone.',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'Please review the details before proceeding.',
  },
} 