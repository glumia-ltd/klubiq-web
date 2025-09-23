import {
	Box,
	Button,
	Card,
	Chip,
	Drawer,
	IconButton,
	Stack,
	styled,
	Typography,
} from '@mui/material';
import { Cancel, DeleteSweep, NotificationsOff } from '@mui/icons-material';
import { NotificationData } from '../../shared/global-types';
import { motion } from 'framer-motion';
import { getLocaleDateFormat } from '../../helpers/utils';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';

interface NotificationDrawerProps {
	notifications: NotificationData[] | undefined;
	open: boolean;
	onClose: () => void;
	onDeleteAll: () => void;
	onRead: (data: NotificationData) => void;
	onDismiss: (data: NotificationData) => void;
}

export const NotificationDrawer = ({
	notifications,
	open,
	onClose,
	onDeleteAll,
	onRead,
	onDismiss,
}: NotificationDrawerProps) => {
	const { user } = useSelector(getAuthState);
	const { orgSettings } = user;
	const MotionDrawer = motion.create(Drawer);
	const DrawerHeader = styled('div')(() => ({
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		// alignSelf: 'start',
		justifyContent: 'space-between',
	}));
	const drawerStyles = {
		'& .MuiDrawer-paper': {
			maxWidth: '400px',
			width: '400px',
			transition: 'none',
			overflowX: 'hidden',
			willChange: 'transform', // Optimize performance
			backfaceVisibility: 'hidden', // Prevent flickering
			WebkitBackfaceVisibility: 'hidden',
			transform: 'translateZ(0)', // Force GPU acceleration
			WebkitTransform: 'translateZ(0)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: 2,
			backgroundColor: 'background.default',
		},
	};

	return (
		<MotionDrawer
			variant='temporary'
			open={open}
			onClose={onClose}
			anchor='right'
			sx={drawerStyles}
			hideBackdrop={true}
		>
			<DrawerHeader>
				<Typography variant='h4'>Notifications</Typography>
				<Stack direction='row' alignItems='center' gap={1} justifyContent='end'>
					{notifications && notifications.length > 0 && (
						<IconButton size='medium' onClick={onDeleteAll}>
							<DeleteSweep />
						</IconButton>
					)}
					<IconButton size='medium' onClick={onClose}>
						<Cancel />
					</IconButton>
				</Stack>
			</DrawerHeader>
			<Box sx={{ mt: 2, py: 1, flex: 1, width: '100%' }}>
				{notifications && notifications.length > 0 ? (
					notifications.map((notification) => (
						<Card
							variant='outlined'
							key={notification.id}
							sx={{
								p: 2,
								cursor: 'pointer',
								backgroundColor: 'transparent',
								borderColor: 'secondary.light',
								borderRadius: 2,
								mb: 2,
							}}
							onClick={() => onRead(notification)}
						>
							<Stack
								direction='column'
								justifyContent='space-between'
								alignItems='start'
								gap={2}
							>
								<Stack direction='row' gap={1} alignItems='center'>
									{!notification.isRead && (
										<Chip
											color='primary'
											variant='outlined'
											size='small'
											label='New'
										/>
									)}
									<Typography variant='body2'>
										{getLocaleDateFormat(
											orgSettings,
											new Date(notification.createdAt).toISOString(),
											{ dateStyle: 'short', timeStyle: 'short', hour12: true },
										)}
									</Typography>
								</Stack>
								<Stack gap={1} direction='column'>
									<Typography variant='body1'>{notification.title}</Typography>
									<Typography variant='subtitle1'>
										{notification.message}
									</Typography>
								</Stack>

								<Stack direction='row' gap={1}>
									{!notification.type.toLowerCase().includes('deleted') &&
										notification.actionLink && (
											<Button variant='klubiqTextButton'>
												<strong>{notification.actionText}</strong>
											</Button>
										)}
									<Button onClick={() => onDismiss(notification)}>
										Dismiss
									</Button>
								</Stack>
							</Stack>
						</Card>
					))
				) : (
					<Box sx={{ flex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Stack
							direction='column'
							alignItems='center'
							justifyContent='center'
							sx={{ flex: 1, width: '100%' }}
						>
							<NotificationsOff sx={{ fontSize: 40 }} />
							<Typography variant='body1'>
								No notifications at the moment
							</Typography>
						</Stack>
					</Box>
				)}
			</Box>
		</MotionDrawer>
	);
};
