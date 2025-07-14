import React, { useState, useMemo } from 'react';
import {
	Box,
	Stack,
	Typography,
	Button,
	useMediaQuery,
	Chip,
} from '@mui/material';
import { Table, Column, Filter } from '@klubiq/ui-components';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '@mui/material/styles';

const paymentData = [
	{
		datePaid: 'Jan 01, 2025',
		amount: 1200,
		paymentMethod: 'Auto-pay',
		property: 'Victoria Garden City',
		status: <Chip variant='pattensBlueChip' label='Due Soon' />,
		receipt: '#1',
	},
	{
		datePaid: 'Dec 01, 2024',
		amount: 1200,
		paymentMethod: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: <Chip variant='pippinRedChip' label='Overdue' />,
		receipt: '#2',
	},
	{
		datePaid: 'Nov 01, 2024',
		amount: 1200,
		paymentMethod: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: <Chip variant='beesWaxYellowChip' label='Pending' />,
		receipt: '#3',
	},
	{
		datePaid: 'Oct 01, 2024',
		amount: 1200,
		paymentMethod: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: <Chip variant='greenChip' label='Paid' />,
		receipt: '#4',
	},
];

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
const sortButtonStyles = {
	color: '#1A2746',
	fontWeight: 700,
	borderRadius: 8,
	px: 1.5,
	fontSize: 15,
	minWidth: 0,
	height: 36,
	boxShadow: 'none',
};

const PaymentHistorySection: React.FC = () => {
	const [property, setProperty] = useState('');
	const [status, setStatus] = useState('');
	const [sortBy, setSortBy] = useState('datePaid');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const isMobile = useMediaQuery('(max-width:600px)');
	const theme = useTheme();

	// Filtering and sorting logic
	const filteredData = useMemo(() => {
		let data = paymentData;
		if (property) data = data.filter((d) => d.property === property);
		if (status) data = data.filter((d) => d.status.props.label === status);
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
	}, [property, status, sortBy, sortOrder]);

	const columns: Column<(typeof paymentData)[0]>[] = [
		{
			id: 'datePaid',
			label: 'DATE PAID',
			minWidth: 120,
			sortable: true,
			format: (value) => <Typography fontWeight={500}>{value}</Typography>,
		},
		{
			id: 'amount',
			label: 'AMOUNT',
			minWidth: 100,
			align: 'left',
			sortable: true,
			format: (value) => (
				<Typography fontWeight={700}>${value.toLocaleString()}</Typography>
			),
		},
		{
			id: 'paymentMethod',
			label: 'PAYMENT METHOD',
			minWidth: 140,
			format: (value) => <Typography fontWeight={400}>{value}</Typography>,
		},
		{
			id: 'property',
			label: 'PROPERTY',
			minWidth: 180,
			format: (value) => <Typography fontWeight={400}>{value}</Typography>,
		},
		{
			id: 'status',
			label: 'STATUS',
			minWidth: 120,
			format: (value) => value,
		},
		{
			id: 'receipt',
			label: 'RECEIPT',
			minWidth: 100,
			format: () => (
				<Button
					startIcon={<DownloadIcon />}
					sx={{
						color: '#1A2746',
						fontWeight: 700,
						textTransform: 'none',
						fontSize: 18,
					}}
					variant='text'
				>
					Download
				</Button>
			),
		},
	];

	return (
		<Box
			sx={{
				p: isMobile ? 1 : 4,
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
					<Typography
						variant='h5'
						fontWeight={300}
						sx={{
							mb: isMobile ? 1 : 0,
							textAlign: 'left',
						}}
					>
						Payment History
					</Typography>
				</Box>
				{/* Filters + Sort right */}
				<Stack
					direction={isMobile ? 'column' : 'row'}
					spacing={isMobile ? 2 : 1.5}
					sx={{ width: isMobile ? '100%' : 'auto' }}
					alignItems={isMobile ? 'stretch' : 'center'}
				>
					{/* Filters */}
					<Box
						sx={{
							minWidth: isMobile ? '100%' : 140,
							maxWidth: isMobile ? '100%' : 180,
							position: 'relative',
							width: isMobile ? '100%' : 'auto',
						}}
					>
						<Filter
							options={propertyOptions}
							value={property}
							onChange={setProperty}
							label=' '
							placeholder='All Properties'
						/>
						<Box
							sx={{
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
							}}
						/>
					</Box>
					<Box
						sx={{
							minWidth: isMobile ? '100%' : 110,
							maxWidth: isMobile ? '100%' : 150,
							position: 'relative',
							width: isMobile ? '100%' : 'auto',
						}}
					>
						<Filter
							options={statusOptions}
							value={status}
							onChange={setStatus}
							label=' '
							placeholder='Status'
						/>
						<Box
							sx={{
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
							}}
						/>
					</Box>
					{/* Sort Controls - just the two buttons side by side */}
					<Stack
						direction='row'
						spacing={isMobile ? 1 : 0.5}
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
										? theme.palette.primary.main
										: 'transparent',
								width: isMobile ? '50%' : 'auto',
								...sortButtonStyles,
							}}
						>
							Date Paid{' '}
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
										? theme.palette.primary.main
										: 'transparent',
								width: isMobile ? '50%' : 'auto',
								...sortButtonStyles,
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
				<Box sx={{ minWidth: isMobile ? 700 : '100%' }}>
					<Table
						columns={columns}
						data={filteredData}
						order={sortOrder}
						orderBy={sortBy as keyof (typeof paymentData)[0]}
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
		</Box>
	);
};

export default PaymentHistorySection;
