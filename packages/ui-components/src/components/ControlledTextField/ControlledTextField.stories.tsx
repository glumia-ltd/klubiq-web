import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import ControlledTextField from './index'

const meta: Meta<typeof ControlledTextField> = {
  title: 'Components/ControlledTextField',
  component: ControlledTextField,
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
type Story = StoryObj<typeof ControlledTextField>

const Template = (args: any) => {
  const { control } = useForm()
  return <ControlledTextField control={control} name="textField" {...args} />
}

export const Default: Story = {
  render: Template,
  args: {
    label: 'Text Field',
    placeholder: 'Enter text here',
  },
}

export const Required: Story = {
  render: Template,
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
}

export const Disabled: Story = {
  render: Template,
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
}

export const WithError: Story = {
  render: Template,
  args: {
    label: 'Field with Error',
    placeholder: 'This field has an error',
    error: true,
    helperText: 'This is an error message',
  },
} 