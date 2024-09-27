import { Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
import UnitType from '../../components/UnitType';
import { AddPropertyType } from '../../shared/type';
import { useAddPropertyMutation } from '../../store/PropertyPageStore/propertyApiSlice';
import { omitBy } from 'lodash';

const validationSchema = yup.object({
	name: yup.string().required('Please enter the property name'),
	description: yup.string(),
	typeId: yup.string().required('Select an option'),
	categoryId: yup.string().required('Select an option'),
	images: yup.array(),
	// .min(1, 'You need to upload at least one image')
	// .max(4, 'You can upload a maximum of 4 images')
	// .required('Images are required'),
	unitType: yup.string().required('This field is required'),
	purposeId: yup.number().required('This field is required'),

	address: yup.object({
		addressLine1: yup.string().required('Address Line 1 is required'),
		addressLine2: yup.string(),
		city: yup.string().required('City is required'),
		state: yup.string().required('State is required'),
		postalCode: yup.string().required('Postal code is required'),
		country: yup.string().required('Country is required'),
		isManualAddress: yup.boolean(),
	}),

	units: yup.array().of(
		yup.object({
			id: yup.number().nullable(),
			unitNumber: yup.string().required('Unit number is required'),
			rentAmount: yup.number().nullable(),
			floor: yup.number().nullable(),
			bedrooms: yup.number().nullable(),
			bathrooms: yup.number().nullable(),
			toilets: yup.number().nullable(),
			area: yup.object({
				value: yup.number().nullable(),
				unit: yup.string().required('Area unit is required'),
			}),
			status: yup.string(),
			rooms: yup.number().nullable(),
			offices: yup.number().nullable(),
			// amenities: yup.array().of(yup.string()),
		}),
	),
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

interface IunitType extends AddPropertyType {
	unitType?: string;
	isMultiUnit?: boolean;
	categoryName?: string | null;
}

export const AddPropertiesLayout = () => {
	const [activeStep, setActiveStep] = useState(0);

	const navigate = useNavigate();

	const location = useLocation();

	const dispatch = useDispatch();

	const formState = useSelector(getAddPropertyState);

	const [
		addProperty,
		// { isLoading, isSuccess, isError, error }
	] = useAddPropertyMutation();

	const currentLocation = location.pathname.split('/')[2] || '';

	const onSubmit = async (values: any) => {
		console.log(values, 'val');
	};

	const formik = useFormik<IunitType>({
		initialValues: {
			newAmenity: '',
			customAmenities: [],
			categoryId: null,
			categoryName: null,
			description: '',
			name: '',
			typeId: '',
			images: [],
			unitType: '',
			isMultiUnit: false,
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
						unit: 'SqM',
					},
					status: '',
					rooms: null,
					offices: null,
					amenities: null,
				},
			],
		},
		validationSchema,
		onSubmit,
	});

	const handleBeforeUnload = (event: BeforeUnloadEvent) => {
		event.preventDefault();
		event.returnValue = '';
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

	const saveFormikDataInStore = (payload?: PayloadType) => {
		const isMultiUnit = formik.values.unitType === 'multi';
		const allFormikValues = { ...formik.values };

		dispatch(
			saveAddPropertyFormDetail({
				...allFormikValues,
				isMultiUnit,
				...payload,
			}),
		);
	};

	const handleForwardButton = () => {
		if (activeStep > steps.length) return;

		if (
			location.pathname.includes('property-category') &&
			!formik.values.categoryId
		) {
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

	const renderBasedOnPath = () => {
		if (location.pathname.includes('property-category')) {
			return <PropertyCategory formik={formik} />;
		} else if (location.pathname.includes('property-details')) {
			return <PropertiesDetails formik={formik} />;
		} else if (location.pathname.includes('unit-type')) {
			return <UnitType formik={formik} />;
		}
	};

	const formatUnitBasedOnCategoryName = (
		formikValues: any,
		room1: string,
		room2: string,
	) => {
		const units = [...formikValues.units];

		const allUnits = units.map((unit: any) => {
			if (unit && typeof unit === 'object') {
				const newUnit = { ...unit };

				delete newUnit[room1];
				delete newUnit[room2];

				return newUnit;
			}
		});

		formikValues.units = allUnits;
	};

	const handleAddProperty = async () => {
		formik.handleSubmit();

		const errors = await formik.validateForm();

		console.log(errors);

		if (Object.keys(errors).length > 0) {
			dispatch(
				openSnackbar({
					message:
						'Please ensure all the fields are properly filled before you submit!',
					severity: 'info',
					isOpen: true,
				}),
			);
			return;
		}

		saveFormikDataInStore();

		const formikValues: any = {
			...formik.values,
			isMultiUnit: formik.values.unitType === 'multi',
		};

		//check to see if more the property has multiple units;

		const unitLength = formikValues.units.length > 1;

		if (!unitLength && formikValues.isMultiUnit) {
			formikValues.isMultiUnit = false;
		}

		if (formikValues.categoryId === 1) {
			formatUnitBasedOnCategoryName(formikValues, 'offices', 'rooms');
		}

		if (formikValues.categoryId === 2) {
			formatUnitBasedOnCategoryName(formikValues, 'bedrooms', 'rooms');
		}

		if (formikValues.categoryId === 3) {
			formatUnitBasedOnCategoryName(formikValues, 'bedrooms', 'offices');
		}

		//clean up form state object

		const updatedFormikValues = omitBy(formikValues, (value) => {
			return (
				value === undefined ||
				value === null ||
				value === '' ||
				(typeof value === 'object' && value?.length === 0)
			);
		});

		if (updatedFormikValues?.purposeId) {
			updatedFormikValues.purposeId = Number(updatedFormikValues.purposeId);
		}

		if (updatedFormikValues?.newAmenity) {
			delete updatedFormikValues.newAmenity;
		}

		if (updatedFormikValues.unitType) {
			delete updatedFormikValues.unitType;
		}

		// clean up address field

		const updatedAddress = omitBy(
			updatedFormikValues?.address,
			(value) => value === undefined || value === null || value === '',
		);

		if (updatedAddress.longitude && updatedAddress.latitude) {
			updatedAddress.longitude = Number(updatedAddress.longitude);
			updatedAddress.latitude = Number(updatedAddress.latitude);
		}

		updatedFormikValues.address = updatedAddress;

		// clean up unit field;

		const updatedUnits = updatedFormikValues?.units?.map((unit: any) => {
			return omitBy(unit, (value) => {
				return (
					value === undefined ||
					value === null ||
					value === '' ||
					(typeof value === 'object' && value.length === 0)
				);
			});
		});

		updatedFormikValues.units = updatedUnits;

		delete updatedFormikValues.categoryName;

		const payload = { ...updatedFormikValues };

		console.log(payload);

		try {
			await addProperty(payload).unwrap();
		} catch (e) {
			console.log(e);
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
							onClick={handleAddProperty}
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
