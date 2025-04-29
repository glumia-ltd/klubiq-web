import { Stack, Button } from '@mui/material';
import { styles } from './style';
// import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import Filter from '../../components/Filter/Filter';
import { useCallback, useEffect, useState } from 'react';
import { LeaseTable } from './LeaseTable';
import {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
} from '../../store/LeaseStore/leaseApiSlice';
import { DataPagination } from '../../components/DataPagination';
import { useNavigate } from 'react-router-dom';
// import { useGetPropertiesNamesQuery } from '../../store/PropertyPageStore/propertyApiSlice';

const ITEMSCOUNTOPTIONS = [20, 40, 60];

const Lease = () => {
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [defaultParams, setDefaultParams] = useState({
		page: 1,
		take: 20,
		sortBy: 'createdDate',
		order: 'ASC',
	});
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

	const navigateToAddLease = () => {
		navigate('/lease/add-lease');
	};

	useEffect(() => {
		getCurrentPage(1);
	}, [filter, getCurrentPage]);

	const handleRowClick = (id: number) => {
		navigate(`/lease/${id}`);
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
						variant='contained'
						sx={styles.addLeaseButton}
						onClick={navigateToAddLease}
					>
						{/* <LeftArrowIcon /> */}
						Add New Lease
					</Button>
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
					<LeaseTable
						title='Lease'
						allLease={allLease}
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

export default Lease;
