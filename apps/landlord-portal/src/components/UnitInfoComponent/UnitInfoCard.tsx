import { Grid, Typography, Box, Card } from '@mui/material';
import style from './style';
import { FC } from 'react';

interface DataItem {
	icon?: JSX.Element;
	label: string;
	value: number;
	valueColor?: string;
	imgSrc?: any;
}

const UnitInfoCard: FC<{ data: DataItem[] }> = ({ data }) => {
	return (
		<Card sx={style.contentdiv}>
			<Grid container spacing={1}>
				{data.map((item, index) => {
					const xsValue = 12 / data.length;
					return (
						<Grid
							item
							xs={xsValue}
							key={index}
							sx={{
								textAlign: 'center',
								borderRight:
									index < data.length - 1 ? '1px solid #ddd' : 'none',
							}}
						>
							<Box sx={style.lastBox}>
								<Box sx={style.imageStyle}>
									<item.imgSrc />
								</Box>

								<Typography variant='subtitle1' sx={style.headerText}>
									{item.label}
								</Typography>
								<Typography
									variant='h4'
									style={{ color: item.valueColor }}
									sx={style.subText}
								>
									{item.value}
								</Typography>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</Card>
	);
};

export default UnitInfoCard;
