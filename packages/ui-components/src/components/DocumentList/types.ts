import { ReactNode } from 'react';

export interface DocumentListItem {
  id: string | number;
  icon?: ReactNode;
  name: string;
  addedDate: string;
  onDownload: () => void;
}

export interface DocumentListProps {
  title: string;
  items: DocumentListItem[];
  elevation?: number;
} 