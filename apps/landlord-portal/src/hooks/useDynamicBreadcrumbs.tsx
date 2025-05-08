import { useCallback, useContext, useMemo } from 'react';
import {
	BreadcrumbContext,
	BreadcrumbItem,
} from '../context/BreadcrumbContext/BreadcrumbContext';
import { isEmpty } from 'lodash';

export const useDynamicBreadcrumbs = () => {
	const { breadcrumbLabels, setBreadcrumbData } = useContext(BreadcrumbContext);

	// Return the breadcrumb items based on what has been saved in context
	const breadcrumbs = useMemo(
		() =>
			Object.entries(breadcrumbLabels)
				.filter(([, item]) => !isEmpty(item))
				.map(([path, item]) => ({
					path,
					...item,
				})),
		[breadcrumbLabels],
	);

	const updateBreadcrumb = useCallback(
		(data: Record<string, BreadcrumbItem>) => {
			// If data is empty, clear all breadcrumbs
			if (Object.keys(data).length === 0) {
				setBreadcrumbData({});
				return;
			}

			// For new breadcrumbs, start fresh
			setBreadcrumbData(data);
		},
		[setBreadcrumbData],
	);

	return { breadcrumbs, updateBreadcrumb };
};
