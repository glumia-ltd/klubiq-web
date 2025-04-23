import type { Meta, StoryObj } from '@storybook/react'
import GroupedAvatar from './index'

const meta: Meta<typeof GroupedAvatar> = {
  title: 'Components/GroupedAvatar',
  component: GroupedAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: 'number',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    spacing: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
    },
  },
}

export default meta
type Story = StoryObj<typeof GroupedAvatar>

const avatars = [
  {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User 1',
  },
  {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'User 2',
  },
  {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User 3',
  },
  {
    src: 'https://i.pravatar.cc/150?img=4',
    alt: 'User 4',
  },
  {
    src: 'https://i.pravatar.cc/150?img=5',
    alt: 'User 5',
  },
]

export const Default: Story = {
  args: {
    avatars,
  },
}

export const SmallSize: Story = {
  args: {
    avatars,
    size: 'small',
  },
}

export const LargeSize: Story = {
  args: {
    avatars,
    size: 'large',
  },
}

export const Rounded: Story = {
  args: {
    avatars,
    variant: 'rounded',
  },
}

export const CustomMax: Story = {
  args: {
    avatars,
    max: 3,
  },
} 