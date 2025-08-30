import type { Meta, StoryObj } from '@storybook/react';
import { DocumentList } from './DocumentList';
import { Description } from '@mui/icons-material';

const meta: Meta<typeof DocumentList> = {
  title: 'Components/DocumentList',
  component: DocumentList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DocumentList>;

export const Default: Story = {
  args: {
    title: 'Application Documents',
    items: [
      {
        id: 1,
        icon: <Description />,
        name: 'Rental Application Form',
        addedDate: 'Jan 10, 2023',
        onDownload: () => alert('Downloading Rental Application Form'),
      },
      {
        id: 2,
        icon: <Description />,
        name: 'Credit Report',
        addedDate: 'Jan 15, 2023',
        onDownload: () => alert('Downloading Credit Report'),
      },
    ],
  },
}; 