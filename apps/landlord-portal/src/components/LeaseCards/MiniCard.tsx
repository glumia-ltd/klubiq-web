import { Card, Typography } from '@mui/material';
import { styles } from './style';
type cardProps = {
	value?: string;
	name: string;
	Icon?: React.FC;
	status?: string;
};

const MiniCard = (props: cardProps) => {
	return (
		<Card
			variant={
				props.status === 'Expired'
					? 'expired'
					: props.status === 'Overdue'
						? 'overdue'
						: 'active'
			}
			sx={{
				...styles.cardContainer,
			}}
		>
			<Typography sx={styles.typo}> {props.name}</Typography>
			{props.value !== undefined ? (
				props.value
			) : props.Icon ? (
				<props.Icon />
			) : null}
		</Card>
	);
};

export default MiniCard;
