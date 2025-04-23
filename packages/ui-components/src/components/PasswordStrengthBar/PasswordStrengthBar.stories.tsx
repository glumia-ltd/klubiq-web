import type { Meta, StoryObj } from '@storybook/react'
import PasswordStrengthBar from './index'

const meta: Meta<typeof PasswordStrengthBar> = {
  title: 'Components/PasswordStrengthBar',
  component: PasswordStrengthBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    password: {
      control: 'text',
    },
    minLength: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof PasswordStrengthBar>

export const VeryWeak: Story = {
  args: {
    password: '123',
    minLength: 8,
  },
}

export const Weak: Story = {
  args: {
    password: 'password123',
    minLength: 8,
  },
}

export const Fair: Story = {
  args: {
    password: 'Password123',
    minLength: 8,
  },
}

export const Good: Story = {
  args: {
    password: 'Password123!',
    minLength: 8,
  },
}

export const Strong: Story = {
  args: {
    password: 'P@ssw0rd123!@#',
    minLength: 8,
  },
} 