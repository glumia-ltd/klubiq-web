import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Stack,
	CardActions,
	Typography,
	Paper,
	Box,
	Chip,
	Avatar,
} from '@mui/material';
import * as KlubiqIcons from '../custom-icons';
import CardStyle from './CardStyle';
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
	return layout === 'column' ? (
		<Card sx={CardStyle.cardContainerColumn}>
			<CardContent
				sx={{
					padding: '1.5rem 1rem',
				}}
			>
				<Typography variant='cardHeader' noWrap={true}>
					{type}
				</Typography>
				<CardMedia
					component='img'
					sx={{
						marginTop: '1rem',
						height: '15rem',
						objectFit: 'cover',
						borderRadius: '0.5rem',
					}}
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
					<Typography variant='cardTitle' noWrap={true}>
						{title}
					</Typography>
					<Chip
						label={status}
						color={status === 'For Sale' ? 'error' : 'success'}
					></Chip>
				</Stack>
				<Stack
					sx={{
						paddingTop: '0.875rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<KlubiqIcons.Place
						sx={{
							color: 'text.primary',
						}}
					/>
					<Typography variant='cardContentText' noWrap={true}>
						{address}
					</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '0.5rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<KlubiqIcons.Bedroom
						sx={{
							color: 'text.primary',
						}}
					/>
					<Typography variant='cardContentText' noWrap={true}>
						{bedrooms} Bedrooms
					</Typography>

					<KlubiqIcons.Bathroom
						sx={{
							color: 'text.primary',
						}}
					/>
					<Typography variant='cardContentText' noWrap={true}>
						{bathrooms} Bathrooms
					</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '0.5rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<KlubiqIcons.FloorPlan
						sx={{
							color: 'text.primary',
						}}
					/>
					<Typography variant='cardContentText' noWrap={true}>
						{sqm} sqm
					</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
				>
					<Typography variant='cardHeader' noWrap={true}>
						{type}: <Typography variant='cardContentText'>{sqm} sqm</Typography>
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
				<Typography variant='cardHeader'>{type}</Typography>
				<Stack direction='row' spacing={2}>
					<Box width={'160px'} height={'100px'}>
						<Avatar alt={title} src={image} sx={CardStyle.rowImage} />
					</Box>
					<Stack pt={1} width={'100%'} spacing={1.5}>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='cardTitle'>{title}</Typography>
							<Chip
								size='small'
								label={status}
								color={status === 'For Sale' ? 'error' : 'success'}
							></Chip>
						</Stack>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='center'
						>
							<KlubiqIcons.Place
								sx={{
									color: 'text.primary',
								}}
							/>
							<Typography variant='cardContentText'>{address}</Typography>
						</Stack>
						<Stack
							direction='row'
							spacing={1}
							justifyContent='flex-start'
							alignItems='center'
						>
							<KlubiqIcons.Bedroom
								sx={{
									color: 'text.primary',
								}}
							/>
							<Typography variant='cardContentText'>
								{bedrooms} Bedrooms
							</Typography>
							<KlubiqIcons.Bathroom
								sx={{
									color: 'text.primary',
								}}
							/>
							<Typography variant='cardContentText'>
								{bathrooms} Bathrooms
							</Typography>
						</Stack>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='cardHeader'>
								{type}:{' '}
								<Typography variant='cardContentText'>{sqm} sqm</Typography>
							</Typography>
							<Typography variant='link'>View Properties</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default PropertyCard;
