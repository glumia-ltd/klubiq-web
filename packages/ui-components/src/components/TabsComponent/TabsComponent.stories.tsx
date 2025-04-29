import type { Meta, StoryObj } from '@storybook/react'
import TabsComponent from './index'
import { Home, Settings, Info } from '@mui/icons-material'

const meta: Meta<typeof TabsComponent> = {
  title: 'Components/TabsComponent',
  component: TabsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof TabsComponent>

export const Basic: Story = {
  args: {
    tabs: [
      {
        label: 'Home',
        content: <div>Home Content</div>,
        icon: <Home />,
      },
      {
        label: 'Settings',
        content: <div>Settings Content</div>,
        icon: <Settings />,
      },
      {
        label: 'Info',
        content: <div>Info Content</div>,
        icon: <Info />,
      },
    ],
  },
}

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      {
        label: 'Home',
        content: <div>Home Content</div>,
        icon: <Home />,
      },
      {
        label: 'Settings',
        content: <div>Settings Content</div>,
        icon: <Settings />,
        disabled: true,
      },
      {
        label: 'Info',
        content: <div>Info Content</div>,
        icon: <Info />,
      },
    ],
  },
} 