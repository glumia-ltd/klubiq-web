import type { Meta, StoryObj } from '@storybook/react';
import { ActivityCard, PaletteColor } from './ActivityCard';
import { MonetizationOn, Build, Message } from '@mui/icons-material';

const meta: Meta<typeof ActivityCard> = {
  title: 'Components/ActivityCard',
  component: ActivityCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A dynamic activity card component that can display various types of content in different formats.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

const defaultItems = [
  {
    id: 1,
    title: 'Rent Payment Processed',
    subtitle: '₦450,000',
    timestamp: 'Aug 1, 2023',
    icon: <MonetizationOn />,
  },
  {
    id: 2,
    title: 'Maintenance Request Updated',
    subtitle: 'Kitchen faucet',
    timestamp: 'Aug 18, 2023',
    icon: <Build />,
  },
  {
    id: 3,
    title: 'Message from Property Manager',
    subtitle: 'Pool maintenance schedule',
    timestamp: 'Aug 15, 2023',
    icon: <Message />,
  },
];

const alertItems = defaultItems.map((item, index) => ({
  ...item,
  variant: ['success', 'warning', 'info'][index] as PaletteColor,
}));

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithAlerts: Story = {
  args: {
    items: alertItems,
    variant: 'alerts',
  },
};

export const WithCustomContent: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      content: (
        <div key={item.id} style={{ padding: '16px', border: '1px solid #ddd', marginBottom: '8px' }}>
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
          <small>{item.timestamp}</small>
        </div>
      ),
    })),
    variant: 'custom',
  },
};

export const WithViewAll: Story = {
  args: {
    items: defaultItems,
    onViewAllClick: () => console.log('View all clicked'),
  },
};

export const WithSubtitle: Story = {
  args: {
    items: defaultItems,
    subtitle: 'Your recent transactions and updates',
  },
};

export const LimitedItems: Story = {
  args: {
    items: defaultItems,
    maxItems: 2,
  },
}; 