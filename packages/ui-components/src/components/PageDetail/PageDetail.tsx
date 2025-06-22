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
} from '@mui/material';
import { Close, MailOutline, Phone } from '@mui/icons-material';
import { DynamicAvatar } from '../DynamicAvatar/DynamicAvatar';
import { InfoCard } from '../InfoCard/InfoCard';
import { DocumentList } from '../DocumentList/DocumentList';
import { PageDetailProps } from './types';
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
							<InfoCard
								key={section.id}
								title={section.title}
								items={section.items}
								elevation={1}
							/>
						);
					case 'documentList':
						return (
							<DocumentList
								key={section.id}
								title={section.title}
								items={section.items}
								elevation={1}
							/>
						);
					case 'custom':
						return (
							<Card elevation={1} key={section.id}>
								{section.content}
							</Card>
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
							<Stack direction='row' spacing={1} alignItems='flex-start'>
								<DynamicAvatar
									items={[headerData.avatar]}
									showName={false}
									size='large'
								/>
								<Stack flex={1} spacing={0.5}>
									<Typography
										variant='h6'
										fontWeight={600}
										sx={{ textTransform: 'capitalize' }}
									>
										{headerData.name}
									</Typography>
									{headerData.companyName && (
										<Typography variant='h6'>
											{headerData.companyName}
										</Typography>
									)}
									{headerData.email && (
										<Stack direction='row' alignItems='center' spacing={1}>
											<MailOutline fontSize='small' />
											<Typography variant='body2' sx={{ wordBreak: 'break-word' }}>
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
							</Stack>
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
