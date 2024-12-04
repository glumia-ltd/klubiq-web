import { Theme } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { alpha } from '@mui/system';

export const styles = (theme: Theme) => {
	return {
		titleBox: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		dialogContent: { alignItems: 'center', justifyContent: 'space-between' },
		listItemButton: {
			bgcolor: alpha(theme.palette.secondary.light, 0.2),
			mb: 1,
			borderRadius: 1,
		},
		badge: {
			top: 20,
			left: -7,
			width: '1%',
			bgcolor: theme.palette.primary.main,
		},
		secondaryText: { display: 'block', color: 'text.primary' },
		actionLink: {
			color: 'primary.main',
			mt: 1,
		},
		secondaryAction: {
			alignItems: 'flex-end',
			justifyContent: 'center',
		},
		secondaryActionText: { display: 'block', color: 'text.primary' },
		avatar: {
			bgcolor: alpha(theme.palette.primary.main, 0.9),
			ml: 0.5,
		},
	};
};
