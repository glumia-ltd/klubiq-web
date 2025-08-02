import { useEffect, useMemo, useState } from 'react';
import { consoleDebug } from '../../helpers/debug-logger';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import {
	useLazyGetOrganizationActivitiesQuery,
	useLazyGetOrganizationMetricsQuery,
} from '../../store/DashboardStore/dashboardApiSlice';
import dayjs, { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';

export const useDashboardActions = () => {
	const { user } = useSelector(getAuthState);
	// const [downloadReport] = useDownloadReportMutation();

	const [firstDay, setFirstDay] = useState<Dayjs>(
		dayjs().subtract(11, 'months'),
	);
	const [secondDay, setSecondDay] = useState<Dayjs>(dayjs());

	// Memoize the date values to prevent unnecessary re-renders
	const dateRange = useMemo(
		() => ({
			startDate: firstDay?.format('YYYY-MM-DD'),
			endDate: secondDay?.format('YYYY-MM-DD'),
		}),
		[firstDay, secondDay],
	);

	const greeting = useMemo(() => {
		const hour = dayjs().hour();
		if (hour >= 17) {
			return 'Good Evening';
		}
		if (hour >= 12) {
			return 'Good Afternoon';
		}
		return 'Good Morning';
	}, []); // Empty dependency array since we only need this to calculate once per mount

	const [
		getOrganizationMetrics,
		{
			data: organizationMetrics,
			isLoading: isOrganizationMetricsLoading,
			error: organizationMetricsError,
		},
	] = useLazyGetOrganizationMetricsQuery();




	const [
		getOrganizationActivities,
		{
			data: organizationActivities,
			isLoading: isOrganizationActivitiesLoading,
			error: organizationActivitiesError,
		},
	] = useLazyGetOrganizationActivitiesQuery();

	// const handleDownload = async () => {
	// 	if (!firstDay?.isValid() || !secondDay?.isValid()) {
	// 		return;
	// 	}

	// 	try {
	// 		const response = await downloadReport(dateRange);
	// 		if (response.data) {
	// 			const outputFilename = `${crypto.randomUUID()}_revenue_report.xlsx`;
	// 			const url = URL.createObjectURL(
	// 				new Blob([response?.data ?? new Blob()], {
	// 					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	// 				}),
	// 			);

	// 			const link = document.createElement('a');
	// 			link.href = url;
	// 			link.setAttribute('download', outputFilename);
	// 			document.body.appendChild(link);
	// 			link.click();

	// 			dispatch(
	// 				openSnackbar({
	// 					message:
	// 						"Sit back and relax – your report is being processed. It will download automatically when it's ready for you.",
	// 					severity: 'info',
	// 					isOpen: true,
	// 					duration: 2000,
	// 				}),
	// 			);
	// 		}
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };

	useEffect(() => {
		if (user?.uuid) {
			consoleDebug('Fetching dashboard data for user:', user.uuid);
			getOrganizationActivities({ orgId: user.organizationUuid, page: 1, limit: 10 });
			getOrganizationMetrics();
		}
	}, [user?.uuid, user?.organizationUuid,dateRange, getOrganizationActivities, getOrganizationMetrics]);

	return {

		setFirstDay,
		setSecondDay,
		firstDay,
		secondDay,
		greeting,
		user,
		organizationActivities,
		isOrganizationActivitiesLoading,
		organizationActivitiesError,
		organizationMetrics,
		isOrganizationMetricsLoading,
		organizationMetricsError,
	};
};
