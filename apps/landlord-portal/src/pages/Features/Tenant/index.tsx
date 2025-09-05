import {
	Stack,
	Button,
	IconButton,
	InputBase,
	Paper,
	Typography,
	Box,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TenantTable } from './TenantTable';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
	useGetTenantFilterMetaDataQuery,
	useGetTenantsQuery,
} from '../../../store/TenantStore/tenantApiSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';
import { screenMessages } from '../../../helpers/screen-messages';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { PermissionGate } from '../../../authz/permission-gate';
import { PERMISSIONS } from '../../../authz/constants';

const ITEMSCOUNTOPTIONS = [10, 20, 40, 60];

const Tenant = () => {
	const { user } = useSelector(getAuthState);
	const { organizationUuid, role } = user;
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchText] = useState('');
	const [defaultParams, setDefaultParams] = useState({
		page: 1,
		take: 20,
		sortBy: 'createdDate',
		order: 'ASC',
	});
	const inputRef = useRef<HTMLElement>(null);
	const filterObjectLength = Object.keys(filter).length;
	const { data: tenantMetaData } = useGetTenantFilterMetaDataQuery();
	const debouncedTenantSearch = useDebounce(() => {
		setDefaultParams((prev) => ({ ...prev, search: searchText }));
	}, 500);
	const { data: tenantData, isLoading: isTenantDataLoading } =
		useGetTenantsQuery({
			...defaultParams,
			...filter,
			// page: currentPage,:
			// take: 20,
			// sortBy: 'createdDate',
			// order: 'ASC',
			search: searchText.trim(),
			// ...filter,
		});
	const allTenants = tenantData?.pageData || [];
	const pageCount = tenantData?.meta?.pageCount || 0;
	const filterOptions = tenantMetaData?.filterOptions;

	const navigate = useNavigate();

	const getCurrentPage = useCallback((value: number) => {
		setCurrentPage(value);
		setDefaultParams((prev) => ({ ...prev, page: value }));
	}, []);

	const getItemsPerPageCount = (value: number) => {
		setCurrentPage(1);
		setDefaultParams((prev) => ({ ...prev, take: value, page: 1 }));
	};
	const handleTenantSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setSearchText(inputValue);

		// Reset to first page for every new search
		setDefaultParams((prev) => ({
			...prev,
			search: inputValue.trim(),
			page: 1,
		}));

		// Execute search with debounce
		debouncedTenantSearch();
	};

	const navigateToAddTenant = () => {
		navigate('/tenants/add-tenant', {
			state: {
				mode: 'create',
				returnPath: '/tenants',
			},
		});
	};
	const EmptyState = () => {
		return (
			<Box
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
			>
				<Typography variant='body1'>
					{screenMessages.tenant.list.noMatches}
				</Typography>
			</Box>
		);
	};
	useEffect(() => {
		if (inputRef.current) {
			const inputElement: HTMLInputElement | null =
				inputRef.current.querySelector('.MuiInputBase-input');

			inputElement && inputElement.focus();
		}
	}, []);
	useEffect(() => {
		getCurrentPage(1);
	}, [getCurrentPage]);

	const handleRowClick = (id: string) => {
		navigate(`/tenants/${id}`);
	};

	return (
		<>
			<Stack gap={1}>
				<Stack
					direction={'row'}
					gap={1}
					justifyContent={isMobile ? 'flex-start' : 'flex-end'}
				>
					<PermissionGate
						orgId={organizationUuid}
						roleName={role}
						all={[PERMISSIONS.TENANT.CREATE]}
						fallback={<></>}
					>
						<Button variant='klubiqMainButton' onClick={navigateToAddTenant}>
							{/* <LeftArrowIcon /> */}
							Add New Tenant
						</Button>
					</PermissionGate>
				</Stack>
				<Stack>
					<Paper
						component='form'
						elevation={0}
						sx={{
							border: '1px solid',
							borderColor: 'primary.contrastText',
							borderRadius: 2.5,
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<IconButton aria-label='search'>
							<SearchIcon />
						</IconButton>
						<InputBase
							ref={inputRef}
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Tenant'
							inputProps={{ 'aria-label': 'search tenant' }}
							value={searchText}
							onChange={handleTenantSearch}
						/>
					</Paper>
				</Stack>
				<Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 4 }}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allTenants.length}
					/>
				</Stack>
				<Stack>
					{isTenantDataLoading ? (
						<TableSkeleton />
					) : allTenants.length > 0 ? (
						<TenantTable
							title='Tenant'
							allTenant={allTenants}
							onRowClick={(tenant) => {
								handleRowClick(tenant.id);
							}}
						/>
					) : (
						<EmptyState />
					)}
				</Stack>
			</Stack>
			{allTenants && allTenants.length > 0 && (
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

export default Tenant;
