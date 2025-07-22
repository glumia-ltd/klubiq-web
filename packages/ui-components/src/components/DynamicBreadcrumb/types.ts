// packages/ui-components/src/components/DynamicBreadcrumb/types.ts
import { ReactNode } from 'react';

export interface BreadcrumbRoute {
  id: string | number;
  path: string;
  slug?: string;
  icon?: ReactNode;
}

export interface RouteConfig {
  path: string;
  slug: string;
  icon?: ReactNode;
  parent?: string; // parent route path
  dynamic?: boolean; // if route has dynamic segments like :id
  getSlug?: (params: Record<string, string>) => string; // function to generate slug for dynamic routes
}

export interface RouteMap {
  [key: string]: RouteConfig;
}

export interface DynamicBreadcrumbProps {
  currentPath: string;
  routeMap: RouteMap;
  onNavigate?: (path: string) => void;
  sx?: object;
  separator?: ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}