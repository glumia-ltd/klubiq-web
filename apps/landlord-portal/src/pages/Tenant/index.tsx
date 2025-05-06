import { Stack, Button, IconButton, InputBase, Paper } from '@mui/material';
import { styles } from './styles';
import Filter from '../../components/Filter/Filter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TenantTable } from './TenantTable';
import {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
} from '../../store/LeaseStore/leaseApiSlice';
import { DataPagination } from '../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { TenantType } from '../../shared/type';

const ITEMSCOUNTOPTIONS = [5,10,20, 40, 60];

const Tenant = () => {
	const [filter, setFilter] = useState<Record<string, string | number>>({});
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
	}, [filter, getCurrentPage]);

	const handleRowClick = (tenant: TenantType) => {
		navigate(`/tenants/${tenant.id}`);
	};
	const allTenants: TenantType[] = Array.from({ length: 105 }, (_, i) => ({
		id: `${i + 1}`,
		isPrimaryTenant: true,
		profile: {
			profilePicUrl: '',
			firstName: `Tenant${i + 1}`,
			lastName: 'Smith',
			email: `tenant${i + 1}@example.com`,
			phoneNumber: '123-456-7890',
		},
		propertyDetails: {
			name: `Property ${i % 5}`,
			unitNumber: `Unit ${i + 1}`,
			address: {
				addressLine1: `${100 + i} Main Street`,
				addressLine2: `Suite ${i + 1}`,
			},
		},
		leaseDetails: {
			startDate: '2023-01-01',
			endDate: '2024-01-01',
			status: i % 2 === 0 ? 'Active' : 'Pending',
			rentAmount: '1500',
			paymentFrequency: 'Monthly',
			id: i,
			isArchived: false,
			isDraft: false,
			name: '',
			rentDueDay: 0,
			securityDeposit: '',
			tenants: [],
		},
	}));
	const filterOptions = [
		{
			id: 'status',
			title: 'Tenant Status',
			options: ['Active', 'Pending'].map((s) => ({ label: s, value: s })),
		},
		{
			id: 'propertyName',
			title: 'Property Name',
			options: Array.from({ length: 5 }, (_, i) => `Property ${i}`).map((p) => ({ label: p, value: p })),
		},
		{
			id: 'paymentFrequency',
			title: 'Payment Frequency',
			options: ['Monthly'].map((f) => ({ label: f, value: f })),
		},
		
		{
			id:"date",
			title:"Date",
			options:[
				{label:"Last 7 days",value:"last7Days"},
				{label:"Last 30 days",value:"last30Days"},
				{label:"Last 60 days",value:"last60Days"},
				{label:"Last 90 days",value:"last90Days"},
			]
		},
		
	];

	
	const filteredTenants = allTenants.filter((tenant) => {
		const fullName = `${tenant.profile.firstName} ${tenant.profile.lastName}`.toLowerCase();
		const matchesSearch = fullName.includes(searchText.toLowerCase());
		const matchesStatus = !filter.status || tenant.leaseDetails.status === filter.status;
		const matchesProperty = !filter.propertyName || tenant.propertyDetails.name === filter.propertyName;
		const matchesFrequency = !filter.paymentFrequency || tenant.leaseDetails.paymentFrequency === filter.paymentFrequency;
		return matchesSearch && matchesStatus && matchesProperty && matchesFrequency;
	});


	// Apply pagination
	const startIndex = (currentPage - 1) * defaultParams.take;
	const paginatedTenants = filteredTenants.slice(
		startIndex,
		startIndex + defaultParams.take,
	);
	const pageCount = Math.ceil(filteredTenants.length / defaultParams.take);

	return (
		<>
			<Stack spacing={2}>
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					sx={styles.buttonContainer}
				>
					<Button
						variant='contained'
						sx={styles.addTenantButton}
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
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					// sx={styles.buttonContainer}
				>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => {
							setFilter(options);
						}}
						disable={filterObjectLength ? false : !allTenants.length}
					/>
				</Stack>
				<Stack>
					<TenantTable
						title='Tenant'
						allTenant={paginatedTenants}
						onRowClick={handleRowClick}
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
