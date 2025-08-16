import React, { useState } from 'react';
import {
	Box,
	Card,
	Stack,
	Typography,
	Divider,
	Button,
	Skeleton,
	useTheme,
	Alert,
	// IconButton,
	FormControl,
	Theme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RadioCardGroup } from '@klubiq/ui-components';
// import { useGetLeaseInsightsQuery } from '@/store/GlobalStore/insightsApi.slice';
// import { PaymentFrequency } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '@/store/AuthStore/auth.slice';
import {
	useGetUpcomingPaymentsQuery,
	useIntializeBankTransferPaymentMutation,
	useInitializeCardPaymentMutation,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { getLocaleFormat, formatDate, getFullName } from '@/helpers/utils';

const iconBoxStyle = {
	width: 48,
	height: 48,
	borderRadius: 2,
	backgroundColor: 'action.selected',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const labelColumnStyle = {
	ml: 2,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};

const paymentOptions = [
	{
		value: 'CARD',
		label: (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={iconBoxStyle}>
					<CreditCardIcon fontSize='medium' color='inherit' />
				</Box>
				<Box sx={labelColumnStyle}>
					<Typography variant='h6' fontWeight={600}>
						Credit/Debit Card
					</Typography>
					<Typography variant='body1' sx={{ color: 'text.secondary', mt: 0.5 }}>
						Pay instantly with your card
					</Typography>
				</Box>
			</Box>
		),
	},
	{
		value: 'ACCOUNT_TRANSFER',
		label: (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={iconBoxStyle}>
					<AccountBalanceIcon fontSize='medium' color='inherit' />
				</Box>
				<Box sx={labelColumnStyle}>
					<Typography variant='h6' fontWeight={600}>
						Bank Transfer (ACH)
					</Typography>
					<Typography variant='body1' sx={{ color: 'text.secondary', mt: 0.5 }}>
						Direct transfer from your bank account
					</Typography>
				</Box>
			</Box>
		),
	},
	{
		value: 'DIRECT_DEBIT',
		label: (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={iconBoxStyle}>
					<AccountBalanceWalletIcon fontSize='medium' color='inherit' />
				</Box>
				<Box sx={labelColumnStyle}>
					<Typography variant='h6' fontWeight={600}>
						Direct Debit
					</Typography>
					<Typography variant='body1' sx={{ color: 'text.secondary', mt: 0.5 }}>
						Pay directly from your bank account
					</Typography>
				</Box>
			</Box>
		),
	},
];

const PaymentMethod: React.FC = () => {
	const navigate = useNavigate();
	const theme = useTheme();

	const {
		user: { uuid, firstname, lastname, companyname },
	} = useSelector(getAuthState);

	const { data: payments } = useGetUpcomingPaymentsQuery(uuid);
	const [intializeCardPayment] = useInitializeCardPaymentMutation();
	const [intializeBankTransferPayment] =
		useIntializeBankTransferPaymentMutation();

	const [paymentsData] = payments || [];

	const [
		loading,
		setLoading
	] = useState(false); // Simulate loading state
	const [paymentMethod, setPaymentMethod] = useState('CARD');
	// const { data: leaseInsights } = useGetLeaseInsightsQuery();

	// const PAYMENT_FREQUENCY = leaseInsights?.paymentFrequency;

	const handleBackButtonClick = () => {
		navigate('/payments');
	};

	// Function to filter payment options based on payment frequency
	// const getFilteredPaymentOptions = (paymentFrequency: string) => {
	// 	// Show Card and Wallet for all payment frequencies
	// 	// Only show Card when payment frequency is ONE_TIME
	// 	if (
	// 		paymentFrequency === PaymentFrequency.ONE_TIME ||
	// 		paymentFrequency === PaymentFrequency.CUSTOM
	// 	) {
	// 		return paymentOptions;
	// 	}

	// 	// For all other payment frequencies, show Card and Wallet
	// 	return paymentOptions.filter((option) => option.value !== 'card');
	// };

	// const displayCardByPaymentFrequency = getFilteredPaymentOptions(
	// 	PAYMENT_FREQUENCY || '',
	// );

	const intiateTransactionAndProceed = async () => {
		console.log('intiateTransaction for: ', paymentMethod);
		setLoading(true);
		try {
			let response;
			switch (paymentMethod) {
				case 'CARD':
					response = await intializeCardPayment({
						invoiceId: paymentsData?.invoiceId,
						amount: paymentsData?.amount,
						paymentMethod: paymentMethod,
					}).unwrap();
					break;
				case 'ACCOUNT_TRANSFER':
					response = await intializeBankTransferPayment({
						invoiceId: paymentsData?.invoiceId,
						amount: paymentsData?.amount,
						paymentMethod: paymentMethod,
					}).unwrap();
					break;
				case 'DIRECT_DEBIT':
					break;
				default:
					break;
			}
			console.log('response: ', response);
			if (response) {
				navigate('/payments/confirm', {
					state: {
						paymentMethod: paymentMethod,
						transactionData: response,
						paymentSummary: {
							amount: paymentsData?.amount,
							dueDate: paymentsData?.dueDate,
							propertyName: paymentsData?.propertyName,
							payee: getFullName(firstname, lastname, companyname),
							invoiceId: paymentsData?.invoiceId,
							ledgerId: response?.ledgerId,
                            transactionReference: response?.providerTxnId,
						},
					},
				});
			}
		} catch (error) {
			console.log('error: ', error);
		} finally {
			setLoading(false);
		}
	};
	// DRY: Extracted repeated colors and styles
	const getCardBorderColor = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.klubiqMysticGrey;
	const getCardActiveBorderColor = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.klubiqRoyalBlue;
	const getCardActiveBg = (theme: Theme) =>
		(theme as any)?.palette?.background?.default;
	const getAlertBg = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.klubiqLightBlue;
	const getAlertTitleColor = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.alertDeepBlue;
	const getAlertTextColor = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.alertLightBlue;
	const alertBoxStyle = (theme: Theme) => ({
		bgcolor: getAlertBg(theme),
		borderRadius: 2,
		fontSize: 13,
		alignItems: 'flex-start',
		padding: 1.5,
	});

	const summaryRowStyle = {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<Box sx={{ width: '100%', maxWidth: 500 }}>
				{/* Back Button */}

				<Button
					variant='klubiqTextButton'
					startIcon={<ArrowBackIcon fontSize='small' />}
					sx={{ mb: 1, cursor: 'pointer' }}
					onClick={handleBackButtonClick}
				>
					Back
				</Button>

				{/* Confirm Payment Title */}
				<Typography variant='h4' sx={{ mb: 1 }}>
					Confirm Payment
				</Typography>
				{/* Main Card */}
				<Card
					sx={{
						borderRadius: 3,
						boxShadow: theme.shadows[1],
						p: { xs: 2, md: 2.5 },
						mb: 1,
					}}
				>
					{/* Payment Summary */}
					<Box sx={{ mb: 1.5 }}>
						<Typography variant='h6' sx={{ mb: 1.5 }}>
							Payment Summary
						</Typography>
						{loading ? (
							<Skeleton
								variant='rectangular'
								height={80}
								sx={{ borderRadius: 2 }}
							/>
						) : (
							<Box>
								{/* Details Grid  */}
								<Box sx={{ width: '100%' }}>
									<Stack spacing={1.5}>
										{/* Details Rows */}
										<Box sx={summaryRowStyle}>
											<Typography>
												{`Rent Payment - ${formatDate(paymentsData?.dueDate || '', 'MMMM, YYYY')}`}
											</Typography>
											<Typography variant='h4' color='text.primary'>
												{getLocaleFormat(
													paymentsData?.amount || 0,
													'currency',
													2,
												)}
											</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Due Date</Typography>
											<Typography>
												{formatDate(paymentsData?.dueDate || '')}
											</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Property</Typography>
											<Typography>{paymentsData?.propertyName}</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Payee</Typography>
											<Typography>
												{getFullName(firstname, lastname, companyname)}
											</Typography>
										</Box>
									</Stack>
								</Box>
							</Box>
						)}
					</Box>
					<Divider sx={{ my: 1.5 }} />
					{/* Payment Method Section */}
					<Box sx={{ mb: 1.5 }}>
						<Typography variant='h6' sx={{ mb: 1.5 }}>
							Choose Payment Method
						</Typography>
						<FormControl component='fieldset' fullWidth>
							<Box
								sx={{
									'& .MuiCard-root': {
										border: `2px solid ${getCardBorderColor(theme)}`,
										borderRadius: '8px',
										boxShadow: 'none',
									},
									'& .MuiCard-root[data-active="true"]': {
										border: `2px solid ${getCardActiveBorderColor(theme)}`,
										backgroundColor: getCardActiveBg(theme),
									},
								}}
							>
								<RadioCardGroup
									value={paymentMethod}
									options={paymentOptions}
									onChange={setPaymentMethod}
									radioPosition='right'
								/>
							</Box>
						</FormControl>
					</Box>
					{/* Secure Payment Info */}
					<Alert
						icon={<LockOutlinedIcon color='inherit' />}
						severity='info'
						sx={{ ...alertBoxStyle(theme), mb: 1.5 }}
					>
						<Typography
							variant='h6'
							sx={{ mb: 0.5 }}
							color={getAlertTitleColor(theme)}
						>
							Secure Payment
						</Typography>
						<Typography variant='body1' color={getAlertTextColor(theme)}>
							Your payment information is encrypted and secure. We use
							industry-standard security measures to protect your data.
						</Typography>
					</Alert>
					{/* Proceed Button */}
					<Button
						variant='klubiqMainButton'
						size='large'
						fullWidth
						disabled={loading}
						onClick={intiateTransactionAndProceed}
					>
						Proceed
					</Button>
				</Card>
			</Box>
		</Box>
	);
};

export default PaymentMethod;
