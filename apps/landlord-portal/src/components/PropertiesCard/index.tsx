import { Card, Typography, Box } from '@mui/material';
import CardStyle from './CardStyle';
import { Stack } from '@mui/system';

type PropertiesCardProps = {
	heading?: string;
	subtext?: string;
	onClick: (id: number) => void;
	id: number;
	isSelected: boolean;
	src: string;
	alt: string;
};

const PropertiesCard = ({
	heading,
	subtext,
	onClick,
	id,
	isSelected,
	alt,
	src,
}: PropertiesCardProps) => {
	return (
		<Card
			elevation={0}
			sx={isSelected ? CardStyle.selectedCard : CardStyle.card}
			onClick={() => onClick(id)}
		>
			<Stack direction='column' spacing={3}>
				<Box>
					<img src={src} alt={alt} style={{ width: '60px', height: '60px' }} />
				</Box>
				<Typography variant='body1' color='text.primary'>
					{heading}
				</Typography>
				<Typography variant='body2' color='text.primary'>
					{subtext}{' '}
				</Typography>
			</Stack>
		</Card>
	);
};

export default PropertiesCard;
