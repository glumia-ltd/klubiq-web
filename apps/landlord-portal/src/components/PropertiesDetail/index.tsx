import { Grid } from '@mui/material';
import RadioCard from '../../components/RadioCard';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import UnitLoader from './UnitLoader';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
	getAddPropertyState,
	saveAddPropertyFormDetail,
} from '../../store/AddPropertyStore/AddPropertySlice';
import { useDispatch, useSelector } from 'react-redux';

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
	purposeId: string;
};

const validationSchema = yup.object({
	unitType: yup.string().required('This field is required'),
	purposeId: yup.string().required('This field is required'),
});

const UnitType = () => {
	const { purposes, amenities } = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data }) => ({
			purposes: data?.purposes,
			amenities: data?.amenities,
		}),
	});

	const formState = useSelector(getAddPropertyState);

	const dispatch = useDispatch();

	const onSubmit = async (values: PropertyUnitType) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			unitType: '',
			purposeId: '',
		},
		validationSchema,
		onSubmit,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let purposeId = null;
		let isMultiUnit = false;

		if (event.target.name === 'purposeId') {
			purposeId = Number(event.target.value);
		} else if (event.target.name === 'unitType') {
			isMultiUnit = event.target.value === 'multi' ? true : false;
		}
		const payload = {
			purposeId,
			isMultiUnit,
		};
		dispatch(saveAddPropertyFormDetail(payload));

		formik.handleChange(event);
	};

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
						checkedValue={formState.purposeId}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<GeneralInfo
						selectedUnitType={formik?.values?.unitType}
						amenities={amenities}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default UnitType;
