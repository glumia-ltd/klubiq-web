import { Grid, Typography, Box, Card, Button } from '@mui/material';
import style from './style';
import Icon from '../../assets/images/contact.svg';

type CardProps = {
	heading?: string;
	subtext?: string;
	description?: string;
	id?: number;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddFieldCard = ({
	heading,
	subtext,
	onClick,
	description,
}: CardProps) => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				<Grid item xs={3} sx={style.content}>
					<Box component='img' src={Icon} alt={'icon'} sx={style.imageStyle} />
					<Box>
						<Typography variant='h6' sx={style.headerText}>
							{heading}
							Add Tenant
						</Typography>
						<Typography variant='subtitle1' sx={style.subText}>
							{subtext} Add lease to your property
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={9} sx={style.lastBox}>
					<Button onClick={onClick} sx={style.button}>
						{description}
						Add tenant
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default AddFieldCard;
