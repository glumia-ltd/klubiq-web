import { Box } from '@mui/material';
import {
	useGetUpcomingPaymentsQuery,
	useInitializePaymentMutation,
} from '@/store/PaymentsStore/paymentsApiSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthState } from '@/store/AuthStore/auth.slice';

const MonnifyPaymentPage = () => {
	const {
		user: { uuid },
	} = useSelector(getAuthState);

	const { data: payments } = useGetUpcomingPaymentsQuery(uuid);

	const [checkoutURL, setCheckoutURL] = useState<string | null>(null);

	const [paymentsData] = payments || [];

	const [initializePayment] = useInitializePaymentMutation();

	const loadPayment = async () => {
		try {
			if (!paymentsData?.invoiceId || !paymentsData?.amount) return;

			const { result } = await initializePayment({
				invoiceId: paymentsData?.invoiceId || '',
				amount: paymentsData?.amount || 0,
			}).unwrap();

			const url = result?.responseBody?.checkoutUrl;

			if (url) {
				setCheckoutURL(url);
			}
		} catch (error) {
			console.error('Failed to load payment:', error);
		} finally {
			// setIsLoading(false);
		}
	};

	useEffect(() => {
		loadPayment();
	}, [paymentsData]);

	return (
		<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ flex: 1, position: 'relative' }}>
				<iframe
					src={checkoutURL || ''}
					title='Payment Gateway'
					style={{
						width: '100%',
						height: '100%',
						border: 'none',
						display: 'block',
					}}
					sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
					allow='payment'
				/>
			</Box>
		</Box>
	);
};

export default MonnifyPaymentPage;
