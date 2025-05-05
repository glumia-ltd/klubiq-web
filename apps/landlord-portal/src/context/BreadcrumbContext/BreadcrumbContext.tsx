import { createContext, useState, useMemo, ReactNode } from "react";
export interface BreadcrumbItem {
  path?: string;
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  showIcon?: boolean;
  isSectionRoot?: boolean;
  isHome?: boolean;
}
export interface BreadcrumbContextType {
  breadcrumbLabels: Record<string, BreadcrumbItem>;
  setBreadcrumbData: (data: Record<string, BreadcrumbItem>) => void;
  clearBreadcrumbData: () => void;
}

export const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbLabels: {},
  setBreadcrumbData: () => {},
  clearBreadcrumbData: () => {},
});

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbLabels, setBreadcrumbLabels] = useState<Record<string, BreadcrumbItem>>({});

  const setBreadcrumbData = (data: Record<string, BreadcrumbItem>) => {
    setBreadcrumbLabels((prev) => ({ ...prev, ...data }));
  };

  const clearBreadcrumbData = () => setBreadcrumbLabels({});

  const value = useMemo(
    () => ({
      breadcrumbLabels,
      setBreadcrumbData,
      clearBreadcrumbData,
    }),
    [breadcrumbLabels]
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};