import type { Meta, StoryObj } from '@storybook/react';
import { AmenityCard } from './AmenityCard';
import { Pool, FitnessCenter, LocalParking, Wifi, Park } from '@mui/icons-material';
import { Typography } from '@mui/material';

const meta: Meta<typeof AmenityCard> = {
  title: 'Components/AmenityCard',
  component: AmenityCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive card component for displaying property amenities with icons and status.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AmenityCard>;

const defaultItems = [
  {
    id: 1,
    icon: <Pool />,
    title: 'Swimming Pool',
    subtitle: 'Available',
    available: true,
  },
  {
    id: 2,
    icon: <FitnessCenter />,
    title: 'Fitness Center',
    subtitle: 'Available',
    available: true,
  },
  {
    id: 3,
    icon: <LocalParking />,
    title: 'Parking',
    subtitle: 'Available',
    available: true,
  },
  {
    id: 4,
    icon: <Wifi />,
    title: 'Wi-Fi',
    subtitle: 'Available',
    available: true,
  },
  {
    id: 5,
    icon: <Park />,
    title: 'Garden',
    subtitle: 'Available',
    available: true,
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithUnavailableItems: Story = {
  args: {
    items: defaultItems.map((item, index) => ({
      ...item,
      available: index < 3,
      subtitle: index < 3 ? 'Available' : 'Not Available',
    })),
  },
};

export const CustomSpacing: Story = {
  args: {
    items: defaultItems,
    spacing: 2,
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Building Features',
    items: defaultItems,
  },
};

export const WithCustomContent: Story = {
  args: {
    items: defaultItems.map(item => ({
      ...item,
      customContent: (
        <Typography variant="caption" color="text.secondary">
          Additional details here
        </Typography>
      ),
    })),
  },
}; 