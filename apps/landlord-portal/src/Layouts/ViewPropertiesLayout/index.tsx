import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import ViewPropertyCard from '../../components/ViewPropertiesCard';

const properties = [
	{
		title: '5 Bedroom House',
		address: '16B Ibrahim Fadoyin Street, Ikosi Ketu',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 1000,
		type: 'Residential Housing',
		status: 'For Sale',
		image: '../../../src/assets/images/Rectangle 157.jpg',
	},
	{
		title: 'Landmark Estate',
		address: 'Engineering Close, off Idowu Street, Victoria Island, Lagos',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 800,
		type: 'Residential Housing',
		status: 'For Rent',
		image: '../../../src/assets/images/Rectangle 157.jpg',
	},
];

const ViewPropertyLayout = () => {
	const [layout, setLayout] = useState<'row' | 'column'>('column');

	//   const toggleLayout = () => {
	//     setLayout(prevLayout => (prevLayout === 'row' ? 'column' : 'row'));
	//   };
	const toggleLayout = () => {
		setLayout((prevLayout) => (prevLayout === 'row' ? 'column' : 'row'));
	};

	return (
		<div>
			<Button
				onClick={toggleLayout}
				variant='contained'
				style={{ marginBottom: 16 }}
			>
				Toggle Layout
			</Button>
			<Grid container spacing={1}>
				{properties.map((property, index) => (
					<Grid
						item
						xs={12}
						sm={layout === 'row' ? 12 : 6}
						md={layout === 'row' ? 12 : 4}
						key={index}
					>
						<ViewPropertyCard {...property} layout={layout} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ViewPropertyLayout;
