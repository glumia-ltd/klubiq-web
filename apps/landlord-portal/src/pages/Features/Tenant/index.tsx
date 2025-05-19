import { Stack, Button, IconButton, InputBase, Paper } from '@mui/material';
import { styles } from './styles';
// import Filter from '../../../components/Filter/Filter';
// import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TenantTable } from './TenantTable';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
	// useGetTenantFilterMetaDataQuery,
	// useGetTenantFilterMetaDataQuery,
	useGetTenantsQuery,
} from '../../../store/TenantStore/tenantApiSlice';
import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';

const ITEMSCOUNTOPTIONS = [5, 10, 20, 40, 60];

const Tenant = () => {
	// const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchText] = useState('');
	const [defaultParams, setDefaultParams] = useState({
		page: 1,
		take: 20,
		// sortBy: 'createdDate',
		// order: 'ASC',
	});
	const inputRef = useRef<HTMLElement>(null);
	// const filterObjectLength = Object.keys(filter).length;
	// const { data: tenantMetaData } = useGetTenantFilterMetaDataQuery();
	// const filterObjectLength = Object.keys(filter).length;
	// const { data: tenantMetaData } = useGetTenantFilterMetaDataQuery();
	const { data: tenantData } = useGetTenantsQuery({
		...defaultParams,
		// ...filter,
	});
	const allTenants = tenantData?.pageData || [];
	const pageCount = tenantData?.meta?.pageCount || 0;
	// const filterOptions = tenantMetaData?.filterOptions;
	// const filterOptions = tenantMetaData?.filterOptions;

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
		setSearchText(e.target.value);
	};

	const navigateToAddTenant = () => {
		navigate('/tenants/invite-tenant', {
			state: {
				mode: 'onboarding',
				returnPath: '/tenants',
			},
		});
	};

	useEffect(() => {
		getCurrentPage(1);
	}, [getCurrentPage]);

	const handleRowClick = (id: number) => {
		navigate(`/tenant/${id}`);
	};
	return (
		<>
			<Stack spacing={2}>
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					sx={styles.buttonContainer}
				>
					<Button
						variant='klubiqMainButton'
						onClick={navigateToAddTenant}
					>
						{/* <LeftArrowIcon /> */}
						Add New Tenant
					</Button>
				</Stack>
				<Stack>
					<Paper component='form' sx={styles.inputStyle}>
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
				{/* <Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 4 }}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allTenants.length}
					/>
				</Stack> */}
				<Stack sx={{ width: '100%' }}>
					{allTenants ? (
						<TenantTable
							title='Tenant'
							allTenant={allTenants}
							onRowClick={(rowData: any) => handleRowClick(rowData.id)}
						/>
					) : (
						<TableSkeleton />
					)}
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

export default Tenant;
