import { Stack, Button, Chip, Typography } from '@mui/material';
import { styles } from './style';
// import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
// import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	// useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
} from '../../../store/LeaseStore/leaseApiSlice';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';
import { LeaseType } from '../../../shared/type';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { statusColors } from '../../../page-tytpes/leases/list-page.type';
import { useLeaseActions } from '../../../hooks/page-hooks/leases.hooks';
import dayjs from 'dayjs';
import { LeftArrowIcon } from '../../../components/Icons/LeftArrowIcon';
// import { useGetPropertiesNamesQuery } from '../../store/PropertyPageStore/propertyApiSlice';

const ITEMSCOUNTOPTIONS = [20, 40, 60];

const Lease = () => {
	// const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const [defaultParams, setDefaultParams] = useState({
		page: 1,
		take: 20,
		sortBy: 'createdDate',
		order: 'ASC',
	});
	// const filterObjectLength = Object.keys(filter).length;
	// const { data: leaseMetaData } = useGetLeaseMetaDataQuery();
	const { data: leaseData } = useGetLeasesQuery({
		...defaultParams,
		// ...filter,
	});
	const { tableSx, tableStyles } = useLeaseActions();
	// const filterOptions = leaseMetaData?.filterOptions;
	const allLease = leaseData?.pageData;
	const pageCount = leaseData?.meta?.pageCount;

	const navigate = useNavigate();

	const getCurrentPage = useCallback((value: any) => {
		setCurrentPage(value);

		setDefaultParams((prev) => ({ ...prev, page: value }));
	}, []);

	const getItemsPerPageCount = (value: any) => {
		setCurrentPage(1);
		setDefaultParams((prev) => ({ ...prev, take: value, page: 1 }));
	};

	const navigateToAddLease = () => {
		navigate('/leases/add-lease');
	};
	const getLeaseTableData = (leases: LeaseType[]) => {
		const tableColumns: TableColumn[] = [
			{
				key: 'status',
				label: 'Status',
				align: 'left',
				render: (rowData: any) => (
					<Chip
						label={rowData.status}
						color={statusColors[rowData.status] as any}
						variant='outlined'
					/>
				),
			},
			{
				key: 'tenants',
				label: 'Tenant',
				align: 'left',
				render: (rowData: any) => (
					<Stack direction='row' alignItems='center' spacing={2}>
						{rowData?.tenants && rowData?.tenants.length > 0 && (
							<>
								<DynamicAvatar
									items={rowData.tenants}
									size='medium'
									showName={false}
								/>
								{rowData?.tenants?.length === 1 && (
									<Typography variant='body2'>
										{rowData.tenants[0].name}
									</Typography>
								)}
							</>
						)}
					</Stack>
				),
			},
			{
				key: 'property',
				label: 'Property',
				align: 'left',
				render: (rowData: any) => (
					<Typography variant='body2'>{rowData.property.name}</Typography>
				),
			},
			{
				key: 'unit',
				label: 'Unit',
				align: 'left',
				render: (rowData: any) => (
					<Typography variant='body2'>{rowData.unit}</Typography>
				),
			},
			{
				key: 'startDate',
				label: 'Lease Start',
				align: 'left',
				
			},
			{
				key: 'endDate',
				label: 'Lease End',
				align: 'left',
				
			},
			
		];
		const rows = leases.map((lease) => ({
			status: lease.status,
			tenants: lease.tenants?.map((tenant) => ({
						name:
							`${tenant.profile.firstName} ${tenant.profile.lastName}` ||
							'Tenant',
						image: tenant.profile?.profilePicUrl ?? '',
					})) || [],
			property: lease.property,
			unit: lease.unitNumber,
			startDate: dayjs(lease.startDate).format('ll'),
			endDate: dayjs(lease.endDate).format('ll'),
			id: lease.id,
			unitId: lease.unitId,
		})) ?? [];
		return { tableColumns, rows };
	};

	const leaseTableData = useMemo(() => getLeaseTableData(allLease ?? []), [allLease]);

	useEffect(() => {
		getCurrentPage(1);
		updateBreadcrumb({});
	}, [getCurrentPage]);

	const handleRowClick = (id: number) => {
		navigate(`/leases/${id}`);
	};

	return (
		<>
			<Stack spacing={5}>
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					sx={styles.buttonContainer}
				>
					<Button
						variant='klubiqMainButton'
						onClick={navigateToAddLease}
					>
						<LeftArrowIcon />
						Add New Lease
					</Button>
				</Stack>
				{/* <Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					// sx={styles.buttonContainer}
				>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allLease}
					/>
				</Stack> */}
				<Stack sx={{ width: '100%' }}>
					{allLease ? <DynamicTable
						colors={tableSx}
						styles={tableStyles}
						header='Leases'
						columns={leaseTableData.tableColumns}
						rows={leaseTableData.rows}
						onRowClick={(rowData: any) => handleRowClick(rowData.id)}
					/> : <TableSkeleton />}
				</Stack>
			</Stack>

			<Stack mt={4}>
				<DataPagination
					getCurrentPage={getCurrentPage}
					getItemsPerPageCount={getItemsPerPageCount}
					pageCount={pageCount}
					currentPage={currentPage}
					itemsPerPageOptions={ITEMSCOUNTOPTIONS}
				/>
			</Stack>
		</>
	);
};

export default Lease;
