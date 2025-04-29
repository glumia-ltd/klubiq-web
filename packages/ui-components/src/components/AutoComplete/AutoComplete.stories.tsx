import type { Meta, StoryObj } from '@storybook/react'
import AutoComplete from '.'

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof AutoComplete>

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
]

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Select an option',
    options,
  },
}

export const WithValue: Story = {
  args: {
    label: 'With Value',
    placeholder: 'Select an option',
    options,
    value: 'Option 1',
  },
}

export const Multiple: Story = {
  args: {
    label: 'Multiple Select',
    placeholder: 'Select multiple options',
    multiple: true,
    options,
    value: ['Option 1', 'Option 2'],
  },
}

export const Required: Story = {
  args: {
    label: 'Required',
    placeholder: 'Select an option',
    required: true,
    options,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Select an option',
    disabled: true,
    options,
  },
}

export const WithError: Story = {
  args: {
    label: 'With Error',
    placeholder: 'Select an option',
    error: true,
    helperText: 'This field has an error',
    options,
  },
} 