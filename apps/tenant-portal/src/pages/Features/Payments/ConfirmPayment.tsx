import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
	useGetPublicKeyQuery,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { getLocaleFormat, formatDate, getFullName } from '@/helpers/utils';
import CardPayment from './CardPayment';

const ConfirmPayment: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const { transactionData, paymentMethod, paymentSummary } = location.state || {};
	const {data: encryption} = useGetPublicKeyQuery();

	// const {
	// 	user: { uuid, firstname, lastname, companyname },
	// } = useSelector(getAuthState);


	const [
		loading,
		setLoading
	] = useState(false); // Simulate loading state


	

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
			{loading ? (
				<Skeleton variant='rectangular' width='100%' height='100%' />
			) : (
				paymentMethod === 'CARD' ? (
					<CardPayment paymentSummary={paymentSummary} publicKey={encryption?.publicKey || ''} />
				) : (
					<></>
				)
			)}
		</Box>
	);
};

export default ConfirmPayment;
