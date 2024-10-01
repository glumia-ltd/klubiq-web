import { FC, useState } from 'react';
import PropertyCategoryCard from '../PropertyCategoryCard/index';
import { Grid, Typography, Card } from '@mui/material';
import PropertyLayoutStyle from './PropertyCategoryStyle';
import {
	HouseIcon,
	EmojiOneHomeIcon,
	EmojiOneBuildingIcon,
} from '../Icons/CustomIcons';
import { useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { CategoryMetaDataType } from '../../shared/type';

type CategoryType = {
	id: number;
	name: string;
	displayText: string;
	metaData?: CategoryMetaDataType;
	Image: any;
};

const PropertyCategory: FC<{ formik: any }> = ({ formik }) => {
	const [selectedCard, setSelectedCard] = useState<number | null>(
		formik.values.categoryId,
	);

	const {
		data: propertyMetaData,
		//, isLoading: isPropertyMetaDataLoading
	} = useGetPropertiesMetaDataQuery();

	const handleCardClick = (metaData: any, id: number) => {
		formik.setFieldValue('categoryMetaData', metaData);
		formik.setFieldValue('categoryId', id);
		setSelectedCard(id);
	};

	const icons: Record<string, any> = {
		HouseIcon,
		EmojiOneHomeIcon,
		EmojiOneBuildingIcon,
	};

	const cardData: CategoryType[] = propertyMetaData?.categories?.map(
		(category: CategoryType) => {
			return {
				...category,
				id: category?.id,
				Image: icons[category.metaData?.icon || ''],
			};
		},
	);
	console.log(cardData);
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
				{cardData?.map((item: CategoryType) => (
					<Grid item xs={4} sm={4} md={4} key={`${item.id}--${item.name}`}>
						<PropertyCategoryCard
							key={item.id}
							heading={item.name}
							subtext={item.displayText}
							id={item.id}
							onClick={() => handleCardClick(item?.metaData, item.id)}
							isSelected={item.id === selectedCard}
							Image={item?.Image}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default PropertyCategory;
