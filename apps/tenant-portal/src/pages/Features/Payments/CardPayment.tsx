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
	IconButton,
	FormControl,
	Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPaymentMethodCard from '@/components/AddPaymentMethodCard/AddPaymentMethodCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { RadioCardGroup } from '@klubiq/ui-components';
import { KlubiqFormV1, FormFieldV1 } from '@klubiq/ui-components';

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

const savedCards = [
	{
		value: 'visa',
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
							Visa •••• •••• •••• 4242
						</Typography>
						<Typography variant='body2'>Expires 12/2027</Typography>
					</Box>
				</Box>
				<Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
					<Chip variant='greenChip' label='Primary' />
				</Box>
			</Box>
		),
	},
	{
		value: 'mastercard',
		label: (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={iconBoxStyle}>
					<CreditCardIcon fontSize='medium' color='inherit' />
				</Box>
				<Box sx={labelColumnStyle}>
					<Typography variant='h6' fontWeight={600}>
						Mastercard •••• •••• •••• 5555
					</Typography>
					<Typography variant='body2'>Expires 08/2026</Typography>
				</Box>
			</Box>
		),
	},
];

const paymentSummary = {
	title: 'Rent Payment - February 2025',
	amount: 1200,
};

const months = [
	'01',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'11',
	'12',
];
const years = Array.from({ length: 12 }, (_, i) => `${2024 + i}`);

const addCardFields: FormFieldV1[] = [
	{
		name: 'fullName',
		label: 'Full Name',
		type: 'text',
		placeholder: 'e.g. Chiamaka Adegboyega',
		required: true,
	},
	{
		name: 'cardNumber',
		label: 'Card Number',
		type: 'text',
		placeholder: '1234 5678 9012 3456',
		required: true,
		adornment: {
			prefix: <CreditCardIcon color='inherit' />,
		},
	},
	{
		name: 'month',
		label: 'Month',
		type: 'select',
		options: [
			{ label: 'MM', value: '' },
			...months.map((m) => ({ label: m, value: m })),
		],
		required: true,
		width: '33%',
	},
	{
		name: 'year',
		label: 'Year',
		type: 'select',
		options: [
			{ label: 'YYYY', value: '' },
			...years.map((y) => ({ label: y, value: y })),
		],
		required: true,
		width: '33%',
	},
	{
		name: 'cvv',
		label: 'CVV',
		type: 'text',
		placeholder: '123',
		required: true,
		width: '33%',
	},
	{
		name: 'saveCard',
		label: 'Save this card for future payments',
		type: 'checkbox',
		required: false,
		isInFieldLabel: true,
	},
];

const CardPayment: React.FC = () => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false); // Simulate loading state
	const [selectedCard, setSelectedCard] = useState('visa');
	const [showAddCard, setShowAddCard] = useState(false);

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: 'background.default',
				py: { xs: 1, md: 2 },
				px: { xs: 0, md: 2 },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box sx={{ width: '100%', maxWidth: 500 }}>
				{/* Back Link */}
				<Stack
					direction='row'
					alignItems='center'
					spacing={1}
					sx={{ mb: 1, cursor: 'pointer' }}
				>
					<IconButton size='small' sx={{ p: 0 }}>
						<ArrowBackIcon fontSize='small' />
					</IconButton>
					<Typography>Back to Payment Methods</Typography>
				</Stack>
				{/* Title and Subtitle */}
				<Typography variant='h5' sx={{ mb: 0.5 }}>
					Card Payment
				</Typography>
				<Typography sx={{ mb: 2 }}>
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
					{/* Payment Summary */}
					<Box sx={{ mb: 2 }}>
						<Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
							Payment Summary
						</Typography>
						{loading ? (
							<Skeleton
								variant='rectangular'
								height={60}
								sx={{ borderRadius: 2 }}
							/>
						) : (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									mb: 1.5,
								}}
							>
								<Typography variant='body1' fontWeight={600}>
									{paymentSummary.title}
								</Typography>
								<Typography variant='h4' fontWeight={700}>
									${paymentSummary.amount.toLocaleString()}
								</Typography>
							</Box>
						)}
					</Box>
					<Divider />
					{/* Saved Cards */}
					<Box sx={{ my: 2 }}>
						<Typography variant='h6' fontWeight={600} sx={{ mb: 1.5 }}>
							Saved Cards
						</Typography>
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
										value={selectedCard}
										options={savedCards}
										onChange={setSelectedCard}
										radioPosition='right'
									/>
								</Box>
							</FormControl>
						)}
						{/* Add New Card Button */}
						{
							<AddPaymentMethodCard
								height={36}
								iconPosition='left'
								content='Add New Card'
								onClick={() => setShowAddCard((prev) => !prev)}
							/>
						}
					</Box>
					{/* Add New Card Form */}
					{showAddCard && (
						<Box>
							<Typography variant='h6' fontWeight={600} sx={{ mb: 1.5 }}>
								Add New Card
							</Typography>
							<KlubiqFormV1
								fields={addCardFields}
								onSubmit={async () => {}}
								initialValues={{}}
								submitButtonText={''}
								formWidth='100%'
								enableErrorAlert={false}
								horizontalAlignment='left'
								verticalAlignment='top'
							/>
						</Box>
					)}
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
							color={(theme as any)?.palette?.textColors?.alertLightBlue}
						>
							Your card information is encrypted and processed securely through
							our PCI-compliant payment processor.
						</Typography>
					</Alert>
					{/* Pay Button */}
					<Button
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16, py: 1.25 }}
						disabled={loading}
					>
						Pay ${paymentSummary.amount.toLocaleString()}
					</Button>
				</Card>
			</Box>
		</Box>
	);
};

export default CardPayment;
