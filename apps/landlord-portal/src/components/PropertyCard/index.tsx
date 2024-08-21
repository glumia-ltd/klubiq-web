import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Stack,
	CardActions,
	Typography,
	Box,
	Chip,
	Avatar,
} from '@mui/material';
import * as KlubiqIcons from '../Icons/CustomIcons';
import CardStyle from './CardStyle';
import { PropertyDataType } from '../../shared/type';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
	propertyData: PropertyDataType;
	layout: 'row' | 'column';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	propertyData,
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
					{propertyData?.type.name}
				</Typography>
				<CardMedia
					component='img'
					sx={{
						marginTop: '1rem',
						height: '15rem',
						objectFit: 'cover',
						borderRadius: '0.5rem',
					}}
					image={propertyData?.mainPhoto?.url}
					alt={propertyData?.name}
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
						{propertyData?.name}
					</Typography>
					<Chip
						label={propertyData?.purpose.name}
						variant={
							propertyData?.purpose.name?.toLowerCase() === 'rent'
								? 'rent'
								: 'sale'
						}
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
						{`${propertyData?.address?.addressLine1} ${propertyData?.address?.addressLine2}, ${propertyData?.address?.city}, ${propertyData?.address?.state}`}
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
							opacity: `${!propertyData?.bedroom ? 0 : 1}`,
						}}
					/>
					<Typography
						variant='cardContentText'
						noWrap={true}
						sx={{
							opacity: `${!propertyData?.bedroom ? 0 : 1}`,
						}}
					>
						{propertyData?.bedroom} Bedrooms
					</Typography>

					<KlubiqIcons.Bathroom
						sx={{
							color: 'text.primary',
							opacity: `${!propertyData?.bathroom ? 0 : 1}`,
						}}
					/>
					<Typography
						variant='cardContentText'
						noWrap={true}
						sx={{ opacity: `${!propertyData?.bathroom ? 0 : 1}` }}
					>
						{propertyData?.bathroom} Bathrooms
					</Typography>

					<KlubiqIcons.Bathroom
						sx={{
							color: 'text.primary',
							opacity: `${!propertyData?.toilet ? 0 : 1}`,
						}}
					/>

					<Typography
						variant='cardContentText'
						noWrap={true}
						sx={{ opacity: `${!propertyData?.toilet ? 0 : 1}` }}
					>
						{propertyData?.toilet} Toilets
					</Typography>
				</Stack>
				{
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

						{
							<Typography variant='cardContentText' noWrap={true}>
								{propertyData?.area?.value
									? `${propertyData?.area?.value} ${propertyData?.area?.unit}`
									: 'Multi Unit'}
							</Typography>
						}
					</Stack>
				}
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
				>
					<Typography variant='cardHeader' noWrap={true}>
						{propertyData?.unitCount > 1 ? 'Units' : 'Unit'}:{' '}
						<Typography variant='cardContentText'>
							{propertyData?.unitCount}
						</Typography>
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
				onClick={handleViewProperty}
			>
				<Typography variant='link'>View Properties</Typography>
			</CardActions>
		</Card>
	) : (
		<Card sx={CardStyle.cardContainerRow}>
			<Stack
				sx={{
					padding: '1rem',
				}}
				spacing={1}
			>
				<Typography variant='cardHeader'>{propertyData?.type?.name}</Typography>
				<Stack direction='row' spacing={2}>
					<Box width={'160px'} height={'100px'}>
						<Avatar
							alt={propertyData?.name}
							src={propertyData?.mainPhoto?.url}
							sx={CardStyle.rowImage}
						/>
					</Box>
					<Stack pt={1} width={'100%'} spacing={1.5}>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='cardTitle'>{propertyData?.name}</Typography>
							<Chip
								size='small'
								label={propertyData?.purpose.name}
								variant={
									propertyData?.purpose.name?.toLowerCase() === 'rent'
										? 'rent'
										: 'sale'
								}
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
							<Typography variant='cardContentText'>{`${propertyData?.address?.addressLine1} ${propertyData?.address?.addressLine2}, ${propertyData?.address?.city}, ${propertyData?.address?.state}`}</Typography>
						</Stack>
						<Stack
							direction='row'
							spacing={1}
							justifyContent='flex-start'
							alignItems='center'
						>
							{propertyData?.bedroom ? (
								<>
									<KlubiqIcons.Bedroom
										sx={{
											color: 'text.primary',
										}}
									/>
									<Typography variant='cardContentText'>
										{propertyData?.bedroom} Bedrooms
									</Typography>
								</>
							) : null}

							{propertyData?.bathroom ? (
								<>
									<KlubiqIcons.Bathroom
										sx={{
											color: 'text.primary',
										}}
									/>
									<Typography variant='cardContentText'>
										{propertyData?.bathroom} Bathrooms
									</Typography>
								</>
							) : null}

							{propertyData?.toilet ? (
								<>
									<KlubiqIcons.Bathroom
										sx={{
											color: 'text.primary',
										}}
									/>

									<Typography variant='cardContentText'>
										{propertyData?.toilet} Toilets
									</Typography>
								</>
							) : null}

							<KlubiqIcons.FloorPlan
								sx={{
									color: 'text.primary',
								}}
							/>
							<Typography variant='cardContentText'>
								{propertyData?.area?.value
									? `${propertyData?.area?.value} ${propertyData?.area?.unit}`
									: 'Multi Unit'}
							</Typography>
						</Stack>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Typography variant='cardHeader'>
								{propertyData?.unitCount > 1 ? 'Units' : 'Unit'}:{' '}
								<Typography variant='cardContentText'>
									{' '}
									{propertyData?.unitCount}
								</Typography>
							</Typography>
							<Typography variant='link'>View Properties</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default PropertyCard;
