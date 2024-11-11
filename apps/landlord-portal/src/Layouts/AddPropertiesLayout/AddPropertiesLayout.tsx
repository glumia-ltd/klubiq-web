/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './AddPropertiesStyle';
import { CustomStepper } from '../../components/CustomStepper';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryMetaDataType, RouteObjectType } from '../../shared/type';
import * as yup from 'yup';
import { useFormik } from 'formik';

import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../components/Icons/CustomIcons';
import { useDispatch } from 'react-redux';
import {
	//getAddPropertyState,
	//getAddPropertyState,
	saveAddPropertyFormDetail,
} from '../../store/AddPropertyStore/AddPropertySlice';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import PropertyCategory from '../../components/PropertiesCategory';
import PropertiesDetails from '../../components/PropertiesDetails';
import UnitType from '../../components/UnitType';
import { AddPropertyType } from '../../shared/type';
import { useAddPropertyMutation } from '../../store/PropertyPageStore/propertyApiSlice';
import { omitBy } from 'lodash';
import { clearData } from '../../services/indexedDb';
import { consoleLog } from '../../helpers/debug-logger';

const validationSchema = yup.object({
	name: yup.string().required('Please enter the property name'),
	description: yup.string(),
	typeId: yup.string().required('Select an option'),
	categoryId: yup.string().required('Select an option'),
	images: yup.array(),
	unitType: yup.string().required('This field is required'),
	purposeId: yup.number().required('This field is required'),

	address: yup.object({
		addressLine1: yup.string().required('Address Line 1 is required'),
		addressLine2: yup.string(),
		city: yup.string(),
		state: yup.string(),
		postalCode: yup.string(),
		country: yup.string().required('Country is required'),
		isManualAddress: yup.boolean(),
	}),

	units: yup.array().of(
		yup.object({
			id: yup.number().nullable(),
			unitNumber: yup.string().when('unitType', {
				is: 'multi',
				then: (schema) => schema.required('Unit number is required'),
			}),
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
	categoryMetaData: CategoryMetaDataType | null;
	propertyImages?: [];
}

export const AddPropertiesLayout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
	const [informationDialog, setInformationDialog] = useState(false);

	const navigate = useNavigate();

	const location = useLocation();

	const LOCATION_IS_PROPERTY_CATEGORY =
		location.pathname.includes('property-category');
	const LOCATION_IS_PROPERTY_DETAILS =
		location.pathname.includes('property-details');
	const LOCATION_IS_UNIT_TYPE = location.pathname.includes('unit-type');

	const dispatch = useDispatch();

	const [
		addProperty,
		// { isLoading, isSuccess, isError, error }
	] = useAddPropertyMutation();

	const currentLocation = location.pathname.split('/')[3] || '';

	const onSubmit = async (values: any) => {
		consoleLog(values, 'val');
	};

	const formik = useFormik<IunitType>({
		initialValues: {
			categoryMetaData: null,
			newAmenity: '',
			customAmenities: [],
			categoryId: null,
			description: '',
			name: '',
			typeId: '',
			images: [],
			propertyImages: [],
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

		const route = `/properties/create/${routeObject[routeKey]?.label}`;

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
		const { categoryId, purposeId, propertyImages } = formik.values;

		if (
			Object.keys(formik.touched).length > 0 ||
			categoryId ||
			purposeId ||
			!!propertyImages?.length
		) {
			setInformationDialog(true);
		} else {
			navigate('/properties');
		}
	};

	const handleDialogLeave = () => {
		navigate('/properties');
	};

	const renderBasedOnPath = () => {
		if (LOCATION_IS_PROPERTY_CATEGORY) {
			return <PropertyCategory formik={formik} />;
		} else if (LOCATION_IS_PROPERTY_DETAILS) {
			return <PropertiesDetails formik={formik} />;
		} else if (LOCATION_IS_UNIT_TYPE) {
			return <UnitType formik={formik} />;
		}
	};

	useEffect(() => {
		// check to see if all the units have values for their rooms and unitNumber where necessary.
		const checkIfUnitsAreFilled = (
			name: 'bedrooms' | 'offices' | 'rooms' | 'unitNumber',
		) => {
			return (
				formik.values.units.filter((unit) => !!unit[name]).length ===
				formik.values.units.length
			);
		};

		if (LOCATION_IS_PROPERTY_CATEGORY) {
			if (formik.values.categoryId) {
				setIsNextButtonDisabled(false);
			} else {
				setIsNextButtonDisabled(true);
			}
		} else if (LOCATION_IS_PROPERTY_DETAILS) {
			if (formik.values.typeId && formik.values.name) {
				setIsNextButtonDisabled(false);
			} else {
				setIsNextButtonDisabled(true);
			}
		} else if (LOCATION_IS_UNIT_TYPE) {
			const CHECKBEDROOMSINUNITS = checkIfUnitsAreFilled('bedrooms');

			const CHECKOFFICESINUNITS = checkIfUnitsAreFilled('offices');

			const CHECKROOMSINUNITS = checkIfUnitsAreFilled('rooms');

			const CHECKUNITNUMBERS = checkIfUnitsAreFilled('unitNumber');

			const CHECKFLOORPLANS =
				formik.values.units.filter((unit) => !!unit.area.value).length ===
				formik.values.units.length;

			if (
				formik.values.unitType &&
				formik.values.address.addressLine1 &&
				formik.values.address.country &&
				CHECKFLOORPLANS &&
				(CHECKBEDROOMSINUNITS || CHECKOFFICESINUNITS || CHECKROOMSINUNITS)
			) {
				if (formik.values.unitType === 'multi' && !CHECKUNITNUMBERS) {
					setIsNextButtonDisabled(true);
				}
				setIsNextButtonDisabled(false);
			} else {
				setIsNextButtonDisabled(true);
			}
		}
	}, [
		LOCATION_IS_PROPERTY_CATEGORY,
		LOCATION_IS_PROPERTY_DETAILS,
		LOCATION_IS_UNIT_TYPE,
		formik.values,
		formik.values.address.addressLine1,
		formik.values.address.country,
		formik.values.categoryId,
		formik.values.name,
		formik.values.typeId,
		formik.values.unitType,
		formik.values.units,
	]);

	const formatUnitBasedOnCategory = (
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

		if (formikValues.categoryMetaData?.hasBedrooms) {
			formatUnitBasedOnCategory(formikValues, 'offices', 'rooms');
		}

		if (formikValues.categoryMetaData?.hasOffices) {
			formatUnitBasedOnCategory(formikValues, 'bedrooms', 'rooms');
		}

		if (formikValues.categoryMetaData?.hasRooms) {
			formatUnitBasedOnCategory(formikValues, 'bedrooms', 'offices');
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
		delete updatedFormikValues.categoryMetaData;
		delete updatedFormikValues.propertyImages;

		try {
			delete formik.values.propertyImages;
			const payload = { ...updatedFormikValues };
			await addProperty(payload).unwrap();
			clearData('new-property');

			dispatch(
				openSnackbar({
					message: 'Property Successfully created',
					severity: 'info',
					isOpen: true,
				}),
			);

			navigate('/properties');
		} catch (e) {
			consoleLog(e);
			//clearData('new-property');
		}
	};

	return (
		<>
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

						{/* <Button variant='text' sx={styles.button}>
							<Typography>Save draft</Typography>
						</Button> */}
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
								disabled={
									isNextButtonDisabled || activeStep === steps.length - 1
								}
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
							disabled={isNextButtonDisabled}
						>
							<Typography>Save</Typography>
						</Button>
					)}
				</Grid>
			</>

			<Dialog
				open={informationDialog}
				onClose={() => setInformationDialog(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					Are you sure you want to leave?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						You have unsaved changes. If you leave now, your changes will be
						lost.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setInformationDialog(false)}>Cancel</Button>
					<Button onClick={handleDialogLeave} autoFocus>
						Leave Without Saving
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
