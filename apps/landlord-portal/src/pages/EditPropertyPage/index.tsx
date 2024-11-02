/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Card, Typography, Button } from '@mui/material';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';

import {
	useGetPropertiesMetaDataQuery,
	useGetSinglePropertyByUUIDQuery,
} from '../../store/PropertyPageStore/propertyApiSlice';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { AddPropertyType, CategoryMetaDataType } from '../../shared/type';
import { consoleLog } from '../../helpers/debug-logger';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import styles from '../../components/Forms/style';
import addPropertyStyles from '../../Layouts/AddPropertiesLayout/AddPropertiesStyle';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

interface IunitType extends AddPropertyType {
	unitType?: string;
	isMultiUnit?: boolean;
	categoryMetaData: CategoryMetaDataType | null;
	propertyImages?: [];
}

const EditProperty = () => {
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const { data: currentProperty, isLoading: isCurrentPropertyLoading } =
		useGetSinglePropertyByUUIDQuery({
			uuid: currentUUId || '',
		});

	const {
		data: propertyMetaData,
		// isLoading: isPropertyMetaDataLoading
	} = useGetPropertiesMetaDataQuery();

	const navigate = useNavigate();

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

	const handleReturnToPropertyClick = () => {
		navigate(-1);
	};

	useEffect(() => {
		const initialData = {
			categoryId: currentProperty?.category?.id || '',
			typeId: currentProperty?.type?.id || '',
			name: currentProperty?.name || '',
			address: {
				addressLine1: currentProperty?.address.addressLine1 || '',
				addressLine2: currentProperty?.address.addressLine2 || '',
				city: currentProperty?.address?.city || '',
				state: currentProperty?.address?.state || '',
				postalCode: currentProperty?.address?.postalCode || '',
				latitude: currentProperty?.address?.latitude || 0,
				longitude: currentProperty?.address?.longitude || 0,
				country: currentProperty?.address?.country || '',
				isManualAddress: true,
				unit: currentProperty?.address?.unit || '',
			},
			units: currentProperty?.units,
			unitType: currentProperty?.isMultiUnit ? 'multi' : 'single',
		};

		const getCategoryMetaData = () => {
			const categoryMetaData = propertyMetaData?.categories?.find(
				(property: any) =>
					Number(property.id) === Number(initialData.categoryId),
			);

			return categoryMetaData?.metaData;
		};
		const categoryMetaData = getCategoryMetaData();

		formik.setValues({ ...formik.values, categoryMetaData, ...initialData });
	}, [currentProperty, propertyMetaData]);

	return (
		<>
			{
				<Grid container spacing={0}>
					<Grid
						container
						sx={{
							...addPropertyStyles.addPropertiesContainer,
							margin: '30px -10px 30px',
						}}
					>
						<Grid
							item
							sx={addPropertyStyles.addPropertiesContent}
							onClick={handleReturnToPropertyClick}
						>
							<ArrowLeftIcon sx={addPropertyStyles.addPropertiesImage} />
							<Typography
								sx={addPropertyStyles.addPropertiesText}
								fontWeight={600}
							>
								{currentProperty?.name}
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={4}
						component='form'
						onSubmit={formik.handleSubmit}
					>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid container>
									<Card sx={styles.card}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<ControlledSelect
													required
													name='categoryId'
													label='PROPERTY CATEGORY '
													placeholder='Property Category'
													type='text'
													formik={formik}
													value={formik?.values?.categoryId}
													options={propertyMetaData?.categories}
													inputprops={{
														sx: {
															height: '40px',
														},
													}}
												/>
											</Grid>
											<Grid item xs={12}>
												<ControlledSelect
													required
													name='typeId'
													label='PROPERTY TYPE '
													placeholder='Property Type'
													type='text'
													formik={formik}
													value={formik?.values?.typeId}
													options={propertyMetaData?.types}
													inputprops={{
														sx: {
															height: '40px',
														},
													}}
												/>
											</Grid>
											<Grid item xs={12}>
												<ControlledTextField
													required
													name='name'
													label='PROPERTY NAME'
													value={formik?.values?.name}
													formik={formik}
													inputprops={{
														sx: {
															height: '40px',
														},
													}}
												/>
											</Grid>
										</Grid>
									</Card>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							{!isCurrentPropertyLoading && (
								<GeneralInfo
									formik={formik}
									amenities={propertyMetaData?.amenities}
								/>
							)}
						</Grid>
					</Grid>

					<Grid
						container
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Grid sx={addPropertyStyles.buttonContainer}>
							<Button
								variant='contained'
								sx={addPropertyStyles.directionButton}
								// onClick={handleAddProperty}
								// disabled={isNextButtonDisabled}
							>
								<Typography>Save</Typography>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			}
		</>
	);
};

export default EditProperty;
