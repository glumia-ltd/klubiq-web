import { Card, Stack, Typography } from '@mui/material';
import { styles } from './style';
type cardProps = {
	value?: string;
	name: string;
	Icon?: React.FC;
	status?: string;
	dangerouslySetInnerHTML?: string;
};

const MiniCard = (props: cardProps) => {
	// eslint-disable-next-line no-undef

	return (
		<Card
			variant={
				props.status === 'Expired'
					? 'expired'
					: props.status === 'Overdue'
						? 'overdue'
						: 'active'
			}
			sx={styles.cardContainer}
		>
			<Stack direction='column' sx={styles.cardContent}>
				<Typography variant='h6'> {props.name}</Typography>
				{props.value !== undefined ? (
					<Typography variant='body1'>{props.value}</Typography>
				) : props.Icon ? (
					<props.Icon />
				) : (
					<Typography variant='body1' dangerouslySetInnerHTML={{ __html: props.dangerouslySetInnerHTML || '' }} />
				)}
			</Stack>
		</Card>
	);
};

export default MiniCard;
