import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DataPagination from './index'

const meta: Meta<typeof DataPagination> = {
  title: 'Components/DataPagination',
  component: DataPagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalItems: {
      control: 'number',
    },
    itemsPerPage: {
      control: 'number',
    },
    currentPage: {
      control: 'number',
    },
    showCount: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof DataPagination>

const Template = (args: any) => {
  const [page, setPage] = useState(1)
  return <DataPagination {...args} currentPage={page} onPageChange={setPage} />
}

export const Default: Story = {
  render: Template,
  args: {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    showCount: true,
  },
}

export const WithoutCount: Story = {
  render: Template,
  args: {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    showCount: false,
  },
}

export const LargeDataset: Story = {
  render: Template,
  args: {
    totalItems: 1000,
    itemsPerPage: 25,
    currentPage: 1,
    showCount: true,
  },
}

export const SmallDataset: Story = {
  render: Template,
  args: {
    totalItems: 15,
    itemsPerPage: 5,
    currentPage: 1,
    showCount: true,
  },
} 