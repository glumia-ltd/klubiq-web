import { FC, useState } from 'react';
import PropertyCategoryCard from '../PropertyCategoryCard';
import { Grid, Typography, Card } from '@mui/material';
import PropertyLayoutStyle from './PropertyCategoryStyle';
import {
	HouseIcon,
	EmojiOneHomeIcon,
	EmojiOneBuildingIcon,
} from '../Icons/CustomIcons';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';

type CategoryType = {
	id: number;
	name: string;
	displayText: string;
};
interface CardData {
	id: number;
	name: string;
	displayText: string;
	Image: any;
}
const PropertyCategory: FC<{ formik: any }> = ({ formik }) => {
	const [selectedCard, setSelectedCard] = useState<number | null>(
		formik.values.categoryId,
	);

	const { data: propertyMetaData, isLoading: isPropertyMetaDataLoading } =
		useGetPropertiesMetaDataQuery();

	const handleCardClick = (id: number) => {
		setSelectedCard(id);

		formik.setFieldValue('categoryId', id);
	};

	const icons: Record<string, any> = {
		Residential: HouseIcon,
		Commercial: EmojiOneHomeIcon,
		'Student Housing': EmojiOneBuildingIcon,
	};

	const cardData: CardData[] = propertyMetaData?.categories?.map(
		(category: CategoryType, index: number) => {
			return {
				...category,
				id: category?.id,
				Image: icons[category.name],
			};
		},
	);

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
				{cardData?.map((item: CardData) => (
					<Grid item xs={4} sm={4} md={4} key={`${item.id}--${item.name}`}>
						<PropertyCategoryCard
							key={item.id}
							heading={item.name}
							subtext={item.displayText}
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
