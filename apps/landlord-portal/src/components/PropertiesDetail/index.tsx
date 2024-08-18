import { Grid } from '@mui/material';
import RadioCard from '../../components/RadioCard/';
import GeneralInfo from '../../components/Forms/GeneralInfo';
import { useState, useEffect } from 'react';
import UnitLoader from './UnitLoader';

const options = [
	{
		value: 'one',
		label: 'Single Unit',
		subtext:
			'Single unit properties are rentals in which there is only one rental unit associated to a specific address. This type of property does not allow to add any units.',
	},
	{
		value: 'other',
		label: 'Multi Unit',
		subtext:
			'Multi-unit properties are rentals in which there are multiple rental units (with multiple units and leases) associated to a specific (single) address. This type of property allows adding units.',
	},
];
const optionTwo = [
	{ value: 'one', label: 'Single Unit' },
	{ value: 'other', label: 'Multi Unit' },
];
const UnitType = () => {
	const [selectedUnitType, setSelectedUnitType] = useState('one');
	const handleUnitTypeChange = (value: string) => {
		setSelectedUnitType(value);
	};
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 20000);
	}, []);
	return (
		<>
			{loading ? (
				<UnitLoader />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<RadioCard
							headerText='UNIT TYPE'
							options={options}
							defaultValue='one'
							onChange={handleUnitTypeChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<RadioCard
							headerText='PROPERTY purpose'
							options={optionTwo}
							defaultValue='one'
							onChange={handleUnitTypeChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<GeneralInfo selectedUnitType={selectedUnitType} />
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default UnitType;
