import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Stack,
	CardActions,
	Typography,
	//Grid,
	Paper,
	Button,
	Box,
	Link,
	Chip,
	SvgIcon,
	createSvgIcon,
	Divider,
	Avatar,
} from '@mui/material';
import { useContext } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import CardStyle from './CardStyle';
import LocationIcon from '../../assets/images/Location.svg';
import LocationIconDM from '../../assets/images/Location-dark-mode.svg';
import BathroomIcon from '../../assets/images/Bathroom.svg';
import BathroomIconDM from '../../assets/images/Bathroom-Dark-Mode.svg';
import FloorIcon from '../../assets/images/Floorplan.svg';
import FloorIconDM from '../../assets/images/Floorplan-Dark-Mode.svg';
import BedIcon from '../../assets/images/Bedroom.svg';
import BedIconDM from '../../assets/images/Bedroom-Dark-Mode.svg';
import { useNavigate } from 'react-router-dom';

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

const PropertyCard: React.FC<PropertyCardProps> = ({
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
	const navigate = useNavigate();
	const handleViewProperty = () => {
		navigate('/properties/12345');
	};
	const { mode } = useContext(ThemeContext);
	return layout === 'column' ? (
		<Card sx={CardStyle.cardContainerColumn}>
			<CardContent
				sx={{
					padding: '1.5rem 1rem',
				}}
			>
				<Typography variant='h1' sx={CardStyle.headerText}>
					{type}
				</Typography>
				<CardMedia
					component='img'
					sx={layout === 'column' ? CardStyle.columnImage : CardStyle.rowImage}
					image={image}
					alt={title}
				/>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={2}
					justifyContent='space-between'
				>
					<Typography variant='h6' sx={CardStyle.subText}>
						{title}
					</Typography>
					<Chip
						label={status}
						color={status === 'For Sale' ? 'error' : 'success'}
					></Chip>
				</Stack>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
				>
					<img
						src={mode === ThemeMode.LIGHT ? LocationIcon : LocationIconDM}
						alt='icon'
						style={CardStyle.iconSize}
					/>
					<Typography variant='caption' color='text.secondary'>
						{address}
					</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
				>
					<img
						src={mode === ThemeMode.LIGHT ? BedIcon : BedIconDM}
						alt='icon'
						style={CardStyle.iconSize}
					/>
					<Typography variant='caption'>{bedrooms} Bedrooms</Typography>
					<img
						src={mode === ThemeMode.LIGHT ? BathroomIcon : BathroomIconDM}
						alt='icon'
						style={CardStyle.iconSize}
					/>
					<Typography variant='caption'>{bathrooms} Bathrooms</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
				>
					<img
						src={mode === ThemeMode.LIGHT ? FloorIcon : FloorIconDM}
						alt='icon'
						style={CardStyle.iconSize}
					/>
					<Typography variant='caption'>{sqm} sqm</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
				>
					<Typography variant='body2'>
						{type}: <Typography variant='caption'>{sqm} sqm</Typography>
					</Typography>
				</Stack>
			</CardContent>
			<Box pl={2} pr={2}>
				<hr></hr>
			</Box>

			<CardActions
				sx={{
					paddingTop: '2rem',
					paddingBottom: '2rem',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
				disableSpacing
			>
				<Typography variant='link'>View Properties</Typography>
			</CardActions>
		</Card>
	) : (
		<Paper sx={CardStyle.cardContainerRow} variant='elevation'>
			<Stack
				sx={{
					padding: '1rem',
				}}
				spacing={1}
			>
				<Typography variant='h1' sx={CardStyle.headerText}>
					{type}
				</Typography>
				<Stack direction='row' spacing={2}>
					<Box width={'160px'} height={'100px'}>
						<Avatar alt={title} src={image} sx={CardStyle.rowImage} />
					</Box>
					<Stack pt={1} width={'100%'} spacing={1}>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='body2'>{title}</Typography>
							<Chip
								size='small'
								label={status}
								color={status === 'For Sale' ? 'error' : 'success'}
							></Chip>
						</Stack>
						<Stack direction='row' justifyContent='flex-start'>
							<img
								src={mode === ThemeMode.LIGHT ? LocationIcon : LocationIconDM}
								alt='icon'
								style={CardStyle.iconSize}
							/>
							<Typography variant='caption' color='text.secondary'>
								{address}
							</Typography>
						</Stack>
						<Stack direction='row' spacing={1} justifyContent='flex-start'>
							<img
								src={mode === ThemeMode.LIGHT ? BedIcon : BedIconDM}
								alt='icon'
								style={CardStyle.iconSize}
							/>
							<Typography variant='caption'>{bedrooms} Bedrooms</Typography>
							<img
								src={mode === ThemeMode.LIGHT ? BathroomIcon : BathroomIconDM}
								alt='icon'
								style={CardStyle.iconSize}
							/>
							<Typography variant='caption'>{bathrooms} Bathrooms</Typography>
						</Stack>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='body2'>
								{type}: <Typography variant='caption'>{sqm} sqm</Typography>
							</Typography>
							<Typography variant='link'>View Properties</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	);

	// <Grid container direction={layout}>
	// 	<Card sx={layout === 'column' ? CardStyle.columnCard : CardStyle.rowCard}>
	// 		<Grid container direction={layout} spacing={1}>
	// 			<Grid item xs={12}>
	// 				<Typography variant='h1' sx={CardStyle.headerText}>
	// 					Residential Housing
	// 				</Typography>
	// 			</Grid>
	// 			<Grid
	// 				item
	// 				xs={layout === 'row' ? 4 : 12}
	// 				sm={layout === 'row' ? 4 : 12}
	// 				md={layout === 'row' ? 3 : 12}
	// 				lg={layout === 'row' ? 2 : 12}
	// 			>
	// 				<CardMedia
	// 					component='img'
	// 					sx={
	// 						layout === 'column' ? CardStyle.columnImage : CardStyle.rowImage
	// 					}
	// 					image={image}
	// 					alt={title}
	// 				/>
	// 			</Grid>
	// 			<Grid
	// 				item
	// 				xs={layout === 'row' ? 8 : 12}
	// 				sm={layout === 'row' ? 8 : 12}
	// 				md={layout === 'row' ? 9 : 12}
	// 				lg={layout === 'row' ? 10 : 12}
	// 			>
	// 				<CardContent sx={CardStyle.content}>
	// 					<Box sx={CardStyle.contentdiv}>
	// 						<Typography variant='h6' sx={CardStyle.subText}>
	// 							{title}
	// 						</Typography>
	// 						<Chip
	// 							label={status}
	// 							color={status === 'For Sale' ? 'error' : 'success'}
	// 						></Chip>
	// 					</Box>
	// 					<Box sx={CardStyle.iconDiv}>
	// 						<img
	// 							src={mode === ThemeMode.LIGHT ? LocationIcon : LocationIconDM}
	// 							alt='icon'
	// 							style={CardStyle.iconSize}
	// 						/>
	// 						<Typography
	// 							variant='body2'
	// 							color='text.secondary'
	// 							sx={CardStyle.text}
	// 						>
	// 							{address}
	// 						</Typography>
	// 					</Box>
	// 					<Box sx={CardStyle.iconDiv}>
	// 						<img
	// 							src={mode === ThemeMode.LIGHT ? BedIcon : BedIconDM}
	// 							alt='icon'
	// 							style={CardStyle.iconSize}
	// 						/>
	// 						<Typography
	// 							variant='body2'
	// 							color='text.secondary'
	// 							mr={0.5}
	// 							sx={CardStyle.text}
	// 						>
	// 							{bedrooms} Bedrooms
	// 						</Typography>
	// 						<img
	// 							src={mode === ThemeMode.LIGHT ? BathroomIcon : BathroomIconDM}
	// 							alt='icon'
	// 							style={CardStyle.iconSize}
	// 						/>
	// 						<Typography
	// 							variant='body2'
	// 							color='text.secondary'
	// 							sx={CardStyle.text}
	// 						>
	// 							{bathrooms} Bathrooms
	// 						</Typography>
	// 					</Box>
	// 					<Box sx={CardStyle.iconDiv}>
	// 						<img
	// 							src={mode === ThemeMode.LIGHT ? FloorIcon : FloorIconDM}
	// 							alt='icon'
	// 							style={CardStyle.iconSize}
	// 						/>
	// 						<Typography
	// 							variant='body2'
	// 							color='text.secondary'
	// 							mr={0.5}
	// 							sx={CardStyle.text}
	// 						>
	// 							{sqm} sqm
	// 						</Typography>
	// 					</Box>
	// 					<Box sx={layout === 'row' ? CardStyle.lastBox : {}}>
	// 						<Typography
	// 							variant='h4'
	// 							sx={CardStyle.bottomText}
	// 							color='text.primary'
	// 							mb='15px'
	// 						>
	// 							{type}
	// 						</Typography>
	// 						<Box
	// 							sx={{
	// 								width: layout === 'column' ? '100%' : '0',
	// 								borderBottom: layout === 'column' ? '1px solid' : 'none',
	// 								mb: layout === 'column' ? 1 : 0,
	// 							}}
	// 						/>
	// 						<Box sx={CardStyle.buttonTwoDiv} onClick={handleViewProperty}>
	// 							<Link sx={CardStyle.buttonTwo}>View Properties</Link>
	// 						</Box>
	// 					</Box>
	// 				</CardContent>
	// 			</Grid>
	// 		</Grid>
	// 	</Card>
	// </Grid>
};

export default PropertyCard;
