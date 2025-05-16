import { KlubiqForm } from '@klubiq/ui-components';
import {
	useGetOrgPropertiesViewListQuery,
	useAddLeaseMutation,
} from '../../store/LeaseStore/leaseApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { find } from 'lodash';
import dayjs from 'dayjs';
import { getCurrencySymbol } from '../../helpers/utils';
import { FormField } from '@klubiq/ui-components';
import { FC, useEffect, useMemo, useState } from 'react';

import FormLayout from '../../Layouts/FormLayout';
import FormSkeleton from '../skeletons/FormSkeleton';

import { consoleLog } from '../../helpers/debug-logger';

// Inside the component, before formFields:

enum PaymentFrequency {
	ANNUALLY = 'Annually',
	BI_MONTHLY = 'Bi-Monthly',
	BI_WEEKLY = 'Bi-Weekly',
	MONTHLY = 'Monthly',
	ONE_TIME = 'One-Time',
	QUARTERLY = 'Quarterly',
	WEEKLY = 'Weekly',
}

interface AddLeaseFormProps {
	propertyId: string;
	unitId: string;
}
interface Property {
	uuid: string;
	name: string;
	units?: Array<{ id: string; unitNumber: string }>;
}

interface LeaseFormValues {
	name: string;
	startDate: string;
	endDate?: string;
	newTenants: null;
	tenantsIds: string[];
	unitId: string;
	rentDueDay?: string;
	rentAmount: string;
	depositAmount: string;
	isDraft: boolean;
	paymentFrequency: PaymentFrequency;
	status: null;
	propertyName?: string;
	firstPaymentDate?: string;
	unitNumber?: string;
}

const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId, unitId }) => {
	const { user } = useSelector(getAuthState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addLease] = useAddLeaseMutation();
	const { data: orgPropertiesViewList, isLoading: loading } =
		useGetOrgPropertiesViewListQuery({
			orgId: user?.organizationUuid,
		});

	consoleLog('properties', orgPropertiesViewList);

	const [formInitialValues, setFormInitialValues] = useState({
		name: '',
		propertyName: '',
		unitId: '',
		tenantsIds: [],
		rentAmount: '',
		depositAmount: '',
		startDate: '',
		endDate: '',
		frequency: PaymentFrequency.ANNUALLY,
		rentDueDay: '0',
	});

	useEffect(() => {
		if (orgPropertiesViewList?.properties) {
			setFormInitialValues((prev) => ({
				...prev,
				propertyName:
					propertyId || orgPropertiesViewList.properties[0]?.uuid || '',
				unitId:
					unitId || orgPropertiesViewList.properties[0]?.units?.[0]?.id || '',
			}));
		}
	}, [orgPropertiesViewList, propertyId, unitId]);
	const propertyData = useMemo(
		() => find(orgPropertiesViewList?.properties, { uuid: propertyId }),
		[orgPropertiesViewList, propertyId],
	);

	const formFields: FormField[] = [
		{
			name: 'name',
			label: 'Lease Name',
			type: 'text',
			required: true,
		},
		{
			name: 'propertyName',
			label: 'Property Name',
			type: 'select',
			required: true,
			options: orgPropertiesViewList?.properties
				? orgPropertiesViewList.properties.map((property: Property) => ({
						label: property.name,
						value: property.uuid,
					}))
				: [],
		},
		// Remove the UnitIdField component and update the unitId field in formFields
		{
			name: 'unitId',
			label: 'Unit',
			type: 'select',
			required: true,
			options: (values: Record<string, any>) => {
				if (!values.propertyName || !orgPropertiesViewList?.properties) {
					return [];
				}
				consoleLog('values', values);
				const selectedProperty = find(orgPropertiesViewList.properties, {
					uuid: values.propertyName,
				});
				return selectedProperty?.units
					? selectedProperty.units.map(
							(unit: { id: string; unitNumber: string }) => ({
								label: unit.unitNumber,
								value: unit.id,
							}),
						)
					: [];
			},
			showIf: (values) => !!values.propertyName,
			disabled: !propertyData?.units || propertyData.units.length <= 1,
		},
		{
			name: 'tenantsIds',
			label: 'Tenant',
			type: 'select',
			multiple: true,
			options: [], // Initialize with empty array
			actionButton: {
				label: 'Add tenant',
				position: 'end',
				onClick: () => {
					navigate(`/tenants/add-tenant?property=${propertyData?.uuid}`, {
						state: { currentProperty: propertyData },
					});
				},
			},
		},
		{
			name: 'rentAmount',
			label: 'Rent Amount',
			type: 'decimal',
			required: true,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings) as string,
			},
		},
		{
			name: 'depositAmount',
			label: 'Deposit Amount',
			type: 'decimal',
			required: true,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings) as string,
			},
		},
		{
			name: 'startDate',
			label: 'Lease Start Date',
			type: 'date',
			required: true,
			width: '50%',
			layout: 'row',
		},
		{
			name: 'endDate',
			label: 'Lease End Date',
			type: 'date',
			width: '50%',
			layout: 'row',
		},
		{
			name: 'frequency',
			label: 'Payment Frequency',
			type: 'select',
			required: true,
			options: Object.values(PaymentFrequency).map((freq) => ({
				label: freq,
				value: freq,
			})),
			width: '50%',
			layout: 'row',
		},
		{
			name: 'rentDueDay',
			label: 'Payment Day',
			type: 'select',
			options: Array.from({ length: 31 }, (_, i) => ({
				label: i === 0 ? 'select due day' : `${i}`,
				value: `${i}`,
			})),
			width: '50%',
			layout: 'row',
			showIf: (values) =>
				values.frequency === 'Monthly' || values.frequency === 'Bi-Monthly',
		},
	];

	const calculateDueDate = (values: any) => {
		if (!values.frequency || !values.startDate || !values.endDate) {
			return '';
		}

		const startDayAndMonth = dayjs(values.startDate).format('MMMM DD');
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		const dueDates = {
			[PaymentFrequency.WEEKLY]: `${days[dayjs(values.startDate).add(1, 'week').get('day')]}, ${dayjs(values.startDate).add(1, 'week').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.BI_WEEKLY]: `${days[dayjs(values.startDate).add(2, 'week').get('day')]}, ${dayjs(values.startDate).add(2, 'week').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.MONTHLY]: `${days[dayjs(values.startDate).add(1, 'month').get('day')]}, ${dayjs(values.startDate).add(1, 'month').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.ANNUALLY]: startDayAndMonth,
			[PaymentFrequency.ONE_TIME]: `Once on ${startDayAndMonth}`,
			[PaymentFrequency.BI_MONTHLY]: `${days[dayjs(values.startDate).add(2, 'month').get('day')]}, ${dayjs(values.startDate).add(2, 'month').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.QUARTERLY]: `${days[dayjs(values.startDate).add(3, 'month').get('day')]}, ${dayjs(values.startDate).add(3, 'month').format('MMMM DD, YYYY')}`,
		};

		return dueDates[values.frequency as PaymentFrequency] || '';
	};

	const handleSubmit = async (values: LeaseFormValues) => {
		try {
			const requestBody = {
				name: values.name,
				startDate: values.startDate,
				endDate: values.endDate,
				newTenants: null,
				tenantsIds: values.tenantsIds,
				unitId: values.unitId,
				rentDueDay: values.rentDueDay ? Number(values.rentDueDay) : undefined,
				rentAmount: Number(values.rentAmount),
				securityDeposit: Number(values.depositAmount),
				isDraft: false,
				paymentFrequency: values.paymentFrequency,
				status: null,
				propertyName: propertyData?.name,
				firstPaymentDate: calculateDueDate(values),
				unitNumber: find(propertyData?.units, { id: values.unitId })
					?.unitNumber,
			};

			await addLease(requestBody).unwrap();

			dispatch(
				openSnackbar({
					message: 'Lease successfully added',
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);

			navigate(-1);
		} catch (error) {
			dispatch(
				openSnackbar({
					message: 'Error saving lease. Please try again',
					severity: 'error',
					isOpen: true,
					duration: 2000,
				}),
			);
		}
	};

	return (
		<FormLayout Header={'Add Lease'}>
			{loading ? (
				<FormSkeleton rows={formFields.length} columns={[1, 1, 1]} />
			) : (
				<KlubiqForm
					fields={formFields}
					onSubmit={handleSubmit}
					initialValues={formInitialValues}
					submitButtonText='Add Lease'
					enableReset={true}
					resetButtonText='Cancel'
				/>
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
