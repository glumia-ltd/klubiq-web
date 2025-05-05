import { useCallback, useContext, useMemo } from "react";
import { BreadcrumbContext, BreadcrumbItem } from "../context/BreadcrumbContext/BreadcrumbContext";

export const useDynamicBreadcrumbs = () => {
  const { breadcrumbLabels, setBreadcrumbData } = useContext(BreadcrumbContext);

  // Return the breadcrumb items based on what has been saved in context
  const breadcrumbs = useMemo(() => {
    return Object.entries(breadcrumbLabels).map(([path, item]) => ({
      path,
      ...item,
    }));
  }, [breadcrumbLabels]);

  const updateBreadcrumb = useCallback(
    (data: Record<string, BreadcrumbItem>) => {
      setBreadcrumbData(data);
    },
    [setBreadcrumbData]
  );

  return { breadcrumbs, updateBreadcrumb };
};