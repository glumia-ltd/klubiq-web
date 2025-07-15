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
					<CreditCardIcon fontSize='medium' color='primary' />
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
					<AccountBalanceIcon fontSize='medium' color='primary' />
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
					<AccountBalanceWalletIcon fontSize='medium' color='primary' />
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
				<Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 2 }}>
					<IconButton size='small' sx={{ p: 0 }}>
						<ArrowBackIcon fontSize='small' />
					</IconButton>
					<Typography
						variant='body1'
						color={theme?.palette?.textColors?.azureKlubiqTextLight}
					>
						Back
					</Typography>
				</Stack>
				{/* Confirm Payment Title */}
				<Typography
					variant='h2'
					sx={{ mb: 3 }}
					color={theme?.palette?.textColors?.azureKlubiqText}
				>
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
						<Typography variant='h4' sx={{ mb: 4 }}>
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
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												{paymentSummary.title}
											</Typography>
											<Typography variant='h4' color='text.primary'>
												${paymentSummary.amount.toLocaleString()}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												Due Date
											</Typography>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												{paymentSummary.dueDate}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												Property
											</Typography>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												{paymentSummary.property}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												Payee
											</Typography>
											<Typography
												color={
													theme?.palette?.textColors?.azureKlubiqPickedBluewood
												}
											>
												{paymentSummary.payee}
											</Typography>
										</Box>
									</Stack>
								</Box>
							</Box>
						)}
					</Box>
					<Divider sx={{ my: 2 }} />
					{/* Payment Method Section */}
					<Box sx={{ mb: 3 }}>
						<Typography variant='h6' fontWeight={600} sx={{ mb: 2 }}>
							Choose Payment Method
						</Typography>
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
						icon={<LockOutlinedIcon color='primary' />}
						severity='info'
						sx={{
							bgcolor:
								theme.palette.mode === 'dark'
									? 'rgba(30, 60, 120, 0.12)'
									: 'rgba(30, 60, 120, 0.06)',
							borderRadius: 2,
							mb: 3,
							fontSize: 15,
							alignItems: 'flex-start',
						}}
					>
						<Typography fontWeight={600} sx={{ mb: 0.5 }}>
							Secure Payment
						</Typography>
						<Typography variant='body2' color='primary.main'>
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
