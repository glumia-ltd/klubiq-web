import type { Meta, StoryObj } from '@storybook/react';
import { DynamicAvatar } from './DynamicAvatar';

const meta: Meta<typeof DynamicAvatar> = {
  title: 'Components/DynamicAvatar',
  component: DynamicAvatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DynamicAvatar>;

const sampleItems = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://mui.com/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: null,
  },
  {
    id: 3,
    label: 'Robert Johnson',
    image: 'https://mui.com/static/images/avatar/3.jpg',
  },
  {
    id: 4,
    name: 'Alice Brown',
    image: null,
  },
  {
    id: 5,
    label: 'Charlie Wilson',
    image: 'https://mui.com/static/images/avatar/5.jpg',
  },
];

export const SingleAvatar: Story = {
  args: {
    items: [sampleItems[0]],
    size: 'medium',
  },
};

export const GroupedAvatars: Story = {
  args: {
    items: sampleItems,
    maxDisplayed: 3,
    spacing: 'medium',
    size: 'medium',
    showTotal: true,
  },
};

export const SmallAvatars: Story = {
  args: {
    items: sampleItems,
    maxDisplayed: 4,
    spacing: 'small',
    size: 'small',
  },
};

export const LargeAvatars: Story = {
  args: {
    items: sampleItems,
    maxDisplayed: 2,
    spacing: 8,
    size: 'large',
  },
};

export const NoImages: Story = {
  args: {
    items: sampleItems.map(item => ({ ...item, image: null })),
    maxDisplayed: 3,
  },
};