import { Grid } from '@mui/material';
import RadioCard from '../../components/RadioCard';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import UnitLoader from './UnitLoader';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

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

const validationSchema = yup.object({
	unitType: yup.string().required('This field is required'),
	propertyPurpose: yup.string().required('This field is required'),
});

const UnitType = () => {
	const { purposes } = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data }) => ({
			purposes: data?.purposes,
		}),
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
						options={purposes}
						// defaultValue='one'
						onChange={formik.handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<GeneralInfo selectedUnitType={formik?.values?.unitType} />
				</Grid>
			</Grid>
		</>
	);
};

export default UnitType;
