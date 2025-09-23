import React, { useState, useMemo } from 'react';
import {
	Box,
	Stack,
	Typography,
	Button,
	useMediaQuery,
	Chip,
	Select,
	MenuItem,
	Pagination,
} from '@mui/material';
import { Table, Column, Filter } from '@klubiq/ui-components';
import { useTheme } from '@mui/material/styles';
import { useGetPaymentHistoryQuery } from '@/store/PaymentsStore/paymentsApiSlice';
import { useSelector } from 'react-redux';
import { getAuthState } from '@/store/AuthStore/auth.slice';
import { getLocaleFormat } from '@/helpers/utils';

const propertyOptions = [
	{ value: '', label: 'All Properties' },
	{ value: 'Victoria Garden City', label: 'Victoria Garden City' },
];
const statusOptions = [
	{ value: '', label: 'Status' },
	{ value: 'Due Soon', label: 'Due Soon' },
	{ value: 'Overdue', label: 'Overdue' },
	{ value: 'Pending', label: 'Pending' },
	{ value: 'Paid', label: 'Paid' },
];

type SortOrder = 'asc' | 'desc';

// DRY: Extracted styles with improved responsive breakpoints
const filterInputWrapperSx = (isTablet: boolean, isMobile: boolean) => ({
	minWidth: isMobile ? '100%' : isTablet ? 120 : 140,
	maxWidth: isMobile ? '100%' : isTablet ? 150 : 180,
	position: 'relative',
	width: isMobile ? '100%' : 'auto',
});

const filterInputBoxSx = (isMobile: boolean) => ({
	position: 'absolute',
	inset: 0,
	pointerEvents: 'none',
	'& .MuiInputBase-root': {
		height: 36,
		borderRadius: 8,
		fontSize: 15,
		fontWeight: 500,
		padding: '0 10px',
		width: isMobile ? '100%' : 'auto',
	},
});

const sortButtonStyles = (isTablet: boolean, isMobile: boolean) => ({
	color: '#1A2746',
	fontWeight: 700,
	borderRadius: 8,
	px: isTablet ? 1 : 1.5,
	fontSize: isTablet ? 14 : 15,
	minWidth: 0,
	height: 36,
	boxShadow: 'none',
	width: isMobile ? '50%' : 'auto',
});

const PaymentHistorySection: React.FC = () => {
	const [property, setProperty] = useState('');
	const [status, setStatus] = useState('');
	const [sortBy, setSortBy] = useState('datePaid');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const isTablet = useMediaQuery('(max-width:1028px)');
	const isMobile = useMediaQuery('(max-width:768px)');
	const isSmallTablet = useMediaQuery('(max-width:900px)');
	const isVerySmall = useMediaQuery('(max-width:691px)');

	const theme = useTheme();

	const {
		user: { uuid },
	} = useSelector(getAuthState);

	const {
		data: paymentHistory,
		// isLoading: isPaymentHistoryLoading
	} = useGetPaymentHistoryQuery(uuid);

	const paymentHistoryData =
		paymentHistory?.map((item: any) => ({
			datePaid: item?.paidAt,
			amount: item?.amount,
			property: item?.propertyName,
			paymentMethod: item?.paymentMethod,
			status: item?.status.includes('pending') ? (
				<Chip variant='beesWaxYellowChip' label='Pending' />
			) : item?.status.includes('success') ? (
				<Chip variant='greenChip' label='Paid' />
			) : (
				<Chip variant='pippinRedChip' label='Failed' />
			),
			receipt: item?.ledgerReference,
		})) || [];

	// Filtering and sorting logic
	const filteredData = useMemo(() => {
		let data = paymentHistoryData;
		if (property) data = data.filter((d: any) => d.property === property);
		if (status) data = data.filter((d: any) => d.status.props.label === status);
		data = [...data].sort((a, b) => {
			if (sortBy === 'amount') {
				return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
			} else {
				const dateA = new Date(a.datePaid);
				const dateB = new Date(b.datePaid);
				return sortOrder === 'asc'
					? dateA.getTime() - dateB.getTime()
					: dateB.getTime() - dateA.getTime();
			}
		});
		return data;
	}, [property, status, sortBy, sortOrder, paymentHistoryData]);

	// Pagination logic
	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredData.slice(startIndex, endIndex);
	}, [filteredData, currentPage, itemsPerPage]);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);

	const columns: Column<(typeof paymentHistoryData)[0]>[] = [
		{
			id: 'datePaid',
			label: 'DATE PAID',
			minWidth: isTablet ? 100 : 120,
			sortable: true,
			format: (value) => <Typography fontWeight={500}>{value}</Typography>,
		},
		{
			id: 'amount',
			label: 'AMOUNT',
			minWidth: isTablet ? 80 : 100,
			align: 'left',
			sortable: true,
			format: (value) => (
				<Typography fontWeight={700}>
					{getLocaleFormat(value || 0, 'currency', 2)}
				</Typography>
			),
		},
		{
			id: 'paymentMethod',
			label: 'PAYMENT METHOD',
			minWidth: isTablet ? 120 : 140,
			format: (value) => <Typography fontWeight={400}>{value}</Typography>,
		},
		{
			id: 'property',
			label: 'PROPERTY',
			minWidth: isTablet ? 150 : 180,
			format: (value) => <Typography fontWeight={400}>{value}</Typography>,
		},
		{
			id: 'status',
			label: 'STATUS',
			minWidth: isTablet ? 100 : 120,
			format: (value) => value,
		},
		{
			id: 'receipt',
			label: 'RECEIPT',
			minWidth: isTablet ? 80 : 100,
			format: (value) => {
				return <Typography variant='caption' fontWeight={400}>{value}</Typography>;
				// if (value?.includes('pending')) {
				// 	return;
				// } else {
				// 	<Button
				// 		startIcon={<DownloadIcon />}
				// 		sx={{
				// 			color: '#1A2746',
				// 			fontWeight: 700,
				// 			textTransform: 'none',
				// 			fontSize: isTablet ? 16 : 18,
				// 		}}
				// 		variant='text'
				// 	>
				// 		Download 
				// 	</Button>;
				// }
			},
		},
	];

	return (
		<Box
			sx={{
				// mt: isMobile ? 2 : 4,
				bgcolor: '#fff',
				borderRadius: 4,
				boxShadow: 0,
				width: '100%',
			}}
		>
			{/* Header and Filters Row */}
			<Stack
				direction={isMobile ? 'column' : 'row'}
				justifyContent='space-between'
				alignItems={isMobile ? 'stretch' : 'center'}
				mb={3}
				gap={isMobile ? 2 : 0}
			>
				{/* Header left */}
				<Box flex={1} minWidth={isMobile ? '100%' : 0} mb={isMobile ? 2 : 0}>
					<Typography variant='h6' textAlign='left'>
						Payment History
					</Typography>
				</Box>
				{/* Filters + Sort right */}
				<Stack
					direction={isMobile ? 'column' : 'row'}
					spacing={isMobile ? 2 : isTablet ? 1 : 1.5}
					sx={{ width: isMobile ? '100%' : 'auto' }}
					alignItems={isMobile ? 'stretch' : 'center'}
				>
					{/* Filters */}
					<Box sx={filterInputWrapperSx(isTablet, isMobile)}>
						<Filter
							hiddenLabel
							options={propertyOptions}
							value={property}
							onChange={setProperty}
							// label='Properties '
							placeholder='All Properties'
						/>
						<Box sx={filterInputBoxSx(isMobile)} />
					</Box>
					<Box
						sx={{
							...filterInputWrapperSx(isTablet, isMobile),
							minWidth: isMobile ? '100%' : isTablet ? 100 : 110,
							maxWidth: isMobile ? '100%' : isTablet ? 130 : 150,
						}}
					>
						<Filter
							hiddenLabel
							options={statusOptions}
							value={status}
							onChange={setStatus}
							// label='Status'
							placeholder='Status'
						/>
						<Box sx={filterInputBoxSx(isMobile)} />
					</Box>
					{/* Sort Controls - just the two buttons side by side */}
					<Stack
						direction='row'
						spacing={isMobile ? 1 : isTablet ? 0.5 : 0.5}
						alignItems='center'
						sx={{ width: isMobile ? '100%' : 'auto' }}
						flexWrap='nowrap'
					>
						<Button
							onClick={() => {
								setSortBy('datePaid');
								setSortOrder(
									sortBy === 'datePaid' && sortOrder === 'asc' ? 'desc' : 'asc',
								);
							}}
							sx={{
								bgcolor:
									sortBy === 'datePaid'
										? theme.palette.background.default
										: 'transparent',

								...sortButtonStyles(isTablet, isMobile),
							}}
						>
							{isSmallTablet ? 'Date' : 'Date Paid'}{' '}
							{sortBy === 'datePaid' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
						</Button>
						<Button
							onClick={() => {
								setSortBy('amount');
								setSortOrder(
									sortBy === 'amount' && sortOrder === 'asc' ? 'desc' : 'asc',
								);
							}}
							sx={{
								bgcolor:
									sortBy === 'amount'
										? theme.palette.background.default
										: 'transparent',

								...sortButtonStyles(isTablet, isMobile),
							}}
						>
							Amount{' '}
							{sortBy === 'amount' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
						</Button>
					</Stack>
				</Stack>
			</Stack>
			{/* Responsive Table Wrapper */}
			<Box sx={{ width: '100%', overflowX: 'auto' }}>
				<Box
					sx={{
						minWidth: isMobile ? 700 : isTablet ? 800 : '100%',
						maxWidth: '100%',
					}}
				>
					<Table
						columns={columns}
						data={paginatedData}
						order={sortOrder}
						orderBy={sortBy as keyof (typeof paymentHistoryData)[0]}
						onRequestSort={(property) => {
							if (sortBy === property) {
								setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
							} else {
								setSortBy(property as string);
								setSortOrder('asc');
							}
						}}
						emptyMessage='No payment history found.'
					/>
				</Box>
			</Box>
			{/* Pagination */}
			{filteredData.length > 0 && (
				<Box
					sx={{
						mt: 3,
						display: 'flex',
						flexDirection: isMobile ? 'column' : 'row',
						justifyContent: 'space-between',
						alignItems: isMobile ? 'stretch' : 'center',
						gap: isMobile ? 2 : 0,
					}}
				>
					<Typography variant='body2' color='text.secondary'>
						Showing {startItem}-{endItem} of {filteredData.length} items
					</Typography>
					<Stack
						direction='row'
						spacing={1}
						alignItems='center'
						justifyContent={isMobile ? 'space-between' : 'flex-end'}
					>
						<Typography variant='body2' color='text.secondary'>
							Items per page:
						</Typography>
						<Select
							value={itemsPerPage}
							onChange={(e) => {
								setItemsPerPage(Number(e.target.value));
								setCurrentPage(1); // Reset to first page when changing items per page
							}}
							size='small'
							sx={{ minWidth: 80 }}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</Stack>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							width: isVerySmall ? '100%' : 'auto',
							mt: isVerySmall ? 2 : 0,
						}}
					>
						<Pagination
							count={totalPages}
							page={currentPage}
							onChange={(_, page) => setCurrentPage(page)}
							color='primary'
							showFirstButton
							showLastButton
							size={isTablet ? 'small' : 'medium'}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default PaymentHistorySection;
