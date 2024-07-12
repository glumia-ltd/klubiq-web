import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Button,
	Box,
	Link,
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
			<Grid container direction={layout} spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h1' sx={CardStyle.headerText}>
						Residential Housing
					</Typography>
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
								sx={CardStyle.button}
							>
								{status}
							</Button>
						</Box>
						<Box sx={CardStyle.iconDiv} height='30px'>
							<img src={LocationIcon} alt='icon' style={CardStyle.iconSize} />
							<Typography variant='body2' color='text.secondary'>
								{address}
							</Typography>
						</Box>
						<Box sx={CardStyle.iconDiv}>
							<img src={BedIcon} alt='icon' style={CardStyle.iconSize} />
							<Typography variant='body2' color='text.secondary' mr={0.5}>
								{bedrooms} Bedrooms
							</Typography>
							<img src={BathroomIcon} alt='icon' style={CardStyle.iconSize} />
							<Typography variant='body2' color='text.secondary'>
								{bathrooms} Bathrooms
							</Typography>
						</Box>
						<Box sx={CardStyle.iconDiv}>
							<img src={FloorIcon} alt='icon' style={CardStyle.iconSize} />
							<Typography variant='body2' color='text.secondary' mr={0.5}>
								{sqm} sqm
							</Typography>
						</Box>
						<Box sx={layout === 'row' ? CardStyle.lastBox : {}}>
							<Typography
								variant='h4'
								sx={CardStyle.bottomText}
								color='text.primary'
								mb='15px'
							>
								{type}
							</Typography>
							<Box
								sx={{
									width: layout === 'column' ? '100%' : '0',
									borderBottom: layout === 'column' ? '1px solid' : 'none',
									mb: layout === 'column' ? 1 : 0,
								}}
							/>
							<Box sx={CardStyle.buttonTwoDiv}>
								<Link sx={CardStyle.buttonTwo}>View Properties</Link>
							</Box>
						</Box>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);
};

export default ViewPropertyCard;
