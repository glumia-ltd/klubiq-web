import React, { ReactNode } from 'react';
import {
	Card,
	Box,
	Stack,
	Typography,
	Chip,
	useTheme,
	SxProps,
	Theme,
	Skeleton,
} from '@mui/material';

export type DashboardDataCardVariant =
	| 'default'
	| 'gradient'
	| 'primary'
	| 'secondary'
	| 'custom';

export interface DashboardDataCardProps {
	icon?: ReactNode;
	amount: string | number;
	label: string;
	badgeText?: string;
	badgeIcon?: React.ReactElement;
    chipVariant?: 'upTrend' | 'downTrend' | 'neutralTrend';
	variant?: DashboardDataCardVariant;
	backgroundColor?: string;
	children?: ReactNode;
	sx?: SxProps<Theme>;
	/** Show skeletons when loading */
	loading?: boolean;
    caption?: string;
}

const getCardStyles = (
	variant: DashboardDataCardVariant,
	theme: Theme,
): SxProps<Theme> | any => {
	switch (variant) {
		case 'gradient':
			return {
				background:
					'linear-gradient(135deg, primary.main 0%, primary.light 100%)',
				color: '#fff',
			};
		case 'primary':
			return {
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
			};
		case 'secondary':
			return {
				backgroundColor: theme.palette.secondary.main,
				color: theme.palette.secondary.contrastText,
			};
		// case 'custom':
		// 	return {
		// 		backgroundColor: backgroundColor || theme.palette.background.paper,
		// 		color: theme.palette.getContrastText(
		// 			backgroundColor || theme.palette.background.paper,
		// 		),
		// 	};
		default:
			return {
				backgroundColor: theme.palette,
				color: theme.palette,
			};
	}
};

export const DashboardDataCard: React.FC<DashboardDataCardProps> = ({
	icon,
	amount,
	label,
	badgeText,
	variant = 'default',
	badgeIcon,
	chipVariant,
	children,
	sx = {},
	loading = false,
    caption,
}) => {
	const theme = useTheme();
	// Merge all styles into a single object
	const cardStyles = {
		borderRadius: 3,
		p: 3,
		minWidth: 0,
		width: '100%',
		maxWidth: {
            xs: '100%',
            sm: 'calc(50% - 8px)',
            md: 'calc(33.333% - 10.667px)',
        },
        maxHeight: 170,
		...getCardStyles(variant, theme),
		...(typeof sx === 'object' ? sx : {}),
	};
	if (loading) {
		return (
			<Card elevation={0} sx={cardStyles}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='flex-start'
					spacing={2}
				>
					<Skeleton variant='text' width={40} height={20} />
					<Skeleton variant='text' width={40} height={20} />
				</Stack>
				{variant === 'custom' && (
					<Box mt={2} mb={0.5}>
						<Skeleton variant='rectangular' width='90%' height={48} />
					</Box>
				)}
				{variant !== 'custom' && (
					<Skeleton variant='text' width={50} height={20} />
				)}
				<Box mt={2}>
					<Skeleton variant='text' width={50} height={20} />
				</Box>
			</Card>
		);
	}
	return (
		<Card elevation={0} sx={cardStyles}>
			<Stack
				direction={'column'}
				justifyContent={'space-between'}
				alignItems={'flex-start'}
				spacing={2}
                width={'100%'}
                height={'100%'}
			>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
                    width={'100%'}
				>
					<Typography variant='subtitle2'>{label}</Typography>
					{variant === 'custom' && (
						<Typography variant='dashboardTypography'>{amount}</Typography>
					)}
				</Stack>
				{variant !== 'custom' && (
					<Stack
						direction={'row'}
						alignItems={'center'}
						spacing={1}
                        width={'100%'}
                        justifyContent={'flex-start'}
					>
						{icon && <Box>{icon}</Box>}
						<Typography variant='dashboardTypography'>{amount}</Typography>
					</Stack>
				)}
				{variant === 'custom' && children}
                <Stack direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                    {badgeText && (
                        <Chip 
                            label={badgeText} 
                            size='small' 
                            icon={badgeIcon || undefined} 
                            variant={chipVariant}
                            sx={{height: 25, alignSelf: 'flex-start'}} 
                        />
                    )}
                    {caption && <Typography variant='caption'>{caption}</Typography>}
                </Stack>
			</Stack>
		</Card>
	);
};

export default DashboardDataCard;
