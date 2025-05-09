import { Stack, Button, IconButton, InputBase, Paper } from '@mui/material';
import { styles } from './styles';
import Filter from '../../../components/Filter/Filter';
import { useCallback, useEffect, useRef, useState } from 'react';
// import { TenantTable } from './TenantTable';
import {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
} from '../../../store/LeaseStore/leaseApiSlice';
import { DataPagination } from '../../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
// import { TenantType } from '../../../shared/type';
import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';

// import { useGetPropertiesNamesQuery } from '../../store/PropertyPageStore/propertyApiSlice';

const ITEMSCOUNTOPTIONS = [20, 40, 60];

const Lease = () => {
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

	const { data: leaseMetaData } = useGetLeaseMetaDataQuery();

	const { data: leaseData } = useGetLeasesQuery({
		...defaultParams,
		...filter,
	});

	const filterOptions = leaseMetaData?.filterOptions;
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

	const handleTenantSearch = (e: any) => {
		setSearchText(e.target.value);
	};

	const navigateToAddTenant = () => {
		navigate('/tenants/add-tenant', {
			state: {
				mode: 'new-tenant',
				returnPath: '/tenants',
			},
		});
	};

	useEffect(() => {
		getCurrentPage(1);
	}, [filter, getCurrentPage]);

	// const handleRowClick = (id: number) => {
	// 	navigate(`/tenants/${id}`);
	// };

	return (
		<>

			<Stack spacing={5}>
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
						disable={filterObjectLength ? false : !allLease}
					/>
				</Stack>
				<Stack direction={'row'}>
					<TableSkeleton />
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
