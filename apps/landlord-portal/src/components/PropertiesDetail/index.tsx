import { Grid } from '@mui/material';
import RadioCard from '../../components/RadioCard';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import { useState } from 'react';
import UnitLoader from './UnitLoader';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';

const options = [
	{
		id: 'single',
		displayText: 'Single Unit',
		subtext:
			'Single unit properties are rentals in which there is only one rental unit associated to a specific address. This type of property does not allow to add any units.',
	},
	{
		id: 'multi',
		displayText: 'Multi Unit',
		subtext:
			'Multi-unit properties are rentals in which there are multiple rental units (with multiple units and leases) associated to a specific (single) address. This type of property allows adding units.',
	},
];

type PropertyUnitType = {
	unitType: string;
	propertyPurpose: string;
};

const UnitType = () => {
	const [selectedUnitType, setSelectedUnitType] = useState('one');

	const { data: propertyMetaData, isLoading: isPropertyMetaDataLoading } =
		useGetPropertiesMetaDataQuery();

	const handleUnitTypeChange = (value: string) => {
		console.log(value);
		// setSelectedUnitType(value);
	};

	const validationSchema = yup.object({
		unitType: yup.string().required('This field is required'),
		propertyPurpose: yup.string().required('This field is required'),
	});

	const onSubmit = async (values: PropertyUnitType) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			unitType: '',
			propertyPurpose: '',
		},
		validationSchema,
		onSubmit,
	});

	console.log('PropertiesDetail Rerendered');

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<RadioCard
						headerText='UNIT TYPE'
						name='unitType'
						options={options}
						// defaultValue='single'
						onChange={formik.handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<RadioCard
						headerText='PROPERTY purpose'
						name='propertyPurpose'
						options={propertyMetaData?.purposes}
						// defaultValue='one'
						onChange={formik.handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<GeneralInfo selectedUnitType={selectedUnitType} />
				</Grid>
			</Grid>
		</>
	);
};

export default UnitType;
