import type { Meta, StoryObj } from '@storybook/react';
import { PageDetail } from './PageDetail';
import { HomeOutlined, CalendarToday, AttachMoney, CheckCircle, Description } from '@mui/icons-material';
import { Chip, Typography } from '@mui/material';
import { DocumentList } from '../DocumentList';

const meta: Meta<typeof PageDetail> = {
  title: 'Components/PageDetail',
  component: PageDetail,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageDetail>;

const headerData = {
    avatar: { id: '1', name: 'Ngozi Nwosu', image: 'https://i.pravatar.cc/150?img=1' },
    name: 'Ngozi Nwosu',
    email: 'ngozi.n@example.com',
    phone: '+234 903 456 7890',
    status: 'Active',
};

const propertyInfo = [
    {
      id: 1,
      icon: <HomeOutlined />,
      label: 'Oakwood Residences',
      value: <Typography variant="body1" fontWeight={500}>Unit 7B</Typography>,
    },
];

const leaseInfo = [
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
];

const paymentStatus = [
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
];

const applicationDocuments = [
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
];

export const TenantDetail: Story = {
  args: {
    variant: 'tenant-detail',
    headerData,
    detailSections: [
        { id: 'propInfo', type: 'infoCard', title: 'Property Information', items: propertyInfo },
        { id: 'leaseInfo', type: 'infoCard', title: 'Lease Information', items: leaseInfo },
        { id: 'paymentStatus', type: 'infoCard', title: 'Payment Status', items: paymentStatus },
        { id: 'appDocs', type: 'documentList', title: 'Application Documents', items: applicationDocuments },
    ],
    onClose: () => alert('Close clicked'),
  },
};

export const WithoutCloseButton: Story = {
    args: {
      ...TenantDetail.args,
      onClose: undefined,
    },
  };

export const WithoutTabs: Story = {
    args: {
      variant: 'tenant-detail',
      headerData,
      detailSections: [
        { id: 'propInfo', type: 'infoCard', title: 'Property Information', items: propertyInfo },
        { id: 'leaseInfo', type: 'infoCard', title: 'Lease Information', items: leaseInfo },
        { id: 'paymentStatus', type: 'infoCard', title: 'Payment Status', items: paymentStatus },
        { id: 'appDocs', type: 'documentList', title: 'Application Documents', items: applicationDocuments },
      ],
      showTabs: false,
      onClose: () => alert('Close clicked'),
    },
  };
  
export const WithCustomTabs: Story = {
    args: {
      variant: 'tenant-detail',
      headerData,
      showTabs: true,
      tabs: [
          {label: "Overview", content: <Typography>This is a custom overview tab.</Typography>},
          {label: "Documents", content: <DocumentList title="Application Documents" items={applicationDocuments} />},
          {label: "History", content: <Typography>This is the history tab.</Typography>},
      ],
      onClose: () => alert('Close clicked'),
    },
  };

export const Loading: Story = {
    args: {
        ...TenantDetail.args,
        loading: true,
    },
}; 