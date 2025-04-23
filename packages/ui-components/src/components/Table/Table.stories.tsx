import type { Meta, StoryObj } from '@storybook/react';
import { Table, Column } from './index';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const meta: Meta<typeof Table<User>> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

const columns: Column<User>[] = [
  { id: 'name', label: 'Name', minWidth: 170, sortable: true },
  { id: 'email', label: 'Email', minWidth: 170, sortable: true },
  { id: 'role', label: 'Role', minWidth: 100, sortable: true },
  { id: 'status', label: 'Status', minWidth: 100, sortable: true },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
];

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found',
  },
};

export const WithSorting: Story = {
  render: () => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof User>('name');

    const handleRequestSort = (property: keyof User) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return (
      <Table
        columns={columns}
        data={sortedData}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
    );
  },
}; 