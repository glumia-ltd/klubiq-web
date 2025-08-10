import {
	Stack,
	Button,
	Chip,
	Typography,
	useTheme,
	useMediaQuery,
	Paper,
	IconButton,
	InputBase,
} from '@mui/material';
// import { styles } from './style';
// import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
} from '../../../store/LeaseStore/leaseApiSlice';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';
import { LeaseType } from '../../../shared/type';
import { useDebounce } from '../../../hooks/useDebounce';
import { styles } from "./style"
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { statusColors, UnitTypeColors } from '../../../page-tytpes/leases/list-page.type';
import { useLeaseActions } from '../../../hooks/page-hooks/leases.hooks';
import dayjs from 'dayjs';
// 	import { LeftArrowIcon } from '../../../components/Icons/LeftArrowIcon';
import { screenMessages } from '../../../helpers/screen-messages';
// import { useGetPropertiesNamesQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import SearchIcon from '@mui/icons-material/Search';
const ITEMSCOUNTOPTIONS = [20, 40, 60];

const Lease = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [defaultParams, setDefaultParams] = useState({
		page: 1,
		take: 20,
		sortBy: 'createdDate',
		order: 'DESC',
	});
	const [searchText, setSearchText] = useState('');
	const filterObjectLength = Object.keys(filter).length;
	const { data: leaseMetaData } = useGetLeaseMetaDataQuery();
	const { data: leaseData, isLoading: isLeaseDataLoading } = useGetLeasesQuery({
		...defaultParams,
		...filter,
	});
	const { tableSx, tableStyles } = useLeaseActions();
	const filterOptions = leaseMetaData?.filterOptions;
	const allLease = leaseData?.pageData;
	const pageCount = leaseData?.meta?.pageCount;

	const navigate = useNavigate();
	const debouncedLeaseSearch = useDebounce(() => {
		setDefaultParams((prev) => ({ ...prev, search: searchText }));
	}, 500);

	const handleLeaseSearch = (e: any) => {
		setSearchText(e.target.value);

		debouncedLeaseSearch();
	};
	const inputRef = useRef<HTMLElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			const inputElement: HTMLInputElement | null =
				inputRef.current.querySelector('.MuiInputBase-input');

			inputElement && inputElement.focus();
		}
	}, []);
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
						size='small'
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
					<Stack direction='column' alignItems='flex-start' spacing={1}>
						{rowData.isMultiUnitProperty && (
							<Typography variant='body2'>{rowData.unit}</Typography>
						)}
						<Chip
							label={rowData.isMultiUnitProperty ? 'Multi' : 'Single'}
							size='small'
							variant='outlined'
							color={UnitTypeColors[rowData.isMultiUnitProperty ? 'Multi' : 'Single'] as any}
						/>
					</Stack>
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
		const rows =
			leases.map((lease) => ({
				status: lease.status,
				tenants:
					lease.tenants?.map((tenant) => ({
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
				isMultiUnitProperty:
					lease.property.unitCount > 1 || lease.property.isMultiUnit,
			})) ?? [];
		return { tableColumns, rows };
	};

	const leaseTableData = useMemo(
		() => getLeaseTableData(allLease ?? []),
		[allLease],
	);

	useEffect(() => {
		getCurrentPage(1);
	}, [filter, getCurrentPage]);

	const handleRowClick = (id: number) => {
		navigate(`/leases/${id}`);
	};
	const EmptyState = () => {
		return (
			<Stack alignItems='center' justifyContent='center' height='100%'>
				<Typography variant='body1'>
					{screenMessages.lease.list.noMatches}
				</Typography>
			</Stack>
		);
	};
	return (
		<>
			<Stack gap={1}>
				<Stack
					direction={'row'}
					gap={1}
					justifyContent={isMobile ? 'flex-start' : 'flex-end'}
				>
					<Button variant='klubiqMainButton' onClick={navigateToAddLease}>
						Add New Lease
					</Button>
				</Stack>

				<Stack direction={'row'}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allLease}
					/>
				</Stack>
				<Stack direction={'column'}>
					<Paper component='form' sx={styles.inputStyle}  >
						<IconButton aria-label='search'>
							<SearchIcon />
						</IconButton>
						<InputBase
							ref={inputRef}
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Lease'
							inputProps={{ 'aria-label': 'search properties' }}
							value={searchText}
							onChange={handleLeaseSearch}
						/>
					</Paper>
				</Stack>
				<Stack sx={{ width: '100%' }}>
					{isLeaseDataLoading ? (
						<TableSkeleton />
					) : allLease && allLease.length > 0 ? (
						<DynamicTable
							colors={tableSx}
							styles={tableStyles}
							header='Leases'
							columns={leaseTableData.tableColumns}
							rows={leaseTableData.rows}
							onRowClick={(rowData: any) => handleRowClick(rowData.id)}
						/>
					) : (
						<EmptyState />
					)}
				</Stack>
			</Stack>

			{allLease && allLease.length > 0 && (
				<Stack mt={4}>
					<DataPagination
						getCurrentPage={getCurrentPage}
						getItemsPerPageCount={getItemsPerPageCount}
						pageCount={pageCount}
						currentPage={currentPage}
						itemsPerPageOptions={ITEMSCOUNTOPTIONS}
					/>
				</Stack>
			)}
		</>
	);
};

export default Lease;
