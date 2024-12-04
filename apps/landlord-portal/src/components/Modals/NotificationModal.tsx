// NotificationPopup.tsx
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Typography,
	IconButton,
	List,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Divider,
	Button,
	Stack,
	Card,
	useTheme,
	Badge,
	ListItemButton,
	Menu,
	MenuItem,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GroupedNotifications } from '../../shared/global-types';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CampaignIcon from '@mui/icons-material/Campaign';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useRef, useState } from 'react';
import { styles } from './style';
import { menuItem } from '../Shared/CustomMenuList';
import {
	useDeleteNotificationsMutation,
	useReadNotificationsMutation,
} from '../../store/NotificationStore/NotificationApiSlice';
import {
	DeleteNotificationType,
	ReadNotificationType,
} from '../../store/NotificationStore/NotificationType';
interface NotificationModalProps {
	open: boolean;
	onClose: () => void;
	notifications: GroupedNotifications[];
}

const NotificationModal = ({
	open,
	onClose,
	notifications,
}: NotificationModalProps) => {
	const theme = useTheme();
	const [openPopper, setOpenPopper] = useState<boolean>(false);
	const [currentAnchorEl, setCurrentAnchorEl] =
		useState<HTMLButtonElement | null>(null);
	const anchorRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
	const [readNotifications] = useReadNotificationsMutation();
	const [deleteNotifications] = useDeleteNotificationsMutation();
	const handlePopperToggle = (index: number) => {
		setCurrentAnchorEl(anchorRefs.current[index] ?? null);
		setOpenPopper((prevOpen) => !prevOpen);
	};
	const notificationMenu: menuItem[] = [
		{
			label: 'Mark as read',
			onClick: (id) => {
				handleReadNotifications(id);
				setOpenPopper(false);
			},
			icon: <DoneAllIcon sx={{ color: 'text.primary' }} />,
		},
		{
			label: 'Delete',
			onClick: (id) => {
				handleDeleteNotifications(id);
				setOpenPopper(false);
			},
			icon: <DeleteIcon sx={{ color: 'text.primary' }} />,
		},
	];
	const handleReadNotifications = async (id?: string) => {
		const ids = id
			? [id]
			: notifications.flatMap((group) =>
					group.notifications.map((notification) => notification.id),
				);
		const readPayload: ReadNotificationType = {
			notificationIds: ids,
			isRead: true,
			isDelivered: false,
		};
		await readNotifications(readPayload).unwrap();
	};

	const handleDeleteNotifications = async (id?: string) => {
		const ids = id
			? [id]
			: notifications.flatMap((group) =>
					group.notifications.map((notification) => notification.id),
				);
		const deletePayload: DeleteNotificationType = {
			notificationIds: ids,
		};
		await deleteNotifications(deletePayload).unwrap();
	};
	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>
				<Box sx={styles(theme).titleBox}>
					<Typography variant='h6' fontSize={'1.75rem'}>
						Notification
					</Typography>
					<IconButton size='medium' onClick={onClose}>
						<CancelIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<Divider color={'primary.light'} />
			<DialogContent>
				{notifications.map((section, index) => (
					<Box key={index}>
						<Stack direction={'row'} sx={styles(theme).dialogContent}>
							<Typography variant='subtitle2' sx={{ mb: 1 }}>
								{section.period}
							</Typography>
							{index === 0 && (
								<Button
									startIcon={<DoneAllIcon />}
									variant='text'
									sx={{ color: 'primary.light' }}
									size='small'
									onClick={() => handleReadNotifications()}
								>
									Mark all as read
								</Button>
							)}
						</Stack>

						<List sx={{ width: '100%' }}>
							{section.notifications.map((item, idx) => (
								<Card key={idx}>
									<ListItemButton
										alignItems='center'
										sx={styles(theme).listItemButton}
									>
										<ListItemAvatar>
											<Stack>
												<Badge
													color='info'
													variant='dot'
													invisible={item.isRead}
													sx={styles(theme).badge}
												></Badge>
												<Avatar sx={styles(theme).avatar}>
													{item.isAnnouncement ? (
														<CampaignIcon color='secondary' />
													) : (
														<NotificationsIcon color='secondary' />
													)}
												</Avatar>
											</Stack>
										</ListItemAvatar>
										<ListItemText
											primary={item.title}
											primaryTypographyProps={{
												color: 'text.primary',
												fontWeight: item.isRead ? 'normal' : 'bold',
											}}
											secondary={
												<React.Fragment>
													{item.message}
													{item.actionLink && (
														<Button sx={styles(theme).actionLink}>
															view details
														</Button>
													)}
												</React.Fragment>
											}
											secondaryTypographyProps={{
												color: 'text.secondary',
												fontWeight: 'normal',
											}}
										/>
										<ListItemSecondaryAction>
											<Stack
												direction={'column'}
												sx={styles(theme).secondaryAction}
											>
												<Typography
													variant='caption'
													sx={styles(theme).secondaryActionText}
												>
													{item.time}
												</Typography>
												<IconButton
													edge='end'
													ref={(el) => (anchorRefs.current[idx] = el)}
													onClick={() => handlePopperToggle(idx)}
												>
													<MoreHorizIcon />
												</IconButton>
												<Menu
													open={
														openPopper &&
														currentAnchorEl === anchorRefs.current[idx]
													}
													anchorEl={currentAnchorEl}
													onClose={() => setOpenPopper(false)}
												>
													{notificationMenu.map((menu, index) => (
														<MenuItem
															key={index}
															onClick={() =>
																menu.onClick && menu.onClick(item.id)
															}
														>
															{menu.icon}
															<Typography ml={1} variant='body2'>
																{menu.label}
															</Typography>
														</MenuItem>
													))}
												</Menu>
											</Stack>
										</ListItemSecondaryAction>
									</ListItemButton>
									{idx < section.notifications.length - 1 && <Divider />}
								</Card>
							))}
						</List>
						<Stack mt={2} sx={{ alignItems: 'center' }}>
							{section.notifications.length > 0 ? (
								<Typography variant='caption'>
									Showing notifications from the last 14 days
								</Typography>
							) : (
								<Typography variant='caption'>
									No notifications found
								</Typography>
							)}
						</Stack>
					</Box>
				))}
			</DialogContent>
		</Dialog>
	);
};

export default NotificationModal;
