import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { Info } from '@mui/icons-material';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { screenMessages } from '../../../helpers/screen-messages';
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	KlubiqFormV1,
	InputAdornment as InputAdornmentType,
} from '@klubiq/ui-components';

import FormSkeleton from '../../../components/skeletons/FormSkeleton';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import {
	useGetSingleLeaseByIdQuery,
	useEditLeaseMutation,
} from '../../../store/LeaseStore/leaseApiSlice';
import { getCurrencySymbol } from '../../../helpers/utils';
export type EditLeaseFormProps = {
	leaseId: string;
	onClose: () => void;
};

const EditLeaseForm = ({ leaseId, onClose }: EditLeaseFormProps) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(getAuthState);
	const [editLease] = useEditLeaseMutation();
	const { data: lease, isLoading: isLeaseLoading } = useGetSingleLeaseByIdQuery(
		{ id: leaseId || '' },
	);

	const getUnits = (unitNumber?: string) =>
		unitNumber ? [{ label: unitNumber, value: unitNumber }] : [];

	const properties = lease
		? [
				{
					label: lease.propertyName,
					value: lease.propertyName,
					units: getUnits(lease.unitNumber),
				},
			]
		: [];

	const tenants =
		lease?.tenants
			?.filter((tenant) => !!tenant.profile.profileUuid)
			.map((tenant) => ({
				label: `${tenant.profile.firstName} ${tenant.profile.lastName}`,
				value: tenant.profile.profileUuid!,
				email: tenant.profile.email,
			})) ?? [];

	const getUnitsForProperty = (values: any) =>
		properties.find((p) => p.value === values.propertyId)?.units || [];

	const initialValues = lease
		? {
				name: lease.name ?? '',
				propertyId: lease.propertyName, // assuming you're using propertyName as value
				unitId: lease.unitNumber, // should match the unit select option value
				tenantId: lease.tenants?.[0]?.profile?.profileUuid ?? '',
				rentAmount: Number(lease.rentAmount), // ensure numeric
				propertyName: lease.propertyName,
				startDate: lease.startDate,
				endDate: lease.endDate,
				rentDueDay: lease.rentDueDay ?? '',
				securityDeposit: '',
				firstPaymentDate: lease.startDate,
				lateFeeAmount: '',
				customPaymentFrequency: lease.paymentFrequency,
			}
		: {};

	const fields: FormFieldV1[] = [
		{
			name: 'name',
			label: 'Lease Name',
			type: 'text',
			required: true,
			placeholder: 'Enter lease name',
			validation: {
				schema: z.string().min(1, { message: 'Required' }),
			},
		},
		{
			name: 'propertyId',
			label: 'Property Name',
			type: 'select',
			required: true,
			options: properties,
		},
		{
			name: 'unitId',
			label: 'Unit',
			type: 'select',
			options: getUnitsForProperty,
		},
		{
			name: 'tenantId',
			label: 'Tenant',
			type: 'select',
			required: true,
			options: tenants,
		},
		{
			name: 'rentAmount',
			label: 'Rent Amount',
			type: 'decimal',
			formatType: 'decimal',
			decimals: 2,
			placeholder: '0.00',
			required: true,
			adornment: {
				prefix: getCurrencySymbol(user.orgSettings?.settings),
			} as InputAdornmentType,
		},
		{
			name: 'securityDeposit',
			label: 'Deposit Amount',
			type: 'decimal',
			formatType: 'decimal',
			decimals: 2,
			placeholder: '0.00',
			adornment: {
				prefix: getCurrencySymbol(user.orgSettings?.settings),
			} as InputAdornmentType,
		},
		{
			name: 'customPaymentFrequency',
			label: 'Payment Frequency',
			type: 'select',
			required: true,
			options: ['Monthly', 'Bi-Monthly', 'Annually', 'Weekly', 'Bi-Weekly'].map(
				(f) => ({ label: f, value: f }),
			),
		},
		{
			name: 'rentDueDay',
			label: 'Lease Due Day',
			type: 'select',
			options: Array.from({ length: 31 }, (_, i) => ({
				label: `${i + 1}`,
				value: i + 1,
			})),
			showIf: (values) =>
				values.customPaymentFrequency === 'Monthly' ||
				values.customPaymentFrequency === 'Bi-Monthly',
		},

		{
			name: 'startDate',
			label: 'Lease Start Date',
			type: 'date',
		},
		{
			name: 'endDate',
			label: 'Lease End Date',
			type: 'date',
		},
		{
			name: 'firstPaymentDueText',
			type: 'custom',
			label: '',
			showIf: (values) => !!values.startDate && !!values.frequency,
			component: () => (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Info sx={{ fontSize: 16, color: theme.palette.primary.main }} />
					<Typography variant='body2'>First payment due on </Typography>
				</Box>
			),
		},
	];
	const onSubmit = async (values: any) => {
		if (!lease?.id) return;
		try {
			const payload = {
				leaseId: String(lease.id),
				body: {
					name: values.name,
					unitId: values.id,
					rentAmount: values.rentAmount,
					startDate: values.startDate,
					endDate: values.endDate,
					rentDueDay: values.rentDueDay,
					propertyName: lease.propertyName,
					securityDeposit: values.depositAmount,
					firstPaymentDate: values.startDate,
					lateFeeAmount: '',
					customPaymentFrequency: values.paymentFrequency,
				},
			};

			await editLease(payload).unwrap();

			dispatch(
				openSnackbar({
					message: screenMessages.lease.edit.success,
					severity: 'info',
					isOpen: true,
					duration: 2000,
				}),
			);
			navigate('/leases');
		} catch (error) {
			dispatch(
				openSnackbar({
					message: `There was an error editing the lease. 
					\n${screenMessages.lease.edit.error}`,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
		}
	};

	const formConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Save Lease',
		fields,
		initialValues,
		onSubmit,
		onReset: onClose,
		enableReset: true,
		resetButtonText: 'Cancel',
		showBackdrop: true,
		backdropText: 'Saving lease...',
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};

	return (
		<>
			{isLeaseLoading ? (
				<FormSkeleton rows={fields.length} columns={[1]} />
			) : (
				<Box sx={{ height: '100%', width: '100%' }}>
					<KlubiqFormV1 {...formConfig} />
				</Box>
			)}
		</>
	);
};

export default EditLeaseForm;
