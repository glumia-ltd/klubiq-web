import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import styles from './AddPropertiesStyle';
import { CustomStepper } from '../../components/CustomStepper';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import { RouteObjectType } from '../../shared/type';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../components/Icons/CustomIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAddPropertyState,
	saveAddPropertyFormDetail,
} from '../../store/AddPropertyStore/AddPropertySlice';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import PropertyCategory from '../../components/PropertiesCategory';
import PropertiesDetails from '../../components/PropertiesDetails';
import UnitType from '../../components/PropertiesDetail';

const validationSchema = yup.object({
	name: yup.string().required('Please enter the property name'),
	description: yup.string(),
	typeId: yup.string().required('Select an option'),
	images: yup
		.array()
		.min(1, 'You need to upload at least one image')
		.max(4, 'You can upload a maximum of 4 images')
		.required('Images are required'),
	unitType: yup.string().required('This field is required'),
	purposeId: yup.number().required('This field is required'),
});

const routeObject: RouteObjectType = {
	'Property Category': {
		label: 'property-category',
		icon: <HomeIcon />,
	},
	'Property Details': {
		label: 'property-details',
		icon: <PropertyDetailsIcon />,
	},
	'Unit Type': { label: 'unit-type', icon: <UnitTypeIcon /> },
};

const steps = Object.keys(routeObject);

const STEPPERPATHS: Record<string, number> = {
	'property-category': 0,
	'property-details': 1,
	'unit-type': 2,
};

type PayloadType = {
	purposeId: number | null;
	isMultiUnit: boolean;
};

export const AddPropertiesLayout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const formState = useSelector(getAddPropertyState);

	const { categoryId } = formState;

	const navigate = useNavigate();

	const location = useLocation();

	const dispatch = useDispatch();

	const currentLocation = location.pathname.split('/')[2] || '';

	const purposeIdRef = useRef<{
		purposeId: number | null;
		isMultiUnit: boolean;
	}>({
		purposeId: null,
		isMultiUnit: false,
	});

	const onSubmit = async (values: any) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			description: '',
			name: '',
			typeId: '',
			images: [],
			unitType: '',
			purposeId: null,
			address: {
				addressLine1: '',
				addressLine2: '',
				city: '',
				state: '',
				postalCode: '',
				latitude: 0,
				longitude: 0,
				country: '',
				isManualAddress: true,
				unit: '',
			},

			units: [
				{
					id: null,
					unitNumber: '',
					rentAmount: null,
					floor: null,
					bedrooms: null,
					bathrooms: null,
					toilets: null,
					area: {
						value: null,
						unit: '',
					},
					status: '',
					rooms: null,
					offices: null,
					amenities: [''],
				},
			],
		},
		validationSchema,
		onSubmit,
	});

	const handleBeforeUnload = (event: BeforeUnloadEvent) => {
		// event.preventDefault();
		// event.returnValue = '';
		// dispatch(
		// 	openSnackbar({
		// 		message: 'Are you sure you want to leave this page?',
		// 		severity: 'info',
		// 		isOpen: true,
		// 	}),
		// );
		// window.alert('Are you sure you want to leave this page???');
	};

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		const activeStepByPathName = STEPPERPATHS[currentLocation] || 0;

		setActiveStep(activeStepByPathName);
	}, [currentLocation]);

	const navigateToStep = (step: number) => {
		const routeKey = steps[step];

		if (!routeKey) return;

		const route = `/properties/${routeObject[routeKey]?.label}`;

		navigate(route as string);
	};

	console.log(formik.values);

	const saveFormikDataInStore = (payload?: PayloadType) => {
		dispatch(
			saveAddPropertyFormDetail({
				...formik.values,
				units: [...formik.values.units],
				...payload,
			}),
		);
	};

	const handleForwardButton = () => {
		if (activeStep > steps.length) return;

		if (location.pathname.includes('property-category') && !categoryId) {
			dispatch(
				openSnackbar({
					message: 'Please select a property category before you proceed!',
					severity: 'info',
					isOpen: true,
				}),
			);

			return;
		} else if (
			location.pathname.includes('property-details') &&
			!formik.values.typeId &&
			!formik.values.name
		) {
			dispatch(
				openSnackbar({
					message:
						'Please ensure all the fields are properly filled before you proceed!',
					severity: 'info',
					isOpen: true,
				}),
			);

			return;
		}

		saveFormikDataInStore();

		setActiveStep((prev) => prev + 1);

		navigateToStep(activeStep + 1);
	};

	const handleBackwardButton = () => {
		if (activeStep === 0) return;

		saveFormikDataInStore();

		setActiveStep((prev) => prev - 1);

		navigateToStep(activeStep - 1);
	};

	const handleAllPropertiesClick = () => {
		navigate('/properties');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'purposeId') {
			purposeIdRef.current.purposeId = Number(event.target.value);
		} else if (event.target.name === 'unitType') {
			purposeIdRef.current.isMultiUnit =
				event.target.value === 'multi' ? true : false;
		}
		const payload = {
			purposeId: purposeIdRef.current.purposeId,
			isMultiUnit: purposeIdRef.current.isMultiUnit,
		};

		saveFormikDataInStore(payload);

		formik.handleChange(event);
	};

	const renderBasedOnPath = () => {
		if (location.pathname.includes('property-category')) {
			return <PropertyCategory />;
		} else if (location.pathname.includes('property-details')) {
			return <PropertiesDetails formik={formik} />;
		} else if (location.pathname.includes('unit-type')) {
			return <UnitType formik={formik} handleChange={handleChange} />;
		}
	};

	return (
		<Container sx={styles.containerStyle}>
			<>
				<Grid container>
					<Grid container sx={styles.addPropertiesContainer}>
						<Grid
							item
							sx={styles.addPropertiesContent}
							onClick={handleAllPropertiesClick}
						>
							<ArrowLeftIcon sx={styles.addPropertiesImage} />
							<Typography sx={styles.addPropertiesText} fontWeight={600}>
								All properties
							</Typography>
						</Grid>

						<Button variant='text' sx={styles.button}>
							<Typography>Save draft</Typography>
						</Button>
					</Grid>

					<Grid sx={styles.stepperContainer}>
						<CustomStepper active={activeStep} routes={routeObject} />
					</Grid>
				</Grid>

				{renderBasedOnPath()}

				<Grid sx={styles.buttonContainer}>
					<Button
						variant='text'
						sx={styles.directionButton}
						onClick={handleBackwardButton}
						disabled={activeStep <= 0}
					>
						<ArrowLeftIcon />
						<Typography>Previous</Typography>
					</Button>
					{!(activeStep === steps.length - 1) && (
						<>
							<Button
								variant='contained'
								sx={styles.directionButton}
								onClick={handleForwardButton}
								disabled={activeStep === steps.length - 1}
							>
								<Typography>Next</Typography>
								<RightArrowIcon />
							</Button>
						</>
					)}

					{activeStep === steps.length - 1 && (
						<Button
							variant='contained'
							sx={styles.directionButton}
							// onClick={handleForwardButton}
							// disabled={activeStep === steps.length - 1}
						>
							<Typography>Save</Typography>
						</Button>
					)}
				</Grid>
			</>
		</Container>
	);
};
