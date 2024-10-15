import { Card, Typography, Box } from '@mui/material';
import CardStyle from './CardStyle';
import { Stack, useTheme } from '@mui/system';

type PropertyCategoryCardProps = {
	heading?: string;
	subtext?: string;
	onClick: (id: number) => void;
	id: number;
	isSelected: boolean;
	Image: any;
};

const PropertyCategoryCard = ({
	heading,
	subtext,
	onClick,
	id,
	isSelected,
	Image,
}: PropertyCategoryCardProps) => {
	const theme = useTheme();

	return (
		<Card
			elevation={0}
			sx={
				isSelected
					? {
							...CardStyle.selectedCard,
							outline: `1px solid ${theme.palette.primary.main}`,
						}
					: CardStyle.card
			}
			onClick={() => onClick(id)}
		>
			<Stack
				direction='column'
				spacing={3}
				sx={{ justifyContent: 'center', alignItems: 'center' }}
			>
				<Box> {Image && <Image sx={CardStyle.imageStyle} />}</Box>
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
