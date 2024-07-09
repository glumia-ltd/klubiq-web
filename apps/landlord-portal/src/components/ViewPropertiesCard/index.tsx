import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Button,
	Box,
} from '@mui/material';
import CardStyle from './CardStyle';
import LocationIcon from '../../assets/images/Location.svg';
import BathroomIcon from '../../assets/images/Bathroom.svg';
import FloorIcon from '../../assets/images/Floorplan.svg';
import BedIcon from '../../assets/images/Bedroom.svg';

interface PropertyCardProps {
	title: string;
	address: string;
	bedrooms: number;
	bathrooms: number;
	sqm: number;
	type: string;
	status: string;
	image: string;
	layout: 'row' | 'column';
}

const ViewPropertyCard: React.FC<PropertyCardProps> = ({
	title,
	address,
	bedrooms,
	bathrooms,
	sqm,
	type,
	status,
	image,
	layout,
}) => {
	return (
		<Card sx={layout === 'column' ? CardStyle.columnCard : CardStyle.rowCard}>
			<Grid container direction={layout} spacing={1}>
				<Grid item xs={12} sm={layout === 'row' ? 12 : 12}>
					<Typography variant='h1' sx={CardStyle.headerText}>
						Residential Housing{' '}
					</Typography>{' '}
				</Grid>
				<Grid
					item
					xs={layout === 'row' ? 4 : 12}
					sm={layout === 'row' ? 4 : 12}
					md={layout === 'row' ? 3 : 12}
					lg={layout === 'row' ? 2 : 12}
				>
					<CardMedia
						component='img'
						sx={
							layout === 'column' ? CardStyle.columnImage : CardStyle.rowImage
						}
						image={image}
						alt={title}
					/>
				</Grid>
				<Grid
					item
					xs={layout === 'row' ? 8 : 12}
					sm={layout === 'row' ? 8 : 12}
					md={layout === 'row' ? 9 : 12}
					lg={layout === 'row' ? 10 : 12}
				>
					<CardContent sx={CardStyle.content}>
						<Box sx={CardStyle.contentdiv}>
							<Typography variant='h6' sx={CardStyle.subText}>
								{title}
							</Typography>
							<Button
								variant='contained'
								color={status === 'For Sale' ? 'error' : 'success'}
								// background={status === 'For Sale' ? 'error' : 'primary'}
								sx={CardStyle.button}
							>
								{status}
							</Button>{' '}
						</Box>
						<Box sx={CardStyle.iconDiv}>
							<img src={LocationIcon} alt='icon' style={CardStyle.iconSize} />{' '}
							<Typography
								variant='body2'
								color='text.secondary'
								// alignItems={'center'}
							>
								{address}
							</Typography>
						</Box>

						<Box sx={CardStyle.iconDiv}>
							<img src={BedIcon} alt='icon' style={CardStyle.iconSize} />{' '}
							<Typography variant='body2' color='text.secondary' mr={1.5}>
								{bedrooms} Bedrooms
							</Typography>
							<img src={BathroomIcon} alt='icon' style={CardStyle.iconSize} />{' '}
							<Typography variant='body2' color='text.secondary'>
								{bathrooms} Bathrooms
							</Typography>
						</Box>
						<Box sx={CardStyle.iconDiv}>
							<img src={FloorIcon} alt='icon' style={CardStyle.iconSize} />{' '}
							<Typography variant='body2' color='text.secondary' mr={0.5}>
								{sqm} sqm
							</Typography>
						</Box>

						<Typography
							variant='h4'
							sx={CardStyle.bottomText}
							color='text.primary'
							mb='15px'
						>
							{type}
						</Typography>
						<Box sx={{ width: '100%', borderBottom: '1px solid black' }} />
						<Box sx={CardStyle.buttonTwoDiv}>
							<Button sx={CardStyle.buttonTwo}>View Properties</Button>{' '}
						</Box>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);
};

export default ViewPropertyCard;
