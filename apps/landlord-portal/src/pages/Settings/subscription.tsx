import { Typography, useMediaQuery, useTheme, Card, Box, Chip, Stack, Button } from '@mui/material';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
	DynamicTable
} from '@klubiq/ui-components';
import { DynamicTableColors, DynamicTableStyles } from "@klubiq/ui-components";

export const Subscription = () => {
	const renderActionChip = (action: string) => {
		switch (action) {
			case "Renewal":
				return <Chip label={action} color="success" variant="filled" />;
			case "Payment Reminder":
				return <Chip label={action} color="warning" variant="outlined" />;
			default:
				return <Chip label={action} color="default" variant="outlined" />;
		}
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const tableSx: DynamicTableColors = {
		headerBg: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.background.paper,
		headerColor: theme.palette.text.primary,
		rowBg: 'transparent',
		rowHoverBg: theme.palette.action.hover,
		borderColor: 'transparent',
		cellColor: theme.palette.text.secondary,
		tableBorderColor: theme.palette.divider,
		cardBorderColor: theme.palette.mode === 'dark' ? theme.palette.divider : '',
		headerBorderColor: theme.palette.divider,
		cardBgColor: theme.palette.mode === 'dark' ? '#161616' : '#fff',
	};
	const tableStyles: DynamicTableStyles = {
		borderStyle: 'none',
		borderRadius: 2,
		borderWidth: 2,
		paperElevation: 0,
		buttonVariant: 'klubiqTextButton',
		titleVariant: 'h4',
		titleFontWeight: 600,
		headerVariant: 'body2',
		headerFontWeight: 500,
		cellAlign: 'left',
	};
	interface InitialFormValues {

		paymentMethod: string,
		billingAddress: string;
	}
	const initialValues: InitialFormValues = {
		paymentMethod: "",
		billingAddress: "",
	};
	const onSubmit = async (values: InitialFormValues) => {
		console.log('Form submitted with values:', values);
	}
	const subscriptionFormFields: FormFieldV1[] = [
		{
			name: 'paymentMethod',
			label: 'Payment Method',
			type: 'text',
			width: isMobile ? '100%' : '100%',
			// required: true,
		},
		{
			name: 'billingAddress',
			label: 'Billing Address',
			type: 'text',
			width: isMobile ? '100%' : '100%',

		},

	];

	const subscriptionFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Update Billing Info',
		fields: subscriptionFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		header: <Typography variant='h4'>Billing Information</Typography>,
		showBackdrop: true,
		backdropText: 'Please wait while we update your password...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};
	// Define the table columns
	const tableColumns = [
		{
			key: 'date',
			label: 'Date',
		},
		{
			key: 'action',
			label: 'Action',
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			render: (row: any) => renderActionChip(row.action), // 👈 render chip

		},
		{
			key: 'plan',
			label: 'Plan',
		},
		{
			key: 'amount',
			label: 'Amount',
		},
	];

	// Example rows for the table
	const tableRows = [
		{
			id: 1,
			date: '2025-08-26',
			action: 'Renewal',
			plan: 'Premium',
			amount: '$1,200',
		},
		{
			id: 2,
			date: '2025-08-20',
			action: 'Upgrade',
			plan: 'Standard',
			amount: '$950',
		},
		{
			id: 3,
			date: '2025-08-10',
			action: 'Renewal',
			plan: 'Basic',
			amount: '$600',
		},
	];


	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction='column'
				gap={2}
				alignItems='flex-start'
				justifyContent='space-between'
			>
				<Typography variant='h5'>Subscription</Typography>
				<Typography variant="body1">
					Manage your subscription and billing information
				</Typography>
				<Card sx={{ p: 2, mb: 1, width: '100%' }}>
					<Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems={isMobile ? 'flex-start' : 'center'} spacing={2}>
						<Typography variant='h4'>Current Plan</Typography>
						<Stack direction={isMobile ? 'column' : 'row'} alignItems={isMobile ? 'flex-start' : 'center'} spacing={2}>
							<Button variant='klubiqOutlinedButton' size="small" sx={{ mt: 1 }}>Cancel</Button>

							<Button variant='klubiqMainButton' size="small" sx={{ mt: 1 }}>Upgrade Plan</Button>
						</Stack>
					</Stack>
					<Box>
						<Box sx={{ display: 'flex', alignItems: "center", gap: 1, mt: 2 }}><Typography variant='subtitle1' sx={{}} color="#666666">Plan:</Typography>
							<Typography variant="subtitle1" color="#002147">Proffesional</Typography></Box>
						<Box>
						</Box>
						<Box sx={{ display: 'flex', alignItems: "center", gap: 1, mt: 2 }}><Typography variant='subtitle1' sx={{}} color="#666666">Price:</Typography>
							<Typography variant="subtitle1" >$49/month</Typography></Box>
						<Box>
						</Box><Box sx={{ display: 'flex', alignItems: "center", gap: 1, mt: 2 }}><Typography variant='subtitle1' sx={{}} color="#666666">Billing Cycle:</Typography>
							<Typography variant="subtitle1" >Monthly</Typography></Box>
						<Box>
						</Box><Box sx={{ display: 'flex', alignItems: "center", gap: 1, mt: 2 }}><Typography variant='subtitle1' sx={{}} color="#666666">Next Billing Date:</Typography>
							<Typography variant="subtitle1" >22/7/2025</Typography></Box>
						<Box>
						</Box>
					</Box>
				</Card>
				{/* Dynamic Form goes here @Feyi */}
				<KlubiqFormV1 {...subscriptionFormConfig} />
				<Stack direction='column' spacing={2} width={'100%'}>
					<DynamicTable
						header="Subscription history"
						columns={tableColumns}
						rows={tableRows}
						colors={tableSx}
						styles={tableStyles}

					/>
				</Stack>


			</Stack>
		</Box>
	);
};

export default Subscription;
