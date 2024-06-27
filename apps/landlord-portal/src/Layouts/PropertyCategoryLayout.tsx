import { useState } from 'react';
import PropertiesCard from '../components/PropertiesCard';
import { Grid, Typography, Card } from '@mui/material';
import PropertyLayoutStyle from './PropertyLayoutStyle';
import myImage1 from '../assets/images/house.svg';
import myImage3 from '../assets/images/emojione-monotone_houses.svg';
import myImage2 from '../assets/images/emojione-monotone_office-building.svg';
// type Props = {};
interface CardData {
	id: number;
	title: string;
	description: string;
	// icon: React.ReactElement;
	src: string;
	alt: string;
}
const PropertyCategoryLayout = () => {
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
			// icon: <HomeIcon />,
			src: myImage1,
			alt: 'Description of image 1',
		},
		{
			id: 2,
			title: 'Commercial',
			description:
				'Any property used for business purposes rather than as a living space.',
			// icon: <WorkIcon />,
			src: myImage2,
			alt: 'Description of image 2',
		},
		{
			id: 3,
			title: 'Student Housing',
			description:
				'Any residential units that serves as housing exclusively for  students.',
			// icon: <SchoolIcon />,
			src: myImage3,
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
						<PropertiesCard
							key={item.id}
							heading={item.title}
							subtext={item.description}
							// icon={item.icon}
							id={item.id}
							onClick={handleCardClick}
							isSelected={item.id === selectedCard}
							src={item.src}
							alt={item.alt}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default PropertyCategoryLayout;
