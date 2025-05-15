import { Stack, Button, IconButton, InputBase, Paper } from '@mui/material';
import { styles } from './styles';
// import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TenantTable } from './TenantTable';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { TenantType } from '../../../shared/type';
import {
	// useGetTenantFilterMetaDataQuery,
	useGetTenantsQuery,
} from '../../../store/TenantStore/tenantApiSlice';
const ITEMSCOUNTOPTIONS = [20, 40, 60];

const Tenant = () => {
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
	const { data: tenantData } = useGetTenantsQuery({
		...defaultParams,
	});
	const allTenants = tenantData?.pageData || [];
	const pageCount = tenantData?.meta?.pageCount || 0;
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

	const handleRowClick = useCallback(
		(tenant: TenantType) => {
			navigate(`/tenants/tenant-details/${tenant.id || tenant.tenantId}`, {
				state: {
					selectedRow: tenant,
				},
			});
		},
		[navigate],
	);

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
				{/* Commented out for now as we don't have filter options */}
				{/* <Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 4 }}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allTenants.length}
					/>
				</Stack> */}
				<Stack>
					<TenantTable
						title='Tenant'
						allTenant={allTenants}
						onRowClick={(tenant) => {
							console.log('here');
							handleRowClick(tenant);
						}}
					/>
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
