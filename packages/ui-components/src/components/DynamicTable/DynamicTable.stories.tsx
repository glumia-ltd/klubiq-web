import type { Meta, StoryObj } from '@storybook/react';
import { DynamicTable, TableColumn } from './DynamicTable';
import { Typography } from '@mui/material';
import { DynamicAvatar } from '../DynamicAvatar/DynamicAvatar';
import { Stack } from '@mui/material';

const meta: Meta<typeof DynamicTable> = {
  title: 'Components/DynamicTable',
  component: DynamicTable,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DynamicTable>;

const columns: TableColumn[] = [
  {
    key: 'tenant',
    label: 'Tenant',
    render: (row: any) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <DynamicAvatar items={[row.tenant]} size="small" />
        <Typography fontWeight={600}>{row.tenant.name}</Typography>
      </Stack>
    ),
  },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'cutOffDate', label: 'Cut-off date' },
];

const rows = [
  {
    id: 1,
    tenant: { name: 'Aisha Rohni', image: '/static/images/avatar/1.jpg' },
    phone: '0701234567',
    email: 'aisha@yahoo.com',
    startDate: 'April 4, 2024',
    cutOffDate: 'May 4, 2024',
  },
  {
    id: 2,
    tenant: { name: 'Bukky King', image: '/static/images/avatar/2.jpg' },
    phone: '08052777580',
    email: 'bking@gmail.com',
    startDate: 'July 29, 2023',
    cutOffDate: 'July 29, 2025',
  },
];

export const Default: Story = {
  args: {
    columns,
    rows,
    header: 'Tenant',
    buttonLabel: 'Add Tenant',
    onButtonClick: () => alert('Add Tenant Clicked'),
  },
};