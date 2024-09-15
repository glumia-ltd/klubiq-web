import { Grid } from '@mui/material';
import RadioCard from '../../components/RadioCard';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
import { useSelector } from 'react-redux';
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

const UnitType: FC<{ formik: any; handleChange: any }> = ({
	formik,
	handleChange,
}) => {
	const { purposes, amenities } = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data }) => ({
			purposes: data?.purposes,
			amenities: data?.amenities,
		}),
	});

	const formState = useSelector(getAddPropertyState);

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<RadioCard
						headerText='UNIT TYPE'
						name='unitType'
						options={options}
						checkedValue={formState.isMultiUnit ? 'multi' : 'single'}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<RadioCard
						headerText='PROPERTY purpose'
						name='purposeId'
						options={purposes}
						checkedValue={formState?.purposeId}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<GeneralInfo formik={formik} amenities={amenities} />
				</Grid>
			</Grid>
		</>
	);
};

export default UnitType;
