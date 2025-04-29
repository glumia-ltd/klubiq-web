import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import ControlledSelect from './index'

const meta: Meta<typeof ControlledSelect> = {
  title: 'Components/ControlledSelect',
  component: ControlledSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
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
type Story = StoryObj<typeof ControlledSelect>

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const Template = (args: any) => {
  const { control } = useForm()
  return <ControlledSelect control={control} name="select" options={options} {...args} />
}

export const Default: Story = {
  render: Template,
  args: {
    label: 'Select Option',
  },
}

export const Required: Story = {
  render: Template,
  args: {
    label: 'Required Select',
    required: true,
  },
}

export const Disabled: Story = {
  render: Template,
  args: {
    label: 'Disabled Select',
    disabled: true,
  },
}

export const WithError: Story = {
  render: Template,
  args: {
    label: 'Select with Error',
    error: true,
  },
} 