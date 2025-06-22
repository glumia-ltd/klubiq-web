import type { Meta, StoryObj } from '@storybook/react';
import { InfoCard } from './InfoCard';
import { HomeOutlined, CalendarToday, AttachMoney, CheckCircle } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';

const meta: Meta<typeof InfoCard> = {
  title: 'Components/InfoCard',
  component: InfoCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const PropertyInformation: Story = {
  args: {
    title: 'Property Information',
    items: [
      {
        id: 1,
        icon: <HomeOutlined />,
        label: 'Oakwood Residences',
        value: <Typography variant="body1" fontWeight={500}>Unit 7B</Typography>,
      },
    ],
  },
};

export const LeaseInformation: Story = {
  args: {
    title: 'Lease Information',
    items: [
      {
        id: 1,
        icon: <CalendarToday />,
        label: 'Start Date',
        value: 'Apr 1, 2023',
      },
      {
        id: 2,
        icon: <CalendarToday />,
        label: 'End Date',
        value: 'Mar 31, 2024',
      },
      {
        id: 3,
        icon: <AttachMoney />,
        label: 'Rent',
        value: '$1,850/month',
      },
    ],
  },
};

export const PaymentStatus: Story = {
  args: {
    title: 'Payment Status',
    items: [
      {
        id: 1,
        icon: <CheckCircle />,
        label: 'Status',
        value: <Chip label="Paid" color="success" size="small" />,
      },
      {
        id: 2,
        icon: <CalendarToday />,
        label: 'Last Payment',
        value: 'Aug 1, 2023',
      },
    ],
  },
}; 