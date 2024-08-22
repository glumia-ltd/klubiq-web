import { Grid, Typography, Box, Card, Button } from '@mui/material';
import style from './style';
import Icon from '../../assets/images/contact.svg';
import { FC } from 'react';

type CardProps = {
	heading?: string;
	subtext?: string;
	description?: string;
	id?: number;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddFieldCard: FC<CardProps> = ({
	heading,
	subtext,
	onClick,
	description,
}: CardProps) => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				<Grid item xs={6} sm={6} md={3} lg={3} sx={style.content}>
					<Box component='img' src={Icon} alt={'icon'} sx={style.imageStyle} />
					<Box>
						<Typography variant='h6' sx={style.headerText}>
							{heading}
						</Typography>
						<Typography variant='subtitle1' sx={style.subText}>
							{subtext}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} md={9} lg={9} sx={style.lastBox}>
					<Button variant='contained' onClick={onClick} sx={style.button}>
						{description}
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default AddFieldCard;
