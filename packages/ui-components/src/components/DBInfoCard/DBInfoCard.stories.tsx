import React from 'react';
import { DBInfoCard, DBInfoCardProps } from './DBInfoCard';
import { MonetizationOn } from '@mui/icons-material';
import { Button, useTheme } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DBInfoCard> = {
  title: 'Components/DBInfoCard',
  component: DBInfoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dynamic, theme-aware, responsive info card for dashboards.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'primary', 'secondary', 'custom'],
    },
    backgroundColor: { control: 'color' },
    badgeColor: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof DBInfoCard>;

export const Default: Story = {
  args: {
    icon: <MonetizationOn fontSize="large" color="primary" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
  },
};

export const Gradient: Story = {
  args: {
    icon: <MonetizationOn fontSize="large" sx={{ color: '#615FFF' }} />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'gradient',
  },
};

export const Primary: Story = {
  args: {
    icon: <MonetizationOn fontSize="large" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'primary',
  },
};

export const CustomBackground: Story = {
  args: {
    icon: <MonetizationOn fontSize="large" sx={{ color: '#fff' }} />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    variant: 'custom',
    backgroundColor: '#22223b',
    badgeColor: '#caff70',
  },
};

export const WithDynamicContent: Story = {
  args: {
    icon: <MonetizationOn fontSize="large" color="primary" />,
    amount: '$68k',
    label: 'Monthly Rent',
    badgeText: 'Due Sep 1',
    children: <Button variant="contained" color="primary">Pay Now</Button>,
  },
}; 