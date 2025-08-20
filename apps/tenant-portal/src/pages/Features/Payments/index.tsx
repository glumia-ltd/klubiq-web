import {
	Box,
	Card,
	Stack,
	Typography,
	Button,
	useMediaQuery,
	Theme,
	SxProps,
	useTheme,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
	DynamicModal,
	DynamicModalProps,
	PageHeader,
	RadioCardGroup,
	RadioCardOption,
} from '@klubiq/ui-components';
import PaymentHistoryTable from '@/components/PaymentHistoryTable/PaymentHistoryTable';
import {
	useGetUpcomingPaymentsQuery,
	useInitializeMutation,
	useLazyGetTransactionStatusQuery,
	useUpdateTransactionStatusMutation,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { getAuthState } from '@/store/AuthStore/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getLocaleFormat, formatPaymentStatusText } from '@/helpers/utils';
import { useEffect, useState, useCallback, useMemo } from 'react';
import VitalSwapLogo from '@/assets/images/vitalswap-logo.svg';
import MonnifyLogo from '@/assets/images/monnify-logo.svg';
import {
	PaymentData,
	PaymentProvider,
	PaymentProviders,
} from '@/shared/types/data.types';
import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';
import { RootState } from '@/store/store.types';

const paymentOptions = [
	{
		value: PaymentProviders.vitalswap,
		label: (
			<Box
				sx={{
					width: '100%',
				}}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<img width={100} src={VitalSwapLogo} alt='Vitalswap' />
					<Typography variant='body1' sx={{ color: 'text.secondary' }}>
						Pay with Vitalswap
					</Typography>
				</Stack>
			</Box>
		),
		sx: {
			border: '1px solid',
			borderColor: 'primary.main',
			p: 1,
		},
	},
	{
		value: PaymentProviders.monnify,
		label: (
			<Box
				sx={{
					width: '100%',
				}}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<img width={100} src={MonnifyLogo} alt='Monnify' />
					<Typography variant='body1' sx={{ color: 'text.secondary' }}>
						Pay with Monnify
					</Typography>
				</Stack>
			</Box>
		),
		sx: {
			border: '1px solid',
			borderColor: 'primary.main',
			p: 1,
		},
	},
] as RadioCardOption[];
const PaymentsPage = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const paymentReference = urlParams.get('paymentReference');
	const environment = import.meta.env.VITE_NODE_ENV;
	const dispatch = useDispatch();
	const theme = useTheme();
	const paymentTestMode = import.meta.env.VITE_NODE_ENV === 'local';
	// State management
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
	const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
	const [selectedProvider, setSelectedProvider] =
		useState<PaymentProvider | null>(null);
	const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
	const [_transactionData, setTransactionData] = useState<PaymentData | null>(
		null,
	);
	const [paymentRef, setPaymentRef] = useState<string | null>(null);

	// Media queries
	const isVerySmall = useMediaQuery('(max-width:356px)');

	// Redux selectors
	const  { user: { profileuuid, uuid, email, firstname, lastname, companyname } } = useSelector(getAuthState);

	// API hooks
	const [initializePayment, { isLoading: isInitializingPayment }] =
		useInitializeMutation();
	const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
	const [getTransactionStatus] = useLazyGetTransactionStatusQuery();

	const { data: payments, isLoading: paymentsLoading } =
		useGetUpcomingPaymentsQuery(uuid);
	const [paymentsData] = payments || [];

	// Memoized values
	const paymentAmount = useMemo(
		() => paymentsData?.amount || 0,
		[paymentsData?.amount],
	);
	const paymentStatus = useMemo(
		() => paymentsData?.status || '',
		[paymentsData?.status],
	);
	const daysToDue = useMemo(
		() => paymentsData?.daysToDue || 0,
		[paymentsData?.daysToDue],
	);
	const isOverdue = useMemo(
		() => paymentStatus.includes('Overdue'),
		[paymentStatus],
	);
	const backgroundGradient = useMemo(
		() =>
			isOverdue
				? 'linear-gradient(45deg, #FF4D49,#E60E19)'
				: 'linear-gradient(45deg, #00BC7D, #009689)',
		[isOverdue],
	);

	const handleProviderChange = (value: string) => {
		setSelectedProvider(
			PaymentProviders[value as keyof typeof PaymentProviders],
		);
	};

	const clearAllUrlParams = () => {
		const url = new URL(window.location.href);
		url.search = '';
		window.history.replaceState({}, '', url.toString());
	};

	useEffect(() => {
		if (!paymentWindow && paymentReference) {
			setPaymentRef(paymentReference);
			getTransactionStatus({
				provider: 'monnify',
				reference: paymentReference,
			});
			clearAllUrlParams();
		}
	}, [paymentWindow]);

	// Callback functions
	const openPayment = (checkoutUrl: string) => {
		setIsPaymentProcessing(true);
		const newWindow = window.open(checkoutUrl, '_self');
		setPaymentWindow(newWindow);
	};

	const initializePaymentSession = async (provider: PaymentProvider) => {
		setSelectedProvider(provider);

		const body = {
			invoiceId: paymentsData?.invoiceId,
			amount: paymentsData?.amount,
			providerName: provider,
			metadata: {
				redirectUrl: `${window.location.origin}/payments`,
				description: `Rent payment for ${paymentsData?.propertyName}-${paymentsData?.unitNumber}`,
				formattedAmount: getLocaleFormat(paymentsData?.amount, 'currency', 2),
				propertyName: paymentsData?.propertyName,
				unitNumber: paymentsData?.unitNumber,
				tenantProfileId: profileuuid,
				payeeName: `${firstname} ${lastname} ${companyname ? `(${companyname})` : ''}`,
				payeeEmail: email,
			},
		};

		try {
			dispatch(
				openSnackbar({
					message: 'Initializing payment session...',
					severity: 'info',
					isOpen: true,
					duration: 5000,
				}),
			);
			const response = await initializePayment({
				body,
				testMode: paymentTestMode,
			}).unwrap();
			const { providerTxnId, ledgerId, ledgerReference } = response;
			setTransactionData({
				providerTxnId,
				ledgerId,
				ledgerReference,
				amount: paymentsData?.amount,
			});

			switch (provider) {
				case PaymentProviders.vitalswap:
					const vswapenv =
						environment === 'production' ? 'production' : 'sandbox';
					const { session_id, isOTP } = response.metadata;
					if ((window as any).vitalswapCheckout) {
						setIsPaymentProcessing(true);
						(window as any).vitalswapCheckout.init({
							session: session_id,
							isOtp: isOTP,
							email: email,
							callback: window.location.origin + '/payments',
							environment: vswapenv,
							onLoad: () => console.log('onLoad VitalSwap'),
							onsuccess: (data: any) => {
								updateTransactionStatus({
									ledgerId,
									txnStatus: 'success',
									metadata: data,
								});
								closePaymentMethodDialog();
							},
							onclose: () => {
								closePaymentMethodDialog();
								dispatch(
									openSnackbar({
										message:
											'You have closed the payment window. Please try again.',
										severity: 'warning',
										isOpen: true,
										duration: 5000,
									}),
								);
							},
							onerror: (error: any) => {
								updateTransactionStatus({
									ledgerId,
									txnStatus: 'failed',
									metadata: { message: 'Payment failed', ...error },
								});
								closePaymentMethodDialog();
							},
						});
					} else {
						dispatch(
							openSnackbar({
								message:
									'Payment system is not available, please try again later or try a different payment provider.',
								severity: 'warning',
								isOpen: true,
								duration: 5000,
							}),
						);
						setIsPaymentProcessing(false);
						setOpenPaymentMethodDialog(false);
					}
					break;
				case PaymentProviders.monnify:
					const { checkoutUrl } = response.metadata;
					openPayment(checkoutUrl);
					break;
			}
		} catch (error) {
			dispatch(
				openSnackbar({
					message: 'Error initializing payment session',
					severity: 'error',
					isOpen: true,
					duration: 5000,
				}),
			);
			console.error(error);
		}
	};

	const handlePaymentButtonClick = () => {
		setOpenPaymentMethodDialog(true);
	};

	const closePaymentMethodDialog = () => {
		setOpenPaymentMethodDialog(false);
		setSelectedProvider(null);
		setTransactionData(null);
		setIsPaymentProcessing(false);
	};

	// Memoized components
	const renderRightContent = useMemo(
		() =>
			paymentsData && (
				<Stack direction='column' alignItems={{ xs: 'start', sm: 'end' }}>
					<Typography variant='h4'>
						{getLocaleFormat(paymentAmount, 'currency', 2)}
					</Typography>
					<Typography
						variant='subtitle2'
						sx={{ textWrap: 'wrap', wordBreak: 'break-word' }}
					>
						{formatPaymentStatusText(daysToDue, paymentStatus)}
					</Typography>
				</Stack>
			),
		[paymentAmount, daysToDue, paymentStatus],
	);

	const paymentMethodModalContent = () => {
		return (
			<Stack
				direction='column'
				spacing={2}
				justifyContent='center'
				alignItems='center'
				sx={{ width: '100%', mt: 1, height: '100%' }}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					width='100%'
				>
					<Typography variant='body2'>Amount</Typography>
					<Typography variant='body1'>
						{getLocaleFormat(paymentAmount, 'currency', 2)}
					</Typography>
				</Stack>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					width='100%'
				>
					<Typography variant='body2'>Property</Typography>
					<Typography variant='body1'>{paymentsData?.propertyName}</Typography>
				</Stack>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					width='100%'
				>
					<Typography variant='body2'>Due Date</Typography>
					<Typography variant='body1'>{paymentsData?.dueDate}</Typography>
				</Stack>
				<Box sx={{ width: '100%' }}>
					<RadioCardGroup
						value={selectedProvider || ''}
						options={paymentOptions}
						onChange={handleProviderChange}
						radioPosition='left'
					/>
				</Box>
			</Stack>
		);
	};

	const paymentMethodModalFooter = () => {
		if (!selectedProvider) return undefined;
		return (
			<Stack direction='row' justifyContent='center' spacing={2} width='100%'>
				<Button
					variant='klubiqOutlinedButton'
					onClick={() => initializePaymentSession(selectedProvider)}
					size='small'
				>
					Proceed to{' '}
					<img
						width={100}
						src={
							selectedProvider === PaymentProviders.vitalswap
								? VitalSwapLogo
								: MonnifyLogo
						}
						alt={
							selectedProvider === PaymentProviders.vitalswap
								? 'Vitalswap'
								: 'Monnify'
						}
					/>
				</Button>
				<Backdrop
					sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
					open={isInitializingPayment || isPaymentProcessing}
				>
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						spacing={2}
					>
						<CircularProgress color='inherit' />
						<Typography variant='h6' color='inherit'>
							Initializing payment session...
						</Typography>
					</Stack>
				</Backdrop>
			</Stack>
		);
	};

	// Modal configurations
	const createModalConfig = useCallback(
		(
			open: boolean,
			onClose: () => void,
			children: React.ReactNode,
			footer?: React.ReactNode,
			sx?: SxProps<Theme>,
			headerText?: string,
			subHeaderText?: string,
		): DynamicModalProps => ({
			open,
			onClose: () => onClose(),
			headerText: headerText || undefined,
			subHeader: subHeaderText || undefined,
			headerAlign: 'center',
			contentAlign: 'center',
			contentDirection: 'column',
			borderRadius: 2,
			maxWidth: 'sm',
			fullScreenOnMobile: true,
			sx: {
				height: 'auto',
				border: '2px solid',
				borderColor:
					theme.palette.mode === 'dark'
						? theme.palette.divider
						: theme.palette.background.paper,
				...sx,
			},
			children: children || undefined,
			footer: footer || undefined,
		}),
		[theme.palette.mode, theme.palette.divider, theme.palette.background.paper],
	);

	const paymentMethodModalConfig = useMemo(
		() =>
			createModalConfig(
				openPaymentMethodDialog,
				closePaymentMethodDialog,
				paymentMethodModalContent(),
				paymentMethodModalFooter(),
				null,
				'Select Payment Method',
			),
		[
			openPaymentMethodDialog,
			closePaymentMethodDialog,
			paymentMethodModalContent,
			paymentMethodModalFooter,
			createModalConfig,
		],
	);

	return (
		<>
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
					<Typography variant='h4'>Rent Payments</Typography>

					<Button
						onClick={handlePaymentButtonClick}
						variant='klubiqMainButton'
						color='primary'
						size='large'
						disabled={!paymentsData}
						startIcon={<CreditCardIcon />}
					>
						Pay Now
					</Button>
				</Stack>

				<PageHeader
					sx={{
						color: 'white',
						background: paymentsLoading
							? theme.palette.primary.light
							: backgroundGradient,
					}}
					loading={paymentsLoading}
					title={
						!paymentsLoading && !paymentsData ? (
							<Typography variant='h5'>No upcoming payments</Typography>
						) : (
							<Typography variant='h5'>Next Payment Due</Typography>
						)
					}
					subtitle={
						<Stack direction='column' gap={1}>
							<Typography variant='subtitle2'>
								{paymentsData?.dueDate}
							</Typography>
						</Stack>
					}
					variant='compact'
					rightContent={renderRightContent}
				/>

				<Card elevation={1} sx={{ p: 2, borderRadius: 3, overflow: 'hidden' }}>
					<PaymentHistoryTable />
				</Card>
			</Box>
			<DynamicModal {...paymentMethodModalConfig} />
		</>
	);
};

export default PaymentsPage;
