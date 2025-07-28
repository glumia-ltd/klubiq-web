import { Box, Card, Stack, Typography, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PageHeader } from '@klubiq/ui-components';
import {
	SavedPaymentCard,
	SavedPaymentCardSkeleton,
} from '@/components/SavedPaymentCard';
// import AddPaymentMethodCard from '@/components/AddPaymentMethodCard/AddPaymentMethodCard';
import PaymentHistoryTable from '@/components/PaymentHistoryTable/PaymentHistoryTable';
import {
	useGetUpcomingPaymentsQuery,
	useGetPaymentMethodsQuery,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { getAuthState } from '@/store/AuthStore/auth.slice';
import { useSelector } from 'react-redux';
import { getLocaleFormat } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom';
// Dummy data for demonstration

const PaymentsPage = () => {
	const {
		user: { uuid },
	} = useSelector(getAuthState);

	const navigate = useNavigate();

	const { data: payments, isLoading: paymentsLoading } =
		useGetUpcomingPaymentsQuery({ leaseTenantId: uuid });

	const { data: paymentMethods, isLoading: paymentMethodsLoading } =
		useGetPaymentMethodsQuery();

	const [paymentsData] = payments || [];

	// Table columns

	// Pagination logic

	const renderRightContent = () => {
		return (
			<Stack direction='column' alignItems='end'>
				<Typography variant='h4' sx={{ fontWeight: 'normal' }}>
					{getLocaleFormat(paymentsData?.amount || 0, 'currency', 2)}
				</Typography>
				<Typography sx={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
					12 days remaining
				</Typography>
			</Stack>
		);
	};

	const handlePaymentButtonClick = () => {
		console.log('Payment button clicked');
		navigate('/payments/confirm');
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
				<Typography variant='h5'>Rent Payments</Typography>
				<Button
					onClick={handlePaymentButtonClick}
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
				loading={paymentsLoading}
				title={<Typography variant='h4'>Next Payment Due</Typography>}
				subtitle={
					<Stack direction='column' gap={1}>
						<Typography variant='h7'>February 1, 2025</Typography>
						{/* <Stack direction='row' alignItems='center' gap={1}>
							<CheckCircleOutlineIcon sx={{ fontSize: '12px' }} />

							<Typography variant='subtitle2'>Auto-pay is enabled</Typography>
						</Stack> */}
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
			{paymentMethods?.length > 0 && (
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

							{/* <AddPaymentMethodCard
							content='Add Payment Method'
							onClick={() => {}}
						/> */}
						</>
					) : (
						<></>
						// <AddPaymentMethodCard
						// 	content='Add Payment Method'
						// 	onClick={() => {}}
						// />
					)}
				</Card>
			)}
			{/* Payment History */}
			<PaymentHistoryTable />
		</Box>
	);
};

export default PaymentsPage;
