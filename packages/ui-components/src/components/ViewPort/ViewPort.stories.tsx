import type { Meta, StoryObj } from '@storybook/react'
import ViewPort from '.'

const meta: Meta<typeof ViewPort> = {
  title: 'Components/ViewPort',
  component: ViewPort,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ViewPort>

const Content = () => (
  <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '4px' }}>
    Sample Content
  </div>
)

export const Default: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: 'lg',
    centered: true,
  },
}

export const Small: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: 'sm',
  },
}

export const Medium: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: 'md',
  },
}

export const Large: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: 'lg',
  },
}

export const ExtraLarge: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: 'xl',
  },
}

export const NotCentered: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    centered: false,
  },
}

export const FullWidth: Story = {
  render: (args) => (
    <ViewPort {...args}>
      <Content />
    </ViewPort>
  ),
  args: {
    maxWidth: undefined,
    centered: false,
  },
} 