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
} from '@mui/material';
import * as KlubiqIcons from '../Icons/CustomIcons';
import CardStyle from './CardStyle';
import { PropertyDataType } from '../../shared/type';
import { useNavigate } from 'react-router-dom';
import defaultPropertyImage from '../../assets/images/defaultPropertyImage.png';

interface PropertyCardProps {
	propertyData: PropertyDataType;
	layout: 'row' | 'column';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	propertyData,
	layout,
}) => {
	const navigate = useNavigate();

	const handleViewProperty = (uuid: number | string) => {
		navigate(`/properties/${uuid}`);
	};

	const getFullAddress = () => {
		return `${propertyData?.address?.addressLine1} ${propertyData?.address?.addressLine2 || ''}, ${propertyData?.address?.city}, ${propertyData?.address?.state}`;
	};
	const getPropertyComponentText = (text: string, count: number) => {
		return `${count} ${text}${count > 1 ? 's' : ''}`;
	};

	return layout === 'column' ? (
		<Card sx={CardStyle.cardContainerColumn}>
			<CardContent sx={{ padding: '1.5rem 1rem' }}>
				<Typography variant='cardHeader' noWrap={true}>
					{propertyData?.type?.name || 'Apartment'}
				</Typography>
				<CardMedia
					component='img'
					sx={{
						marginTop: '1rem',
						height: '15rem',
						objectFit: 'cover',
						borderRadius: '0.5rem',
					}}
					image={propertyData?.mainImage?.url || defaultPropertyImage}
					alt={propertyData?.name}
				/>
				<Stack
					sx={{ paddingTop: '1rem' }}
					direction='row'
					spacing={2}
					justifyContent='space-between'
				>
					<Typography variant='cardTitle' noWrap={true}>
						{propertyData?.name}
					</Typography>
					<Chip
						label={propertyData?.purpose?.name || 'sale'}
						variant={
							!propertyData.isArchived
								? propertyData?.purpose?.name?.toLowerCase() === 'rent'
									? 'rent'
									: 'sale'
								: 'archived'
						}
					></Chip>
				</Stack>
				<Stack
					sx={{ paddingTop: '0.875rem' }}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<KlubiqIcons.Place sx={{ color: 'text.primary' }} />
					<Typography variant='cardContentText' noWrap={true}>
						{getFullAddress()}
					</Typography>
				</Stack>
				<Stack
					sx={{ paddingTop: '0.5rem' }}
					direction='row'
					// gap={3}
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					{propertyData?.bedrooms > 0 && (
						<>
							<KlubiqIcons.Bedroom sx={{ color: 'text.primary' }} />
							{
								<Typography variant='cardContentText' noWrap={true}>
									{getPropertyComponentText('Bedroom', propertyData?.bedrooms)}
								</Typography>
							}
						</>
					)}
					{propertyData?.rooms > 0 && (
						<>
							<KlubiqIcons.Bedroom sx={{ color: 'text.primary' }} />
							<Typography variant='cardContentText' noWrap={true}>
								{getPropertyComponentText('Room', Number(propertyData?.rooms))}
							</Typography>
						</>
					)}
					{propertyData?.offices > 0 && (
						<>
							<KlubiqIcons.EmojiOneBuildingIcon
								sx={{ color: 'text.primary', height: '15px' }}
							/>
							<Typography variant='cardContentText' noWrap={true}>
								{getPropertyComponentText(
									'Office',
									Number(propertyData?.offices),
								)}
							</Typography>
						</>
					)}

					{propertyData?.bathrooms > 0 && (
						<>
							<KlubiqIcons.ShowerIcon
								sx={{ color: 'text.primary', height: '16px' }}
							/>
							<Typography variant='cardContentText' noWrap={true}>
								{getPropertyComponentText(
									'Bathroom',
									Number(propertyData?.bathrooms),
								)}
							</Typography>
						</>
					)}

					{propertyData?.toilets > 0 && (
						<>
							<KlubiqIcons.Bathroom sx={{ color: 'text.primary' }} />
							<Typography variant='cardContentText' noWrap={true}>
								{getPropertyComponentText(
									'Toilet',
									Number(propertyData?.toilets),
								)}
							</Typography>
						</>
					)}
				</Stack>

				<Stack
					sx={{ paddingTop: '0.5rem' }}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<KlubiqIcons.FloorPlan sx={{ color: 'text.primary' }} />

					{
						<Typography variant='cardContentText' noWrap={true}>
							{propertyData?.area?.value
								? `${propertyData?.area?.value} ${propertyData?.area?.unit}`
								: `${propertyData?.unitCount} unit${propertyData?.unitCount > 1 ? 's' : ''}`}
						</Typography>
					}
				</Stack>

				<Stack sx={{ paddingTop: '1rem' }} direction='row' spacing={1}>
					<Typography variant='cardHeader' noWrap={true}>
						{propertyData?.isMultiUnit ? 'Multi-Unit' : 'Single-Unit'}
						{/* <Typography variant='cardContentText'>
							{propertyData?.unitCount}
						</Typography> */}
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
				onClick={() => handleViewProperty(propertyData?.uuid)}
			>
				<Typography variant='link'>View Property</Typography>
			</CardActions>
		</Card>
	) : (
		<Card sx={CardStyle.cardContainerRow}>
			<Stack sx={{ padding: '1rem' }} spacing={1}>
				<Typography variant='cardHeader'>{propertyData?.type?.name}</Typography>
				<Stack direction='row' spacing={2}>
					<Box width={'160px'} height={'100px'}>
						<CardMedia
							component='img'
							alt={propertyData?.name}
							image={propertyData?.mainImage?.url || defaultPropertyImage}
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
							<KlubiqIcons.Place sx={{ color: 'text.primary' }} />
							<Typography variant='cardContentText'>
								{getFullAddress()}
							</Typography>
						</Stack>
						<Stack
							direction='row'
							spacing={1}
							justifyContent='flex-start'
							alignItems='center'
						>
							{propertyData?.bedrooms > 0 && (
								<>
									<KlubiqIcons.Bedroom sx={{ color: 'text.primary' }} />
									<Typography variant='cardContentText'>
										{getPropertyComponentText(
											'Bedroom',
											Number(propertyData?.bedrooms),
										)}
									</Typography>
								</>
							)}
							{propertyData?.offices > 0 && (
								<>
									<KlubiqIcons.EmojiOneBuildingIcon
										sx={{ color: 'text.primary' }}
									/>
									<Typography variant='cardContentText'>
										{getPropertyComponentText(
											'Office',
											Number(propertyData?.offices),
										)}
									</Typography>
								</>
							)}
							{propertyData?.rooms > 0 && (
								<>
									<KlubiqIcons.Bedroom sx={{ color: 'text.primary' }} />
									<Typography variant='cardContentText'>
										{getPropertyComponentText(
											'Room',
											Number(propertyData?.rooms),
										)}
									</Typography>
								</>
							)}

							{propertyData?.bathrooms > 0 && (
								<>
									<KlubiqIcons.Bathroom sx={{ color: 'text.primary' }} />
									<Typography variant='cardContentText'>
										{getPropertyComponentText(
											'Bathroom',
											Number(propertyData?.bathrooms),
										)}
									</Typography>
								</>
							)}

							{propertyData?.toilets > 0 && (
								<>
									<KlubiqIcons.Bathroom sx={{ color: 'text.primary' }} />

									<Typography variant='cardContentText'>
										{getPropertyComponentText(
											'Toilet',
											Number(propertyData?.toilets),
										)}
									</Typography>
								</>
							)}

							<KlubiqIcons.FloorPlan sx={{ color: 'text.primary' }} />
							<Typography variant='cardContentText'>
								{propertyData?.area?.value
									? `${propertyData?.area?.value} ${propertyData?.area?.unit}`
									: `${propertyData?.unitCount} unit${propertyData?.unitCount > 1 ? 's' : ''}`}
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
							<Typography
								onClick={() => handleViewProperty(propertyData?.uuid)}
								variant='link'
							>
								View Property
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default PropertyCard;
