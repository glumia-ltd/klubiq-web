import { Grid, Typography, Box, Card } from '@mui/material';
import HouseIcon from '../../assets/images/home.svg';
import IconTwo from '../../assets/images/home2.svg';
import IconThree from '../../assets/images/people.svg';
import IconFour from '../../assets/images/lasthouse.svg';
import style from './style';

interface DataItem {
	icon?: JSX.Element;
	label: string;
	value: number;
	valueColor?: string;
	imgSrc?: string;
}

const data: DataItem[] = [
	{
		label: 'UNIT',
		value: 1,
		imgSrc: HouseIcon,
	},
	{
		label: 'VACANT UNIT',
		value: 1,
		valueColor: 'green',
		imgSrc: IconTwo,
	},
	{
		label: 'TENANT',
		value: 0,
		imgSrc: IconThree,
	},
	{
		label: 'MAINTENANCE REQUEST',
		value: 0,
		valueColor: 'red',
		imgSrc: IconFour,
	},
];

const UnitInfoCard = () => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				{data.map((item, index) => (
					<Grid
						item
						xs={3}
						sm={}
						md={3}
						lg={3}
						key={index}
						sx={{
							textAlign: 'center',
							borderRight: index < data.length - 1 ? '1px solid #ddd' : 'none',
						}}
					>
						<Box sx={style.lastBox}>
							<Box>
								<Box
									component='img'
									src={item.imgSrc}
									alt={item.label}
									sx={style.imageStyle}
								/>
							</Box>

							<Typography variant='subtitle1' sx={style.headerText}>
								{item.label}
							</Typography>
							<Typography
								variant='h4'
								style={{ color: item.valueColor || 'black' }}
								sx={style.subText}
							>
								{item.value}
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</Card>
	);
};

export default UnitInfoCard;
