import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import ControlledPasswordField from './index'

const meta: Meta<typeof ControlledPasswordField> = {
  title: 'Components/ControlledPasswordField',
  component: ControlledPasswordField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof ControlledPasswordField>

const Template = (args: any) => {
  const { control } = useForm()
  return <ControlledPasswordField control={control} name="password" {...args} />
}

export const Default: Story = {
  render: Template,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
}

export const Required: Story = {
  render: Template,
  args: {
    label: 'Required Password',
    placeholder: 'This field is required',
    required: true,
  },
}

export const Disabled: Story = {
  render: Template,
  args: {
    label: 'Disabled Password',
    placeholder: 'This field is disabled',
    disabled: true,
  },
}

export const WithError: Story = {
  render: Template,
  args: {
    label: 'Password with Error',
    placeholder: 'This field has an error',
    error: true,
    helperText: 'Password must be at least 8 characters',
  },
} 