import { Card, Typography, Box } from '@mui/material';
import CardStyle from './CardStyle';
import { Stack } from '@mui/system';

type PropertyCategoryCardProps = {
	heading?: string;
	subtext?: string;
	onClick: (id: number) => void;
	id: number;
	isSelected: boolean;
	src: string;
	alt: string;
};

const PropertyCategoryCard = ({
	heading,
	subtext,
	onClick,
	id,
	isSelected,
	alt,
	src,
}: PropertyCategoryCardProps) => {
	return (
		<Card
			elevation={0}
			sx={isSelected ? CardStyle.selectedCard : CardStyle.card}
			onClick={() => onClick(id)}
		>
			<Stack direction='column' spacing={3}>
				<Box>
					<Box component='img' src={src} alt={alt} sx={CardStyle.imageStyle} />
				</Box>
				<Typography variant='body2' color='text.primary' sx={CardStyle.header}>
					{heading}
				</Typography>
				<Box>
					<Typography
						// variant='body2'
						color='text.primary'
						sx={CardStyle.subtext}
					>
						{subtext}{' '}
					</Typography>
				</Box>
			</Stack>
		</Card>
	);
};

export default PropertyCategoryCard;
