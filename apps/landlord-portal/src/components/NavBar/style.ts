import { alpha, Theme } from '@mui/material';

export const styles = (isSmallScreen: boolean, theme?: Theme) => {
	return {
		toolBarSx: {
			justifyContent: 'space-between',
			padding: '.5rem',
		},
		mainContainer: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		leftGridContainer: {
			width: {
				xs: '30%',
				sm: '50%',
				md: '50%',
				lg: '50%',
				xl: '50%',
			},
			alignItems: 'center',
			display: {
				xs: 'flex',
				sm: 'flex',
				md: 'flex',
				lg: 'flex',
				xl: 'flex',
			},
		},
		rightGridContainer: {
			width: {
				xs: '70%',
				sm: '50%',
				md: '50%',
				lg: '50%',
				xl: '50%',
			},
			cursor: 'pointer',
			alignItems: 'center',
			justifyContent: {
				lg: 'flex-end',
				md: 'flex-end',
				sm: 'flex-end',
				xs: 'flex-end',
			},
			display: {
				xs: 'flex',
				sm: 'flex',
				md: 'flex',
				lg: 'flex',
				xl: 'flex',
			},
		},
		appSectionTitle: {
			textTransform: 'capitalize',
			fontWeight: '600',
			fontSize: '30px',
			// paddingLeft: isSmallScreen ? 1 : 4,

		},
		searchInput: {
			width: { xs: '50px', sm: '250px', md: '320px' },
			// height: '45px',
			padding: '0 4 0 4',
			border: { xs: 'none' },
			borderRadius: '10px',
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					border: isSmallScreen ? 'none' : undefined,
				},
			},
		},
		searchAdornment: {
			height: '45px',
		},
		notificationIconButton: {
			backgroundColor: 'transparent',
			padding: '1rem',
			borderRadius: '10px',
			marginRight: '1rem',
		},
		notificationIcon: {
			color: 'notification.light',
			width: '28px',
			height: '28px',
		},
		nameRoleText: {
			fontSize: '12px',
			fontWeight: '700',
			display: { xs: 'none', sm: 'none', md: 'flex' },
		},
		profilePic: {
			width: '40px',
			height: '40px',
			marginRight: '1rem',
			borderRadius: '90px',
		},
		titleBox: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		dialogContent: { alignItems: 'center', justifyContent: 'space-between' },
		listItemButton: {
			bgcolor: alpha(
				theme?.palette.secondary.light || 'rgba(255, 255, 255, 0)',
				0.2,
			),
			mb: 1,
			borderRadius: 1,
		},
		badge: {
			top: 20,
			left: -7,
			width: '1%',
			bgcolor: theme?.palette.primary.main || 'rgba(255, 255, 255, 0)',
		},
		secondaryText: { display: 'block', color: 'text.primary' },
		actionLink: {
			color: 'primary.main',
		},
		secondaryAction: {
			alignItems: 'flex-end',
			justifyContent: 'center',
		},
		secondaryActionText: { display: 'block', color: 'text.primary' },
		avatar: {
			bgcolor: alpha(
				theme?.palette.primary.main || 'rgba(255, 255, 255, 0)',
				0.9,
			),
			ml: 0.5,
			width: '30px',
			height: '30px',
		},
		seeMoreLink: {
			'&:hover': { backgroundColor: theme?.palette.mode === 'light' ? 'secondary.main' : 'secondary.light' },

		},
		listItem: {
			alignItems: 'start',
			'&:hover': { backgroundColor: theme?.palette.mode === 'light' ? 'secondary.main' : 'secondary.light' },
		},
	};
};
