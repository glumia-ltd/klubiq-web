// import LeaseFormLayout from '../../../Layouts/LeaseFormLayout';
// import { Grid, Typography, Skeleton, Button } from '@mui/material';
// import { styles } from './style';
// import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import ControlledSelect from '../../../components/ControlledComponents/ControlledSelect';
// import Logo from '../../../assets/images/Icon.svg';
// import { useState, useEffect } from 'react';
// import { consoleDebug } from '../../../helpers/debug-logger';

// const EditLeaseForm = () => {
// 	const [loading, setLoading] = useState<boolean>(true);

// 	const validationSchema = yup.object({
// 		nickName: yup.string().required('field is required'),
// 		// description: yup.string().required('This field is required'),
// 		unit: yup.string().required('Select an option'),
// 		propertyName: yup.string().required('Select an option'),
// 		tenant: yup.string().required('Select an option'),
// 		rentAmount: yup.string().required('field is required'),
// 		depositAmount: yup.string().required('field is required'),
// 		frequency: yup.string().required('field is required'),
// 		startDate: yup.string().required('field is required'),
// 		endDate: yup.string().required('field is required'),
// 	});

// 	type formValues = {
// 		endDate: string;
// 		startDate: string;
// 		frequency: string;
// 		rentAmount: string;
// 		depositAmount: string;
// 		nickname: string;
// 		propertyName: string;
// 		unit: string;
// 		tenant: string;
// 	};

// 	const property = [
// 		{
// 			value: 'A',
// 			label: 'A',
// 		},
// 		{
// 			value: 'B',
// 			label: 'B',
// 		},
// 	];

// 	const onSubmit = async (values: formValues) => {
// 		consoleDebug(values, 'val');
// 	};

// 	const formik = useFormik({
// 		initialValues: {
// 			endDate: '',
// 			startDate: '',
// 			frequency: '',
// 			rentAmount: '',
// 			depositAmount: '',
// 			nickname: '',
// 			propertyName: '',
// 			unit: '',
// 			tenant: '',
// 		},
// 		validationSchema,
// 		onSubmit,
// 	});
// 	useEffect(() => {
// 		setTimeout(() => setLoading(false), 20000);
// 	}, []);
// 	return (
// 		<LeaseFormLayout
// 			Header='LandMark Estate > Single unit'
// 			sx={styles.leaseCard}
// 		>
// 			{loading ? (
// 				<Grid container spacing={1} sx={styles.content}>
// 					<Grid item xs={12}>
// 						<Skeleton variant='text' height={25} width='50%' />
// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={12} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={25} width='50%' />

// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={12} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={12} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={12} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={12} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>
// 					<Grid item xs={6} sx={styles.skeleton}>
// 						<Skeleton variant='text' height={20} width='40%' />
// 						<Skeleton variant='rectangular' height={30} width='100%' />
// 					</Grid>{' '}
// 					<Grid item xs={6}></Grid>
// 					<Grid item xs={6} sm={6} md={3} lg={3}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} />
// 					</Grid>
// 					<Grid item xs={6} sm={6} md={3} lg={3}>
// 						<Skeleton variant='text' height={20} width='50%' />

// 						<Skeleton variant='rectangular' height={30} />
// 					</Grid>
// 					<Grid item xs={12}>
// 						<Skeleton variant='text' sx={styles.skeleton} width='90%' />
// 					</Grid>
// 				</Grid>
// 			) : (
// 				<Grid container spacing={1} sx={styles.content}>
// 					<Grid item xs={12}>
// 						<ControlledTextField
// 							name='nickname'
// 							label='Lease Nickname'
// 							formik={formik}
// 							type='text'
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledSelect
// 							name='propertyName'
// 							label='Property Name'
// 							type='text'
// 							formik={formik}
// 							options={property}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledSelect
// 							name='unit'
// 							label='Unit '
// 							type='text'
// 							formik={formik}
// 							options={property}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledSelect
// 							name='tenant'
// 							label='Tenant'
// 							type='text'
// 							formik={formik}
// 							options={property}
// 						/>
// 					</Grid>
// 					<Grid xs={12}>
// 						<ControlledTextField
// 							name='rentAmount'
// 							label='Rent Amount '
// 							formik={formik}
// 							type='text'
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledTextField
// 							name='depositAmount'
// 							label='Deposit Amount'
// 							type='text'
// 							formik={formik}
// 						/>
// 					</Grid>
// 					<Grid item xs={6}>
// 						<ControlledTextField
// 							name='frequency'
// 							label='Payment Frequency *'
// 							formik={formik}
// 							type='text'
// 						/>
// 					</Grid>
// 					<Grid item xs={6}></Grid>

// 					<Grid item xs={6} sm={6} md={3} lg={3}>
// 						<ControlledTextField
// 							name='startDate'
// 							label='Lease Start Date '
// 							formik={formik}
// 							type='date'
// 						/>
// 					</Grid>
// 					<Grid item xs={6} sm={6} md={3} lg={3}>
// 						<ControlledTextField
// 							name='endDate'
// 							label='Lease End Date '
// 							formik={formik}
// 							type='date'
// 						/>
// 					</Grid>
// 					<Grid item xs={12} sx={styles.infobox}>
// 						<img src={Logo} alt='logo' style={styles.infoimg} />

// 						<Typography variant='subtitle2' sx={styles.infotypo}>
// 							The first rent payment will be due on 24 April 2024 and then every
// 							year on the same date
// 						</Typography>
// 					</Grid>
// 					<Grid item xs={12} sx={styles.buttonGrid}>
// 						<Button variant='klubiqTextButton'>Cancel </Button>
// 						<Button type='submit' variant='klubiqMainButton'>
// 							Save{' '}
// 						</Button>
// 					</Grid>
// 				</Grid>
// 			)}
// 		</LeaseFormLayout>
// 	);
// };

// export default EditLeaseForm;
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	KlubiqFormV1,
	InputAdornment as InputAdornmentType,
} from '@klubiq/ui-components';
import { Box, Typography } from '@mui/material';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { Info } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormLayout from '../../../Layouts/FormLayout';
import FormSkeleton from '../../../components/skeletons/FormSkeleton';
import { getCurrencySymbol } from '../../../helpers/utils';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import LeaseActionsPrompts from '../../../components/Dialogs/LeaseActionPrompt';
import { Breadcrumb } from '../../../components/Breadcrumb/index';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
const usePseudoLeaseData = (id: string) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		setTimeout(() => {
			setData({
				name: 'Lease A',
				rentAmount: 500000,
				depositAmount: 100000,
				startDate: '2024-01-01',
				endDate: '2024-12-31',
				rentDueDay: 5,
				frequency: 'Monthly',
				propertyId: 'A',
				unitId: 'A1',
				tenantId: 'T1',
			});
			setLoading(false);
		}, 1000);
	}, [id]);

	return { data, loading };
};

const EditLeaseForm: FC = () => {
	const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openArchiveLeaseDialog, setOpenArchiveLeaseDialog] =
		useState<boolean>(false);
	const [openDeleteLeaseDialog, setOpenDeleteLeaseDialog] =
		useState<boolean>(false);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const currentLeaseId = location.pathname.split('/')[2]!;

	const { id } = useParams();

	const { data: lease, loading } = usePseudoLeaseData(id!);
	const { user } = useSelector(getAuthState);

	const properties = [
		{
			label: 'Property A',
			value: 'A',
			units: [{ label: 'Unit A1', value: 'A1' }],
		},
		{
			label: 'Property B',
			value: 'B',
			units: [{ label: 'Unit B1', value: 'B1' }],
		},
	];

	const tenants = [
		{ label: 'Tenant A', value: 'T1', email: 'a@example.com' },
		{ label: 'Tenant B', value: 'T2', email: 'b@example.com' },
	];

	const getUnitsForProperty = (values: any) => {
		return properties.find((p) => p.value === values.propertyId)?.units || [];
	};

	// const calculateDueDate = (start: string, frequency: string, day = 1) => {
	// 	const date = dayjs(start);
	// 	if (!date.isValid()) return '';
	// 	return `${date.add(1, 'month').set('date', day).format('dddd, MMMM D, YYYY')}`;
	// };
	useEffect(() => {
		const newBreadcrumbs: Record<string, BreadcrumbItem> = {
			feature: {
				label: 'Leases',
				icon: (
					<ViewListOutlinedIcon
						key={1}
						aria-label='Leases'
						onClick={() => navigate(`/leases`)}
					/>
				),
				showIcon: true,
				isSectionRoot: true,
				path: '/leases',
			},
		};
		// Add the current lease as the second breadcrumb
		if (currentLeaseId) {
			newBreadcrumbs['feature-details'] = {
				label: `Edit Lease`, // Prefer a human-readable name if available
				path: `/leases/${currentLeaseId}`,
				icon: null,
				showIcon: false,
			};
		}
		newBreadcrumbs['feature-details-sub'] = {};
		updateBreadcrumb(newBreadcrumbs);
	}, [currentLeaseId, location.pathname]);

	const initialValues = lease
		? {
				name: lease.name,
				propertyId: lease.propertyId,
				unitId: lease.unitId,
				tenantId: lease.tenantId,
				rentAmount: lease.rentAmount,
				depositAmount: lease.depositAmount,
				startDate: lease.startDate,
				endDate: lease.endDate,
				frequency: lease.frequency,
				rentDueDay: lease.rentDueDay,
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
			decimals: 2,
			required: true,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings),
			} as InputAdornmentType,
		},
		{
			name: 'depositAmount',
			label: 'Deposit Amount',
			type: 'decimal',
			decimals: 2,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings),
			} as InputAdornmentType,
		},
		{
			name: 'frequency',
			label: 'Payment Frequency',
			type: 'select',
			required: true,
			options: ['Monthly', 'Bi-Monthly', 'Annually', 'Weekly', 'Bi-Weekly'].map(
				(f) => ({ label: f, value: f }),
			),
		},
		{
			name: 'leaseDueDay',
			label: 'Lease Due Day',
			type: 'select',
			options: Array.from({ length: 31 }, (_, i) => ({
				label: `${i + 1}`,
				value: i + 1,
			})),
		},
		{
			name: 'leaseStartDate',
			label: 'Lease Start Date',
			type: 'date',
			required: true,
		},
		{
			name: 'endDate',
			label: 'Lease End Date',
			type: 'date',
		},
		{
			name: 'firstPaymentDueText',
			type: 'custom',
			label: '', // ✅ Required by type
			showIf: (values) => !!values.startDate && !!values.frequency,
			component: (_, __) => (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Info sx={{ fontSize: 16, color: theme.palette.primary.main }} />
					<Typography variant='body2'>First payment due on </Typography>
				</Box>
			),
		},
	];

	const onSubmit = async (values: any) => {
		try {
			console.log('Submitting edit form', values);
			navigate('/leases');
		} catch (error) {
			dispatch(
				openSnackbar({
					message: 'Something went wrong',
					severity: 'error',
					isOpen: true,
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
		enableReset: true,
		resetButtonText: 'Cancel',
		showBackdrop: true,
		backdropText: 'Saving lease...',
	};
	const handleArchiveDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenArchiveLeaseDialog(false);
		} else {
			console.log('here');
			// handleArchiveLeaseRequest();
		}
	};

	const handleDeleteDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenDeleteLeaseDialog(false);
		} else {
			// handleDeleteLeaseRequest();
		}
	};
	return (
		<>
			<Box mb={5}>
				<Breadcrumb />
			</Box>
			<FormLayout Header='Edit Lease'>
				{loading ? (
					<FormSkeleton rows={fields.length} columns={[1]} />
				) : (
					<Box sx={{ width: '100%', p: 2 }}>
						<KlubiqFormV1 {...formConfig} />
					</Box>
				)}
				<LeaseActionsPrompts
					open={openArchiveLeaseDialog}
					progress={loading}
					title={loading ? 'Archive in progress' : 'Attention!'}
					content='Are you sure you want to archive this Lease?'
					rightButtonContent='Archive Lese'
					handleDialogButtonAction={(e) =>
						handleArchiveDialogButtonAction(e.target.value)
					}
				/>

				<LeaseActionsPrompts
					open={openDeleteLeaseDialog}
					progress={loading}
					title={loading ? 'Deleting this Lease' : 'Delete Lease'}
					content='Are you sure you want to delete this Lease?  all leases, and related transactions will be deleted!'
					rightButtonContent='Delete Lease'
					handleDialogButtonAction={(e) =>
						handleDeleteDialogButtonAction(e.target.value)
					}
				/>
			</FormLayout>
		</>
	);
};

export default EditLeaseForm;
