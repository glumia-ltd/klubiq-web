import React, { useEffect, useRef, useState } from 'react';
import {
	Box,
	Card,
	Typography,
	Divider,
	Button,
	Skeleton,
	useTheme,
	Alert,
	FormControl,
	Chip,
	Stack,
	CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPaymentMethodCard from '@/components/AddPaymentMethodCard/AddPaymentMethodCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { RadioCardGroup } from '@klubiq/ui-components';
import { useGetPaymentMethodsQuery } from '@/store/PaymentsStore/paymentsApiSlice';
import { CardPaymentMethod } from '@/shared/types/payment.types';
import { formatDate, getLocaleFormat } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom';
import { CardPaymentForm, CardPaymentFormRef } from '@klubiq/ui-components';
import { ClientEncryptionUtil } from '@/helpers/encryption.util';
import { Download, TaskAltRounded } from '@mui/icons-material';

const iconBoxStyle = {
	width: 40,
	height: 40,
	borderRadius: 2,
	backgroundColor: 'action.selected',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	mr: 2,
};

const labelColumnStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
};
const initialFormData = {
	cardNumber: '',
	expiryMonth: '',
	expiryYear: '',
	cvv: '',
	cardholderName: '',
	saveCard: false,
	pin: '',
};

const renderSavedCards = (paymentMethods: CardPaymentMethod[]) => {
	return paymentMethods.map((method) => {
		return {
			value: method.id,
			label: (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={iconBoxStyle}>
							<CreditCardIcon fontSize='medium' />
						</Box>
						<Box sx={labelColumnStyle}>
							<Typography variant='h6' fontWeight={600}>
								{method.cardType} •••• •••• •••• {method.last4}
							</Typography>
							<Typography variant='body2'>
								Expires {method.expiryMonth}/{method.expiryYear}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
						<Chip variant='greenChip' label='Primary' />
					</Box>
				</Box>
			),
		};
	});
};
type PaymentSummary = {
	amount: number;
	dueDate: string;
	propertyName: string;
	payee: string;
	invoiceId: string;
	ledgerId: string;
	transactionReference: string;
};

type CardPaymentFormData = {
	cardNumber: string;
	expiryMonth: string;
	expiryYear: string;
	cvv: string;
	cardholderName: string;
	saveCard: boolean;
	pin: string;
};
const CardPayment: React.FC<{
	paymentSummary: PaymentSummary;
	publicKey: string;
}> = ({ paymentSummary, publicKey }) => {
	const formRef = useRef<CardPaymentFormRef>(null);
	const [isPaymentProcessing] = useState(false);
	const [isPaymentSuccess] = useState(false);

	// const [
	// 	processCardPayment,
	// 	{ isLoading: isPaymentProcessing, isSuccess: isPaymentSuccess },
	// ] = useProcessCardPaymentMutation();
	const [formData, setFormData] =
		useState<CardPaymentFormData>(initialFormData);
	const [isFormValid, setIsFormValid] = useState(false);
	const theme = useTheme();
	const navigate = useNavigate();
	const [
		loading,
		// setLoading
	] = useState(false); // Simulate loading state
	const [selectedCard, setSelectedCard] = useState<CardPaymentMethod | null>(
		null,
	);
	const [showAddCard, setShowAddCard] = useState(false);
	const { data: paymentMethods, isLoading: paymentMethodsLoading } =
		useGetPaymentMethodsQuery();
	// Filter to get only card payment methods
	const cardPaymentMethods =
		paymentMethods?.filter((method) => method.type === 'CARD') || [];

	// Get the first card payment method (if you need just one)
	useEffect(() => {
		if (cardPaymentMethods.length > 0) {
			const primaryCard = cardPaymentMethods.find((card) => card.isPrimary);
			setSelectedCard(primaryCard || cardPaymentMethods[0]);
		}
	}, [cardPaymentMethods]);

	// Or if you need to find a specific card by some criteria
	// const specificCard = cardPaymentMethods.find(
	// 	(method) => method.last4 === '1234',
	// );
	const handlePay = async () => {
		try {
			if (selectedCard) {
				console.log(selectedCard);
			} else {
				console.log(formData);
				const cardData = {
					cardNumber: formData?.cardNumber.replace(/\s/g, ''),
					expiryMonth: formData?.expiryMonth,
					expiryYear: formData?.expiryYear,
					cvv: formData?.cvv,
					pin: formData?.pin,
					cardholderName: formData?.cardholderName,
				};
				const encryptedCardData = await ClientEncryptionUtil.encryptCardData(
					publicKey,
					cardData,
				);
				const browserData = {
					httpBrowserLanguage: navigator.language,
					httpBrowserJavaEnabled: navigator.javaEnabled(),
					httpBrowserJavaScriptEnabled:
						window.document.documentElement.hasAttribute('data-js-enabled'),
					httpBrowserColorDepth: screen.colorDepth,
					httpBrowserScreenHeight: screen.height,
					httpBrowserScreenWidth: screen.width,
					httpBrowserTimeDifference: new Date().getTimezoneOffset(),
					userAgentBrowserValue: navigator.userAgent,
				};
				const requestData = {
					invoiceId: paymentSummary?.invoiceId,
					amount: paymentSummary?.amount,
					saveCard: formData?.saveCard,
					ledgerId: paymentSummary?.ledgerId,
					encryptedCardData,
					metadata: {
						...browserData,
						transactionReference: paymentSummary?.transactionReference,
					},
				};
				console.log(requestData);
				setFormData({
					...initialFormData,
				});
			}
		} catch (error) {
			console.log(error);
			setFormData({
				...initialFormData,
			});
		}
	};

	return !isPaymentProcessing && !isPaymentSuccess ? (
		<Box
			sx={{
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<Stack
				sx={{ width: '100%', maxWidth: 500 }}
				direction='column'
				spacing={2}
				alignItems='flex-start'
			>
				{/* Back Link */}

				<Button
					variant='klubiqTextButton'
					startIcon={<ArrowBackIcon fontSize='small' />}
					onClick={() => navigate(-1)}
				>
					Back to Payment Methods
				</Button>

				{/* Title and Subtitle */}
				<Typography variant='h4'>Card Payment</Typography>
				<Typography variant='body1'>
					Choose your card or add a new one
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
					<Stack direction='column' spacing={2}>
						{/* Payment Summary */}
						<Stack direction='column' spacing={2}>
							<Typography variant='h6'>Payment Summary</Typography>
							{loading ? (
								<Skeleton
									variant='rectangular'
									height={60}
									sx={{ borderRadius: 2 }}
								/>
							) : (
								<Stack
									direction='row'
									spacing={2}
									justifyContent='space-between'
									alignItems='center'
								>
									<Typography variant='body1'>
										{paymentSummary.propertyName}{' '}
										{`Rent Payment - ${formatDate(paymentSummary.dueDate || '', 'MMMM, YYYY')}`}
									</Typography>
									<Typography variant='h6'>
										{getLocaleFormat(
											paymentSummary?.amount || 0,
											'currency',
											2,
										)}
									</Typography>
								</Stack>
							)}
						</Stack>
						<Divider />
						{/* Saved Cards */}
						<Box sx={{ my: 2 }}>
							{paymentMethodsLoading ? (
								<Skeleton
									variant='rectangular'
									height={24}
									sx={{ borderRadius: 2, mb: 2 }}
								/>
							) : (
								paymentMethods &&
								paymentMethods.length > 0 && (
									<Typography variant='h6' sx={{ mb: 1.5 }}>
										Saved Cards
									</Typography>
								)
							)}
							{loading ? (
								<Skeleton
									variant='rectangular'
									height={120}
									sx={{ borderRadius: 2, mb: 2 }}
								/>
							) : (
								<FormControl component='fieldset' fullWidth>
									<Box
										sx={{
											'& .MuiCard-root': {
												border: '2px solid #D6DEEB',
												borderRadius: '8px',
												boxShadow: 'none',
											},
											'& .MuiCard-root[data-active="true"]': {
												border: '2px solid #0A2343',
												backgroundColor: '#F3F6FA',
											},
										}}
									>
										<RadioCardGroup
											value={selectedCard?.id || ''}
											options={renderSavedCards(cardPaymentMethods)}
											onChange={(value) => {
												const card = cardPaymentMethods.find(
													(card) => card.id === value,
												);
												setSelectedCard(card || null);
											}}
											radioPosition='right'
										/>
									</Box>
								</FormControl>
							)}
							{/* Add New Card Button */}
							{showAddCard ? (
								<CardPaymentForm
									ref={formRef}
									showSaveCardOption={true}
									onFormChange={(data: any, isValid: boolean) => {
										setFormData(data);
										setIsFormValid(isValid);
									}}
									header='Add New Card'
									showPinOption={true}
								/>
							) : (
								<AddPaymentMethodCard
									iconPosition='left'
									content='Add New Card'
									onClick={() => setShowAddCard((prev) => !prev)}
								/>
							)}
						</Box>
						{/* Secure Payment Info */}
						<Alert
							icon={<ShieldOutlinedIcon color='inherit' />}
							severity='info'
							sx={{
								bgcolor: (theme as any)?.palette?.textColors?.klubiqLightBlue,
								borderRadius: 2,
								mb: 2,
								fontSize: 13,
								alignItems: 'flex-start',
								padding: 2,
							}}
						>
							<Typography
								fontWeight={600}
								sx={{ mb: 0.5 }}
								color={(theme as any)?.palette?.textColors?.alertDeepBlue}
							>
								Secure Payment
							</Typography>
							<Typography
								variant='body1'
								color={(theme as any)?.palette?.textColors?.alertLightBlue}
							>
								Your card information is encrypted and processed securely
								through our PCI-compliant payment processor.
							</Typography>
						</Alert>
						{/* Pay Button */}
						<Button
							variant='klubiqMainButton'
							size='large'
							fullWidth
							disabled={loading || !isFormValid}
							onClick={handlePay}
						>
							Pay {getLocaleFormat(paymentSummary?.amount || 0, 'currency', 2)}
						</Button>
					</Stack>
				</Card>
			</Stack>
		</Box>
	) : !isPaymentSuccess ? (
		<Box
			sx={{
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<Card
				sx={{
					borderRadius: 3,
					boxShadow: theme.shadows[1],
					p: 3,
					width: '100%',
					maxWidth: 450,
				}}
			>
				<Stack
					direction='column'
					spacing={3}
					alignItems='center'
					justifyContent='center'
				>
					<CircularProgress color='primary' />
					<Typography variant='h6'>Processing Your Payment</Typography>
					<Typography variant='body1'>Processing payment...</Typography>
					<Card
						variant='expired'
						sx={{
							borderRadius: 3,
							p: 2,
							// backgroundColor: (theme as any)?.palette?.secondary?.main,
							width: '100%',
						}}
					>
						<Stack
							direction='column'
							spacing={2}
							justifyContent='space-between'
						>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Amount</Typography>
								<Typography variant='body2'>
									{getLocaleFormat(paymentSummary?.amount || 0, 'currency', 2)}
								</Typography>
							</Stack>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Method</Typography>
								<Typography variant='body2'>Debit Card</Typography>
							</Stack>
						</Stack>
					</Card>
					<Typography variant='caption'>
						Please do not close this window...
					</Typography>
				</Stack>
			</Card>
		</Box>
	) : (
		<Box
			sx={{
				bgcolor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			<Card
				sx={{
					borderRadius: 3,
					boxShadow: theme.shadows[1],
					p: { xs: 2, md: 2.5 },
					mb: 1,
					width: '100%',
					maxWidth: 480,
				}}
			>
				<Stack
					direction='column'
					alignItems='center'
					justifyContent='space-between'
					spacing={2}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: 'info.light',
							borderRadius: '50%',
							p: 1,
						}}
					>
						<TaskAltRounded color='info' sx={{ fontSize: 30 }} />
					</Box>
					<Typography variant='h6'>Payment Successful</Typography>
					<Typography variant='body1'>
						Your payment has been processed successfully
					</Typography>
					<Card
						sx={{
							borderRadius: 3,
							p: 2,
							width: '100%',
							maxWidth: 450,
						}}
						variant='expired'
					>
						<Stack
							direction='column'
							spacing={2}
							justifyContent='space-between'
						>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Transaction ID</Typography>
								<Typography variant='body2'>
									{paymentSummary?.transactionReference}
								</Typography>
							</Stack>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Amount Paid</Typography>
								<Typography variant='body2'>
									{getLocaleFormat(paymentSummary?.amount || 0, 'currency', 2)}
								</Typography>
							</Stack>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Payment Date</Typography>
								<Typography variant='body2'>Debit Card</Typography>
							</Stack>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>Property</Typography>
								<Typography variant='body2'>
									{paymentSummary?.propertyName}
								</Typography>
							</Stack>
						</Stack>
					</Card>
					<Button
						variant='klubiqMainButton'
						fullWidth
						onClick={() => navigate('/dashboard')}
					>
						Back to Dashboard
					</Button>
					<Button
						variant='klubiqOutlinedButton'
						fullWidth
						startIcon={<Download />}
					>
						Download Receipt
					</Button>
				</Stack>
			</Card>
		</Box>
	);
};

export default CardPayment;
