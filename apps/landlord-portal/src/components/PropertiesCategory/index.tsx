import { useState } from 'react';
import PropertyCategoryCard from '../PropertyCategoryCard';
import { Grid, Typography, Card } from '@mui/material';
import PropertyLayoutStyle from './PropertyCategoryStyle';
import {
	HouseIcon,
	EmojiOneHomeIcon,
	EmojiOneBuildingIcon,
} from '../Icons/CustomIcons';

interface CardData {
	id: number;
	title: string;
	description: string;
	Image: any;
	alt: string;
}
const PropertyCategory = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const handleCardClick = (id: number) => {
		setSelectedCard((prevId) => (prevId === id ? null : id));
		console.log('Selected card ID:', id === selectedCard ? null : id);
	};

	const data: CardData[] = [
		{
			id: 1,
			title: 'Residential',
			description: 'Any property used for residential purpose.',
			Image: HouseIcon,
			alt: 'Description of image 1',
		},
		{
			id: 2,
			title: 'Commercial',
			description:
				'Any property used for business purposes rather than as a living space.',
			Image: EmojiOneHomeIcon,
			alt: 'Description of image 2',
		},
		{
			id: 3,
			title: 'Student Housing',
			description:
				'Any residential units that serves as housing exclusively for  students.',
			Image: EmojiOneBuildingIcon,
			alt: 'Description of image 3',
		},
	];
	return (
		<Card sx={PropertyLayoutStyle.card}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography
						variant='h1'
						gutterBottom
						textTransform={'capitalize'}
						mb={'24px'}
						sx={PropertyLayoutStyle.header}
					>
						Property Category
					</Typography>
				</Grid>
				{data.map((item) => (
					<Grid item xs={4} sm={4} md={4} key={item.id}>
						<PropertyCategoryCard
							key={item.id}
							heading={item.title}
							subtext={item.description}
							id={item.id}
							onClick={handleCardClick}
							isSelected={item.id === selectedCard}
							Image={item.Image}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default PropertyCategory;
