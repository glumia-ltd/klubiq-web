import { ReactNode } from 'react';

export interface InfoCardItem {
  id: string | number;
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}

export interface InfoCardProps {
  title: string;
  items: InfoCardItem[];
} 