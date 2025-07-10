import React from 'react';
import { RadioCardGroup } from '../TanstackForm/RadioCardGroup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Typography, useTheme } from '@mui/material';

const paymentMethodOptions = [
	{
		value: 'card',
		label: (
			<Box display='flex' alignItems='center' gap={2}>
				<CreditCardIcon fontSize='large' />
				<Box>
					<Typography variant='subtitle1' fontWeight={700}>
						Credit/Debit Card
					</Typography>
					<Typography variant='body2'>Pay instantly with your card</Typography>
				</Box>
			</Box>
		),
	},
	{
		value: 'bank',
		label: (
			<Box display='flex' alignItems='center' gap={2}>
				<AccountBalanceIcon fontSize='large' />
				<Box>
					<Typography variant='subtitle1' fontWeight={700}>
						Bank Transfer (ACH)
					</Typography>
					<Typography variant='body2'>
						Direct transfer from your bank account
					</Typography>
				</Box>
			</Box>
		),
	},
	{
		value: 'wallet',
		label: (
			<Box display='flex' alignItems='center' gap={2}>
				<AccountBalanceWalletIcon fontSize='large' />
				<Box>
					<Typography variant='subtitle1' fontWeight={700}>
						Klubiq Wallet
					</Typography>
					<Typography variant='body2'>
						Use your Klubiq wallet balance
					</Typography>
				</Box>
			</Box>
		),
	},
];

const PaymentMethodSelector = ({ onChange, value, loading }: any) => {
	return (
		<Box>
			<Typography variant='h6' fontWeight={700} mb={2}>
				Choose Payment Method
			</Typography>
			<RadioCardGroup
				value={value}
				options={paymentMethodOptions}
				onChange={onChange}
				isLoading={loading}
				radioPosition='right'
			/>
		</Box>
	);
};

export default PaymentMethodSelector;
