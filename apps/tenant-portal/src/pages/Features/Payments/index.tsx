import {
	Box,
	Card,
	Stack,
	Typography,
	Button,
	useMediaQuery,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PageHeader } from '@klubiq/ui-components';
import {
	SavedPaymentCard,
	SavedPaymentCardSkeleton,
} from '@/components/SavedPaymentCard';
import PaymentHistoryTable from '@/components/PaymentHistoryTable/PaymentHistoryTable';
import {
	useGetUpcomingPaymentsQuery,
	useGetPaymentMethodsQuery,
	// useInitializePaymentMutation,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { getAuthState } from '@/store/AuthStore/auth.slice';
import { useSelector } from 'react-redux';
import { getLocaleFormat, formatPaymentStatusText } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom';

const PaymentsPage = () => {
	const {
		user: { uuid },
	} = useSelector(getAuthState);

	const navigate = useNavigate();
	const isVerySmall = useMediaQuery('(max-width:356px)');
	// const isSmall = useMediaQuery('(max-width:540px)');

	// const [initializePayment] = useInitializePaymentMutation();

	const { data: payments, isLoading: paymentsLoading } =
		useGetUpcomingPaymentsQuery(uuid);

	const { data: paymentMethods, isLoading: paymentMethodsLoading } =
		useGetPaymentMethodsQuery();

	const [paymentsData] = payments || [];

	const renderRightContent = () => {
		return (
			<Stack direction='column' alignItems={{ xs: 'start', sm: 'end' }}>
				<Typography variant='h4' sx={{ fontWeight: 'normal' }}>
					{getLocaleFormat(paymentsData?.amount || 0, 'currency', 2)}
				</Typography>
				<Typography
					variant='subtitle2'
					sx={{ textWrap: 'wrap', wordBreak: 'break-word' }}
				>
					{formatPaymentStatusText(
						paymentsData?.daysToDue || 0,
						paymentsData?.status || '',
					)}
				</Typography>
			</Stack>
		);
	};

	const handlePaymentButtonClick = () => {
		navigate('/payments/confirm');
		// try {
		// 	// await initializePayment({
		// 	// 	invoiceId: paymentsData?.invoiceId || '',
		// 	// 	amount: paymentsData?.amount || 0,
		// 	// });
		// } catch (e) {
		// 	// console.log(e)
		// }
	};

	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{
					mb: 1,
					mt: 2,
					flexWrap: isVerySmall ? 'wrap' : 'nowrap',
					gap: isVerySmall ? 2 : 0,
				}}
			>
				<Typography
					variant='h5'
					sx={{
						flexShrink: 0,
						minWidth: isVerySmall ? '100%' : 'auto',
					}}
				>
					Rent Payments
				</Typography>
				<Button
					onClick={handlePaymentButtonClick}
					variant='contained'
					color='primary'
					size='large'
					sx={{
						borderRadius: 2,
						minWidth: 120,
						fontWeight: 600,
						flexShrink: 0,
						width: 'auto',
						alignSelf: isVerySmall ? 'flex-start' : 'center',
					}}
				>
					<CreditCardIcon sx={{ mr: 1 }} fontSize='small' /> Pay Now
				</Button>
			</Stack>

			{/* Next Payment Due Banner */}

			<PageHeader
				sx={{
					color: 'white',
					background: paymentsData?.status.includes('Overdue')
						? 'linear-gradient(45deg, #FF4D49,#E60E19)'
						: 'linear-gradient(45deg, #00BC7D, #009689)',
				}}
				loading={paymentsLoading}
				title={<Typography variant='h4'>Next Payment Due</Typography>}
				subtitle={
					<Stack direction='column' gap={1}>
						<Typography variant='subtitle2'>{paymentsData?.dueDate}</Typography>
						{/* <Stack direction='row' alignItems='center' gap={1}>
							<CheckCircleOutlineIcon sx={{ fontSize: '12px' }} />

							<Typography variant='subtitle2'>Auto-pay is enabled</Typography>
						</Stack> */}
					</Stack>
				}
				variant='compact'
				rightContent={renderRightContent()}
			/>

			{/* Payment Methods */}
			{paymentMethods?.length > 0 && (
				<Card
					sx={{
						mb: 4,
						p: { xs: 2, sm: 3 },
						borderRadius: 3,
						overflow: 'hidden',
					}}
				>
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
