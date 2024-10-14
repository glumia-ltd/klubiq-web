import { Stack, Card, Typography } from '@mui/material';
import { styles } from './style';
type cardProps = {
	Amount?: string;
	Name: string;
	Icon?: React.FC;
};

const MiniCard = (props: cardProps) => {
	return (
		<Card sx={styles.cardContainer}>
			<Typography sx={styles.typo}> {props.Name}</Typography>
			{props.Amount !== undefined ? (
				props.Amount
			) : props.Icon ? (
				<props.Icon />
			) : null}
		</Card>
	);
};

export default MiniCard;
