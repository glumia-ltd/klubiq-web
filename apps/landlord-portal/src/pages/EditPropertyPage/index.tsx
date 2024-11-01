/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Card, Typography, Button } from '@mui/material';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';

import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { AddPropertyType, CategoryMetaDataType } from '../../shared/type';
import { consoleLog } from '../../helpers/debug-logger';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import styles from '../../components/Forms/style';
import addPropertyStyles from '../../Layouts/AddPropertiesLayout/AddPropertiesStyle';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { useNavigate } from 'react-router-dom';

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
	const {
		data: propertyMetaData,
		//, isLoading: isPropertyMetaDataLoading
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

	return (
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
					<Typography sx={addPropertyStyles.addPropertiesText} fontWeight={600}>
						Property
					</Typography>
				</Grid>

				{/* <Button variant='text' sx={styles.button}>
							<Typography>Save draft</Typography>
						</Button> */}
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
											name='typeId'
											label='PROPERTY CATEGORY '
											placeholder='Property Category'
											type='text'
											formik={formik}
											value={formik?.values?.categoryId}
											options={propertyMetaData?.category}
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
					<GeneralInfo formik={formik} amenities={[]} />
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
	);
};

export default EditProperty;
