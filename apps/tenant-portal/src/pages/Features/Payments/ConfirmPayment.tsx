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
	Theme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { RadioCardGroup } from '@klubiq/ui-components';

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
		value: 'card',
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
		value: 'bank',
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
		value: 'wallet',
		label: (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={iconBoxStyle}>
					<AccountBalanceWalletIcon fontSize='medium' color='inherit' />
				</Box>
				<Box sx={labelColumnStyle}>
					<Typography variant='h6' fontWeight={600}>
						Klubiq Wallet
					</Typography>
					<Typography variant='body1' sx={{ color: 'text.secondary', mt: 0.5 }}>
						Use your Klubiq wallet balance
					</Typography>
				</Box>
			</Box>
		),
	},
];

const paymentSummary = {
	title: 'Rent Payment - February 2025',
	amount: 1200,
	dueDate: 'February 1, 2025',
	property: '123 Main St, Apt 4B',
	payee: 'Property Management Co.',
};

const ConfirmPayment: React.FC = () => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false); // Simulate loading state
	const [paymentMethod, setPaymentMethod] = useState('card');

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
		mb: 3,
		fontSize: 14,
		alignItems: 'flex-start',
		padding: 3,
	});

	const summaryTextColor = (theme: Theme) =>
		(theme as any)?.palette?.textColors?.azureKlubiqPickedBluewood;
	const summaryRowStyle = {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: 'background.default',
				py: { xs: 2, md: 6 },
				px: { xs: 0, md: 2 },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box sx={{ width: '100%', maxWidth: 600 }}>
				{/* Back Button */}
				<Stack
					direction='row'
					alignItems='center'
					spacing={1}
					sx={{ mb: 2, cursor: 'pointer' }}
				>
					<IconButton size='small' sx={{ p: 0 }}>
						<ArrowBackIcon fontSize='small' />
					</IconButton>
					<Typography variant='body1'>Back</Typography>
				</Stack>
				{/* Confirm Payment Title */}
				<Typography variant='h2' sx={{ mb: 3 }}>
					Confirm Payment
				</Typography>
				{/* Main Card */}
				<Card
					sx={{
						borderRadius: 3,
						boxShadow: theme.shadows[1],
						p: { xs: 2, md: 4 },
						mb: 2,
					}}
				>
					{/* Payment Summary */}
					<Box sx={{ mb: 3 }}>
						<Typography variant='h4' sx={{ mb: 3 }}>
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
									<Stack spacing={3}>
										{/* Details Rows */}
										<Box sx={summaryRowStyle}>
											<Typography>{paymentSummary.title}</Typography>
											<Typography variant='h4' color='text.primary'>
												${paymentSummary.amount.toLocaleString()}
											</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Due Date</Typography>
											<Typography>{paymentSummary.dueDate}</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Property</Typography>
											<Typography>{paymentSummary.property}</Typography>
										</Box>
										<Box sx={summaryRowStyle}>
											<Typography>Payee</Typography>
											<Typography>{paymentSummary.payee}</Typography>
										</Box>
									</Stack>
								</Box>
							</Box>
						)}
					</Box>
					<Divider sx={{ my: 2 }} />
					{/* Payment Method Section */}
					<Box sx={{ mb: 3 }}>
						<Typography variant='h4' sx={{ mb: 3 }}>
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
						sx={alertBoxStyle(theme)}
					>
						<Typography
							fontWeight={600}
							sx={{ mb: 0.5 }}
							color={getAlertTitleColor(theme)}
						>
							Secure Payment
						</Typography>
						<Typography color={getAlertTextColor(theme)}>
							Your payment information is encrypted and secure. We use
							industry-standard security measures to protect your data.
						</Typography>
					</Alert>
					{/* Proceed Button */}
					<Button
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						sx={{ borderRadius: 2, fontWeight: 600, fontSize: 18, py: 1.5 }}
						disabled={loading}
					>
						Proceed
					</Button>
				</Card>
			</Box>
		</Box>
	);
};

export default ConfirmPayment;
