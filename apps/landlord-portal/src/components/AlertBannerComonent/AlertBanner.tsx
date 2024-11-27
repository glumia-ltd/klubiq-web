import { Typography, Box, IconButton, Stack } from '@mui/material';
import style from './style';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const bannerTypesStyle = {
	info: style.bannerTypes.info,
	error: style.bannerTypes.error,
	success: style.bannerTypes.success,
};

type BannerType = 'info' | 'error' | 'success';

const AlertBanner: FC<{
	message: string;
	onClose: () => void;
	actions: JSX.Element;
	type?: BannerType;
}> = ({ message, onClose, actions, type = 'info' }) => {
	const bannerStyle = bannerTypesStyle[type] || bannerTypesStyle.info;

	return (
		<Box sx={{ ...bannerStyle, ...style.banner }}>
			<Stack
				direction={'row'}
				spacing={2}
				width={'100%'}
				sx={{ alignItems: 'center', justifyContent: 'space-between' }}
			>
				<Typography variant='body1'>{message}</Typography>
				<div>{actions}</div>
			</Stack>
			<IconButton onClick={onClose} sx={{ color: bannerStyle.color }}>
				<CloseIcon />
			</IconButton>
		</Box>
	);
};
export default AlertBanner;
