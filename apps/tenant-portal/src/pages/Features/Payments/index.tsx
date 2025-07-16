import React, { useState } from 'react';
import {
	Box,
	Card,
	Stack,
	Typography,
	Chip,
	useTheme,
	Skeleton,
	IconButton,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
	PageHeader,
	SavedPaymentCard,
	SavedPaymentCardSkeleton,
	Table,
	Column,
} from '@klubiq/ui-components';
import DataPagination from '../../../../../../packages/ui-components/src/components/DataPagination';
import AddPaymentMethodCard from '@/components/AddPaymentMethodCard/AddPaymentMethodCard';
import PaymentHistoryTable from '@/components/PaymentHistoryTable/PaymentHistoryTable';
// Dummy data for demonstration
const paymentMethodsLoading = false;
const paymentHistoryLoading = false;
const paymentMethods = [
	{
		last4: '4242',
		brand: 'Visa',
		isPrimary: true,
	},
];
const paymentHistory = [
	{
		datePaid: 'Jan 01, 2025',
		amount: 1200,
		method: 'Auto-pay',
		property: 'Victoria Garden City',
		status: 'Due Soon',
		receipt: true,
	},
	{
		datePaid: 'Dec 01, 2024',
		amount: 1200,
		method: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: 'Overdue',
		receipt: true,
	},
	{
		datePaid: 'Nov 01, 2024',
		amount: 1200,
		method: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: 'Pending',
		receipt: true,
	},
	{
		datePaid: 'Oct 01, 2024',
		amount: 1200,
		method: 'Bank Transfer',
		property: 'Victoria Garden City',
		status: 'Paid',
		receipt: true,
	},
];

const statusColor = (status: string, theme: any) => {
	switch (status) {
		case 'Due Soon':
			return theme.palette.info.light;
		case 'Overdue':
			return theme.palette.error.light;
		case 'Pending':
			return theme.palette.warning.light;
		case 'Paid':
			return theme.palette.success.light;
		default:
			return theme.palette.grey[300];
	}
};

const PaymentsPage = () => {
	const theme = useTheme();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	// Table columns
	const columns: Column<any>[] = [
		{ id: 'datePaid', label: 'DATE PAID', minWidth: 120 },
		{
			id: 'amount',
			label: 'AMOUNT',
			minWidth: 100,
			format: (value) => (
				<Typography fontWeight={600}>${value.toLocaleString()}</Typography>
			),
		},
		{ id: 'method', label: 'PAYMENT METHOD', minWidth: 120 },
		{ id: 'property', label: 'PROPERTY', minWidth: 160 },
		{
			id: 'status',
			label: 'STATUS',
			minWidth: 100,
			format: (value) => (
				<Chip
					label={value}
					size='small'
					sx={{
						background: statusColor(value, theme),
						color: theme.palette.getContrastText(statusColor(value, theme)),
						fontWeight: 500,
						textTransform: 'capitalize',
					}}
				/>
			),
		},
		{
			id: 'receipt',
			label: 'RECEIPT',
			minWidth: 80,
			format: (value) =>
				value ? (
					<IconButton size='small'>
						<DownloadIcon />
					</IconButton>
				) : null,
		},
	];

	// Pagination logic
	const paginatedHistory = paymentHistory.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const renderRightContent = () => {
		return (
			<Stack direction='column' alignItems='end'>
				<Typography variant='h4' sx={{ fontWeight: 'normal' }}>
					$1,200
				</Typography>
				<Typography
					variant='subtitle2'
					sx={{ textWrap: 'wrap', wordBreak: 'break-word', fontSize: '12px' }}
				>
					12 days remaining
				</Typography>
			</Stack>
		);
	};

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ mb: 1, mt: 2 }}
			>
				<Typography variant='h5' fontWeight={700}>
					Rent Payments
				</Typography>
				<Button
					variant='contained'
					color='primary'
					size='large'
					sx={{ borderRadius: 2, minWidth: 120, fontWeight: 600 }}
				>
					<CreditCardIcon sx={{ mr: 1 }} fontSize='small' /> Pay Now
				</Button>
			</Stack>

			{/* Next Payment Due Banner */}

			<PageHeader
				title={<Typography variant='h4'>Next Payment Due</Typography>}
				subtitle={
					<Stack direction='column' gap={1}>
						<Typography variant='h7'>February 1, 2025</Typography>
						<Stack direction='row' alignItems='center' gap={1}>
							<CheckCircleOutlineIcon sx={{ fontSize: '12px' }} />

							<Typography variant='subtitle2'>Auto-pay is enabled</Typography>
						</Stack>
					</Stack>
				}
				variant='compact'
				rightContent={renderRightContent()}
				sx={{
					color: 'white',
					background: 'linear-gradient(45deg, #00BC7D, #009689)',
				}}
			/>

			{/* Payment Methods */}
			<Card sx={{ mb: 4, p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
				<Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
					Payment Methods
				</Typography>
				{paymentMethodsLoading ? (
					<SavedPaymentCardSkeleton />
				) : paymentMethods.length > 0 ? (
					<>
						<SavedPaymentCard
							last4={paymentMethods[0].last4}
							brand={paymentMethods[0].brand}
							isPrimary={paymentMethods[0].isPrimary}
							onEdit={() => {}}
						/>

						<AddPaymentMethodCard
							content='Add Payment Method'
							onClick={() => {}}
						/>
					</>
				) : (
					<AddPaymentMethodCard
						content='Add Payment Method'
						onClick={() => {}}
					/>
				)}
			</Card>

			{/* Payment History */}
			<PaymentHistoryTable />
		</Box>
	);
};

export default PaymentsPage;
