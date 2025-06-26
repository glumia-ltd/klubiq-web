import { ReactNode } from 'react';
import { AvatarItem } from '../DynamicAvatar/types';
import { InfoCardItem } from '../InfoCard/types';
import { DocumentListItem } from '../DocumentList/types';

export type PageDetailVariant = 'tenant-detail' | 'lease-detail' | 'property-detail';

export interface PageDetailHeaderData {
  avatar: AvatarItem;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  status: 'Active' | 'Inactive' | string;
}

export interface TabInfo {
    label: string;
    content: React.ReactNode;
}

export interface InfoCardSection {
    id: string | number;
    type: 'infoCard';
    title: string;
    items: InfoCardItem[];
}

export interface DocumentListSection {
    id: string | number;
    type: 'documentList';
    title:string;
    items: DocumentListItem[];
}

export interface CustomSection {
    id: string | number;
    type: 'custom';
    content: ReactNode;
}

export type DetailSection = InfoCardSection | DocumentListSection | CustomSection;

export interface PageDetailProps {
  variant: PageDetailVariant;
  headerData: PageDetailHeaderData;
  detailSections?: DetailSection[];
  showTabs?: boolean;
  tabs?: TabInfo[];
  onClose?: () => void;
  loading?: boolean;
  displayMode?: 'container' | 'modal';
  position?: 'left' | 'right';
} 