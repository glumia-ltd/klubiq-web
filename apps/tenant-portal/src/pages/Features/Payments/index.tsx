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
} from '@klubiq/ui-components';
import PaymentHistoryTable from '@/components/PaymentHistoryTable/PaymentHistoryTable';
import {
	useGetTransactionStatusQuery,
	useGetUpcomingPaymentsQuery,
	useInitializeMutation,
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
import { useNavigate } from 'react-router-dom';

const paymentOptions = [
	{
		value: PaymentProviders.vitalswap,
		label: (
			<Box sx={{ width: '100%', border: '1px solid primary.main' }}>
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
	},
	{
		value: PaymentProviders.monnify,
		label: (
			<Box sx={{ width: '100%', border: '1px solid primary.main' }}>
				<Stack
					sx={{ width: '100%', border: '1px solid primary.main' }}
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
	},
];
const PaymentsPage = () => {
	const environment = import.meta.env.VITE_NODE_ENV;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	// State management
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
	const [monnifyPolling, setMonnifyPolling] = useState(false);
	const [pollingInterval, setPollingInterval] = useState<number | null>(null);
	const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
	const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(
		null,
	);
	const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
	const [transactionData, setTransactionData] = useState<PaymentData | null>(
		null,
	);

	// Media queries
	const isVerySmall = useMediaQuery('(max-width:356px)');

	// Redux selectors
	const {
		user: { uuid, email },
	} = useSelector(getAuthState);

	// API hooks
	const [initializePayment, { isLoading: isInitializingPayment }] =
		useInitializeMutation();
	const [updateTransactionStatus] = useUpdateTransactionStatusMutation();

	// Query conditions
	const shouldFetchTransactionStatus = useMemo(
		() =>
			selectedProvider === PaymentProviders.monnify &&
			!!transactionData?.providerTxnId,
		[selectedProvider, transactionData?.providerTxnId],
	);

	const { data: _transactionStatus, refetch } = useGetTransactionStatusQuery(
		{
			provider: 'monnify',
			reference: transactionData?.providerTxnId || '',
		},
		{ skip: !shouldFetchTransactionStatus },
	);

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
		console.log('value selected: ', value);
		setSelectedProvider(
			PaymentProviders[value as keyof typeof PaymentProviders],
		);
	};

	// Monnify polling effect
	useEffect(() => {
		if (monnifyPolling && transactionData?.providerTxnId) {
			const interval = setInterval(async () => {
				try {
					const result = await refetch();
					console.log('Monnify polling result:', result);

					if (result.data === 'success' || result.data === 'failed') {
						setMonnifyPolling(false);
						setPollingInterval(null);
						clearInterval(interval);

						dispatch(
							openSnackbar({
								message:
									result.data === 'success'
										? 'Payment completed successfully!'
										: 'Payment failed or was cancelled',
								severity: result.data === 'success' ? 'success' : 'error',
								isOpen: true,
								duration: 5000,
							}),
						);
					}
				} catch (error) {
					console.error('Error polling Monnify status:', error);
				}
			}, 5000);

			setPollingInterval(interval);

			return () => {
				clearInterval(interval);
				setPollingInterval(null);
			};
		}
	}, [monnifyPolling, transactionData?.providerTxnId, refetch, dispatch]);

	// Cleanup effect
	useEffect(() => {
		return () => {
			if (pollingInterval) {
				clearInterval(pollingInterval);
			}
		};
	}, [pollingInterval]);

	// Callback functions
	const openPayment = useCallback(
		(checkoutUrl: string) => {
			const newWindow = window.open(checkoutUrl, '_self');
			setPaymentWindow(newWindow);
			if (selectedProvider === PaymentProviders.monnify) {
				setMonnifyPolling(true);
			}
		},
		[selectedProvider],
	);

	const returnToApp = useCallback(() => {
		if (paymentWindow) {
			paymentWindow.close();
			setPaymentWindow(null);

			if (monnifyPolling) {
				setMonnifyPolling(false);
				if (pollingInterval) {
					clearInterval(pollingInterval);
					setPollingInterval(null);
				}
			}
		}
		navigate('/payments');
	}, [paymentWindow, monnifyPolling, pollingInterval, navigate]);

	const initializePaymentSession = useCallback(
		async (provider: PaymentProvider) => {
			setSelectedProvider(provider);
			const body = {
				invoiceId: paymentsData?.invoiceId,
				amount: paymentsData?.amount,
				providerName: provider,
			};

			try {
				const response = await initializePayment(body).unwrap();
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
							// @ts-ignore
							(window as any).vitalswapCheckout.init({
								session: session_id,
								isOtp: isOTP,
								email: email,
								callback: window.location.origin + '/payments',
								environment: vswapenv,
								onLoad: () => console.log('onLoad VitalSwap'),
								onsuccess: (data: any) => {
									console.log('onsuccess', data);
									updateTransactionStatus({
										ledgerId,
										txnStatus: 'success',
										metadata: data,
									});
									setIsPaymentProcessing(false);
									setOpenPaymentMethodDialog(false);
								},
								onclose: () => {
									console.log('Payment window closed');
									dispatch(
										openSnackbar({
											message:
												'You have closed the payment window. Please try again.',
											severity: 'warning',
											isOpen: true,
											duration: 5000,
										}),
									);
									setIsPaymentProcessing(false);
								},
								onerror: (error: any) => {
									console.log('onerror', error);
									updateTransactionStatus({
										ledgerId,
										txnStatus: 'failed',
										metadata: { message: 'Payment failed', ...error },
									});
									setIsPaymentProcessing(false);
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
		},
		[
			paymentsData,
			environment,
			email,
			initializePayment,
			updateTransactionStatus,
			dispatch,
			openPayment,
		],
	);

	const handlePaymentButtonClick = useCallback(() => {
		setOpenPaymentMethodDialog(true);
	}, []);

	const closePaymentMethodDialog = useCallback(() => {
		setOpenPaymentMethodDialog(false);
	}, []);

	// Memoized components
	const renderRightContent = useMemo(
		() => (
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
		if (!selectedProvider) return <></>;
		return (
			<Stack direction='row' justifyContent='center' spacing={2} width='100%'>
				<Button
					variant='klubiqOutlinedButton'
					onClick={() => initializePaymentSession(PaymentProviders.vitalswap)}
					size='small'
				>
					Proceed to{' '}
					<img
						width={100}
						src={selectedProvider === PaymentProviders.vitalswap ? VitalSwapLogo : MonnifyLogo}
						alt={selectedProvider === PaymentProviders.vitalswap ? 'Vitalswap' : 'Monnify'}
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
			onClose,
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
			footer,
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

				<PageHeader
					sx={{
						color: 'white',
						background: backgroundGradient,
					}}
					loading={paymentsLoading}
					title={<Typography variant='h5'>Next Payment Due</Typography>}
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

				{paymentWindow && (
					<Button onClick={returnToApp} variant='klubiqOutlinedButton'>
						Return to Klubiq
					</Button>
				)}
			</Box>
			<DynamicModal {...paymentMethodModalConfig} />
		</>
	);
};

export default PaymentsPage;
