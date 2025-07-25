import React, { ReactNode } from 'react';
import {
	Card,
	Box,
	Stack,
	Typography,
	useTheme,
	SxProps,
	Theme,
	Skeleton,
} from '@mui/material';

export type ActivityCardVariant = 'cards' | 'alerts' | 'custom';
export type PaletteColor =
	| 'primary'
	| 'secondary'
	| 'error'
	| 'warning'
	| 'info'
	| 'success';

export interface ActivityItem {
	id: string | number;
	title: string;
	subtitle?: string;
	timestamp?: string;
	icon?: ReactNode;
	variant?: PaletteColor;
	content?: ReactNode;
	[key: string]: any; // Allow for additional custom properties
}

export interface ActivityCardProps {
	title?: string | ReactNode;
	subtitle?: string;
	items: ActivityItem[];
	variant?: ActivityCardVariant;
	renderItem?: (item: ActivityItem) => ReactNode;
	viewAllLink?: string;
	onViewAllClick?: () => void;
	maxItems?: number;
	sx?: SxProps<Theme>;
	/** Show skeletons when loading */
	loading?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
	title = 'Recent Activity',
	subtitle,
	items,
	variant = 'cards',
	renderItem,
	viewAllLink,
	onViewAllClick,
	maxItems = 5,
	sx = {},
	loading = false,
}) => {
	const theme = useTheme();

	const cardStyles = {
		width: '100%',
		p: { xs: 2, sm: 3 },
		borderRadius: 2,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		...sx,
	};

	if (loading) {
		return (
			<Card sx={cardStyles}>
				<Stack spacing={3}>
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						spacing={2}
					>
						<Box>
							<Skeleton variant='text' width={120} height={32} />
							<Skeleton variant='text' width={80} height={20} />
						</Box>
						<Skeleton variant='rectangular' width={60} height={24} />
					</Stack>
					<Box>
						{[1, 2, 3].map((i) => (
							<Card
								key={i}
								elevation={0}
								sx={{
									p: 2,
									mb: 2,
									borderRadius: 2,
									backgroundColor: theme.palette.background.default,
								}}
							>
								<Stack direction='row' spacing={2} alignItems='center'>
									<Skeleton variant='circular' width={40} height={40} />
									<Box sx={{ flex: 1 }}>
										<Skeleton variant='text' width='70%' height={24} />
										<Skeleton variant='text' width='50%' height={18} />
									</Box>
									<Skeleton variant='text' width={40} height={16} />
								</Stack>
							</Card>
						))}
					</Box>
				</Stack>
			</Card>
		);
	}

	const renderDefaultCard = (item: ActivityItem) => (
		<Card
			key={item.id}
			elevation={0}
			sx={{
				p: 2,
				mb: 2,
				borderRadius: 2,
				backgroundColor: theme.palette.background.default,
				cursor: 'pointer',
				transition: 'all 0.2s ease-in-out',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: theme.shadows[2],
				},
				'&:last-child': {
					mb: 0,
				},
			}}
		>
			<Stack direction='row' spacing={2} alignItems='center'>
				{item.icon && (
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: theme.palette.primary.light,
							color: theme.palette.primary.main,
						}}
					>
						{item.icon}
					</Box>
				)}
				<Box sx={{ flex: 1 }}>
					<Typography variant='subtitle1' fontWeight={600}>
						{item.title}
					</Typography>
					{item.subtitle && (
						<Typography variant='body2' color='text.secondary'>
							{item.subtitle}
						</Typography>
					)}
				</Box>
				{item.timestamp && (
					<Typography variant='caption' color='text.secondary'>
						{item.timestamp}
					</Typography>
				)}
			</Stack>
		</Card>
	);

	const renderDefaultAlert = (item: ActivityItem) => (
		<Box
			key={item.id}
			sx={{
				p: 2,
				mb: 2,
				borderRadius: 1,
				backgroundColor:
					theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
				borderLeft: `4px solid ${theme.palette[item.variant || 'primary'].main}`,
				'&:last-child': {
					mb: 0,
				},
			}}
		>
			<Stack direction='row' spacing={2} alignItems='center'>
				{item.icon && (
					<Box sx={{ color: theme.palette[item.variant || 'primary'].main }}>
						{item.icon}
					</Box>
				)}
				<Box sx={{ flex: 1 }}>
					<Typography variant='body1' fontWeight={500}>
						{item.title}
					</Typography>
					{item.subtitle && (
						<Typography variant='body2' color='text.secondary'>
							{item.subtitle}
						</Typography>
					)}
				</Box>
				{item.timestamp && (
					<Typography variant='caption' color='text.secondary'>
						{item.timestamp}
					</Typography>
				)}
			</Stack>
		</Box>
	);

	const renderContent = () => {
		if (renderItem) {
			return items.slice(0, maxItems).map((item) => renderItem(item));
		}

		switch (variant) {
			case 'alerts':
				return items.slice(0, maxItems).map(renderDefaultAlert);
			case 'custom':
				return items.slice(0, maxItems).map((item) => item.content || null);
			default:
				return items.slice(0, maxItems).map(renderDefaultCard);
		}
	};

	return (
		<Card sx={cardStyles}>
			<Stack spacing={3}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					spacing={2}
				>
					<Box>
						{typeof title === 'string' ? (
							<Typography variant='h4' fontWeight={600} gutterBottom={!!subtitle}>
								{title}
							</Typography>
						) : (
							title
						)}
						{subtitle && (
							<Typography variant='body2' color='text.secondary'>
								{subtitle}
							</Typography>
						)}
					</Box>
					{(viewAllLink || onViewAllClick) && items.length > 0 && (
						<Typography
							variant='body2'
							color='primary'
							sx={{
								cursor: 'pointer',
								'&:hover': { textDecoration: 'underline' },
							}}
							onClick={onViewAllClick}
						>
							View All
						</Typography>
					)}
				</Stack>
				{items.length > 0 ? (
					<Box>{renderContent()}</Box>
				) : (
					<Box>
						{' '}
						{typeof title === 'string' ? (
							<Typography variant='body2' color='text.secondary'>
								No {title.toLowerCase()} found
							</Typography>
						) : (
							title
						)}
					</Box>
				)}
			</Stack>
		</Card>
	);
};
