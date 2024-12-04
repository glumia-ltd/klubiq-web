import { Grid } from '@mui/material';
import RadioCard from '../RadioCard';
import GeneralInfo from '../Forms/GeneralInfo';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { FC } from 'react';

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

const UnitType: FC<{ formik: any }> = ({ formik }) => {
	const { purposes, amenities } = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data }) => ({
			purposes: data?.purposes,
			amenities: data?.amenities,
		}),
	});

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<RadioCard
					required
					headerText='UNIT TYPE'
					name='unitType'
					options={options}
					checkedValue={formik.values.unitType}
					onChange={formik.handleChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<RadioCard
					required
					headerText='PROPERTY purpose'
					name='purposeId'
					options={purposes}
					checkedValue={formik.values.purposeId}
					onChange={formik.handleChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<GeneralInfo formik={formik} amenities={amenities} />
			</Grid>
		</Grid>
	);
};

export default UnitType;
