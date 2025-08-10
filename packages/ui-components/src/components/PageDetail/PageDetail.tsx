import React, { useState } from 'react';
import {
	Box,
	Paper,
	Stack,
	Typography,
	Chip,
	IconButton,
	Tabs,
	Tab,
	useTheme,
	useMediaQuery,
	Card,
	Divider,
	Link,
} from '@mui/material';
import { Close, MailOutline, Phone, Place } from '@mui/icons-material';
import { DynamicAvatar } from '../DynamicAvatar/DynamicAvatar';
import { InfoCard } from '../InfoCard/InfoCard';
import { DocumentList } from '../DocumentList/DocumentList';
import {
	LeaseStatus,
	PageDetailHeaderData,
	PageDetailProps,
	PageDetailVariant,
} from './types';
import { PageDetailSkeleton } from './PageDetailSkeleton';

const TabPanel = (props: {
	children?: React.ReactNode;
	index: number;
	value: number;
}) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

export const PageDetail: React.FC<PageDetailProps> = ({
	headerData,
	detailSections,
	showTabs = true,
	tabs: customTabs,
	onClose,
	loading = false,
	displayMode = 'modal',
	position = 'right',
	variant,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	if (loading) {
		return (
			<PageDetailSkeleton
				showTabs={showTabs}
				displayMode={displayMode}
				position={position}
			/>
		);
	}

	const detailsContent = (
		<Stack spacing={2}>
			{detailSections?.map((section) => {
				switch (section.type) {
					case 'infoCard':
						return (
							section.items.length > 0 && (
								<InfoCard
									key={section.id}
									title={section.title}
									items={section.items}
									elevation={1}
								/>
							)
						);
					case 'documentList':
						return (
							section.items.length > 0 && (
								<DocumentList
									key={section.id}
									title={section.title}
									items={section.items}
									elevation={1}
								/>
							)
						);
					case 'custom':
						return (
							section.content && (
								<Card elevation={1} key={section.id}>
									{section.content}
								</Card>
							)
						);
					default:
						return null;
				}
			})}
		</Stack>
	);

	const defaultTabs = [
		{ label: 'Details', content: detailsContent },
		{
			label: 'Chat',
			content: (
				<Typography>Chat functionality is not yet implemented.</Typography>
			),
		},
	];
	const getStatusStyle = (status: LeaseStatus | undefined) => {
		switch (status) {
			case 'Active':
				return {
					color: theme.palette.success.main,
					border: `1px solid ${theme.palette.success.main}`,
				};
			case 'In Active':
				return {
					color: theme.palette.secondary.main,
					border: `1px solid ${theme.palette.secondary.main}`,
				};
			case 'Expired':
				return {
					color: theme.palette.error.main,
					border: `1px solid ${theme.palette.error.main}`,
				};
			case 'Terminated':
				return {
					color: theme.palette.error.main,
					border: `1px solid ${theme.palette.error.main}`,
				};
			case 'Archived':
				return {
					color: theme.palette.warning.main,
					border: `1px solid ${theme.palette.warning.main}`,
				};
			case 'Expiring Soon':
				return {
					color: theme.palette.warning.main,
					border: `1px solid ${theme.palette.warning.main}`,
				};
			default:
				return {
					color: theme.palette.primary.main,
					border: `1px solid ${theme.palette.primary.main}`,
				};
		}
	};

	const getStatusColor = (status: LeaseStatus | undefined) => {
		switch (status) {
			case 'Active':
				return 'success';
			case 'In Active':
				return 'info';
			case 'Expired':
				return 'error';
			case 'Terminated':
				return 'error';
			case 'Archived':
				return 'default';
			case 'Expiring Soon':
				return 'warning';
			default:
				return 'primary';
		}
	};

	const tabs = customTabs || defaultTabs;

	const modalStyles = {
		width: isMobile ? '100%' : 400,
		height: '100vh',
		position: 'fixed',
		top: 0,
		[position]: 0,
		zIndex: theme.zIndex.drawer + 1,
		borderRadius: 2,
	};

	const containerStyles = {
		width: '100%',
		height: 'auto',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 2,
	};

	const TenantDetailHeader = (headerData: PageDetailHeaderData) => {
		return (
			<Stack direction='row' spacing={1} alignItems='flex-start'>
				<DynamicAvatar
					items={headerData.avatar}
					showName={headerData.showAvatarNames}
					size={headerData.avatarSize || 'medium'}
				/>
				<Stack
					direction='column'
					justifyContent='space-between'
					flex={1}
					spacing={0.5}
				>
					{headerData.name && (
						<Typography
							variant='h6'
							fontWeight={600}
							sx={{ textTransform: 'capitalize' }}
						>
							{headerData.name}
						</Typography>
					)}
					{headerData.companyName && (
						<Typography variant='h6'>{headerData.companyName}</Typography>
					)}
					{headerData.email && (
						<Stack direction='row' alignItems='center' spacing={1}>
							<MailOutline fontSize='small' />
							<Link href={`mailto:${headerData.email}`} variant='subtitle2' sx={{ wordBreak: 'break-word' }}>
								{headerData.email}
							</Link>
						</Stack>
					)}
					{headerData.phone && (
						<Stack direction='row' alignItems='center' spacing={1}>
							<Phone fontSize='small' />
							<Typography variant='body2'>{headerData.phone}</Typography>
						</Stack>
					)}
				</Stack>
				<Stack
					direction={'column'}
					spacing={1}
					alignItems={'flex-end'}
					justifyContent={'space-between'}
				>
					<Chip
						label={headerData.status}
						color={getStatusColor(
							headerData.status,
						)}
						size='small'
						variant='outlined'
						sx={{
							backgroundColor: 'transparent',
							...getStatusStyle(headerData.status),
						}}
					/>
					{headerData.headerActions && headerData.headerActions.length > 0 && (
						<Stack direction='row' spacing={1}>
							{headerData.headerActions}
						</Stack>
					)}
				</Stack>

				{displayMode === 'modal' && onClose && (
					<IconButton
						onClick={onClose}
						sx={{ position: 'absolute', top: 8, right: 8 }}
					>
						<Close />
					</IconButton>
				)}
			</Stack>
		);
	};

	const LeaseDetailHeader = (headerData: PageDetailHeaderData) => {
		return (
			<Stack
				direction={isMobile ? 'column' : 'row'}
				spacing={isMobile ? 2 : 1}
				justifyContent='space-between'
				alignItems={isMobile ? 'flex-start' : 'center'}
			>
				<Stack
					flex={1}
					direction='column'
					spacing={1}
					alignItems={'flex-start'}
					justifyContent={isMobile ? 'flex-start' : 'space-between'}
				>
					<Chip
						label={headerData.leaseDetailsHeaderData?.propertyType}
						size='small'
					/>
					{headerData.leaseDetailsHeaderData && (
						<Stack
							direction={isMobile ? 'column' : 'row'}
							divider={
								isMobile ? undefined : (
									<Divider orientation='vertical' flexItem />
								)
							}
							spacing={1}
							alignItems={isMobile ? 'flex-start' : 'center'}
						>
							<Typography variant='h4' sx={{ textTransform: 'capitalize' }}>
								{headerData.leaseDetailsHeaderData?.propertyName}
							</Typography>
							<Typography variant='h4' sx={{ textTransform: 'capitalize' }}>
								{headerData.leaseDetailsHeaderData?.unitType}
							</Typography>
						</Stack>
					)}
					{headerData.leaseDetailsHeaderData?.address && (
						<Stack direction='row' spacing={1} alignItems='center'>
							<Place fontSize='small' />
							<Typography>
								{headerData.leaseDetailsHeaderData?.address}
							</Typography>
						</Stack>
					)}
				</Stack>
				<Stack
					direction={isMobile ? 'row' : 'column'}
					justifyContent={'space-between'}
					spacing={isMobile ? 2 : 1}
					alignItems={isMobile ? 'center' : 'flex-end'}
				>
					<Chip
						label={headerData.leaseDetailsHeaderData?.leaseStatus}
						color={getStatusColor(
							headerData.leaseDetailsHeaderData?.leaseStatus,
						)}
						size='small'
						variant='outlined'
						sx={{
							backgroundColor: 'transparent',
							...getStatusStyle(headerData.leaseDetailsHeaderData?.leaseStatus),
						}}
					/>
					<DynamicAvatar
						items={headerData.avatar}
						showName={headerData.showAvatarNames}
						size={headerData.avatarSize || 'medium'}
					/>
				</Stack>

				{displayMode === 'modal' && onClose && (
					<IconButton
						onClick={onClose}
						sx={{ position: 'absolute', top: 8, right: 8 }}
					>
						<Close />
					</IconButton>
				)}
			</Stack>
		);
	};

	// const PropertyDetailHeader = () => {
	// 	return <div>PropertyDetailHeader</div>;
	// };

	const renderHeaderByVariant = (variant: PageDetailVariant) => {
		switch (variant) {
			case 'tenant-detail':
				return <TenantDetailHeader {...headerData} />;
			case 'lease-detail':
				return <LeaseDetailHeader {...headerData} />;
			case 'property-detail':
				return <TenantDetailHeader {...headerData} />;
			default:
				return <TenantDetailHeader {...headerData} />;
		}
	};

	return (
		<Paper
			elevation={displayMode === 'modal' ? 3 : 0}
			sx={{
				...(displayMode === 'modal' ? modalStyles : containerStyles),
				backgroundColor:
					displayMode === 'modal'
						? theme.palette.mode === 'light'
							? theme.palette.grey[50]
							: theme.palette.background.default
						: 'transparent',
				overflow: 'hidden',
			}}
		>
			<Box sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
				<Stack spacing={2}>
					<Card elevation={1}>
						<Box sx={{ p: 2 }}>
							{renderHeaderByVariant(variant)}
							{/* <Stack direction='row' spacing={1} alignItems='flex-start'>
								<DynamicAvatar
									items={headerData.avatar}
									showName={headerData.showAvatarNames}
									size={headerData.avatarSize || 'large'}
								/>
								<Stack flex={1} spacing={0.5}>
									{headerData.name && (
										<Typography
											variant='h6'
											fontWeight={600}
											sx={{ textTransform: 'capitalize' }}
										>
											{headerData.name}
										</Typography>
									)}
									{headerData.companyName && (
										<Typography variant='h6'>
											{headerData.companyName}
										</Typography>
									)}
									{headerData.email && (
										<Stack direction='row' alignItems='center' spacing={1}>
											<MailOutline fontSize='small' />
											<Typography
												variant='body2'
												sx={{ wordBreak: 'break-word' }}
											>
												{headerData.email}
											</Typography>
										</Stack>
									)}
									{headerData.phone && (
										<Stack direction='row' alignItems='center' spacing={1}>
											<Phone fontSize='small' />
											<Typography variant='body2'>
												{headerData.phone}
											</Typography>
										</Stack>
									)}
								</Stack>
								<Chip
									label={headerData.status}
									color={headerData.status === 'Active' ? 'primary' : 'default'}
									size='small'
									sx={{
										backgroundColor: '#e2eaf2',
										color: '#005CFF',
									}}
								/>
								{displayMode === 'modal' && onClose && (
									<IconButton
										onClick={onClose}
										sx={{ position: 'absolute', top: 8, right: 8 }}
									>
										<Close />
									</IconButton>
								)}
							</Stack> */}
						</Box>
						{showTabs && (
							<Box>
								<Tabs
									value={tabValue}
									onChange={handleTabChange}
									variant='fullWidth'
								>
									{tabs.map((tab) => (
										<Tab key={tab.label} label={tab.label} />
									))}
								</Tabs>
							</Box>
						)}
					</Card>

					{showTabs
						? tabs.map((tab, index) => (
								<TabPanel key={tab.label} value={tabValue} index={index}>
									{tab.content}
								</TabPanel>
							))
						: detailsContent}
				</Stack>
			</Box>
		</Paper>
	);
};
