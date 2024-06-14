// NotificationPopup.tsx
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Divider,
	Button,
	Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const notifications = [
	{
		date: 'Today',
		items: [
			{
				status: 'success',
				title: 'Rent payment successful',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '45m',
				actionText: 'View Invoice',
				avatar: 'https://via.placeholder.com/40',
			},
			{
				status: 'success',
				title: 'Rent payment successful',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '45m',
				actionText: 'View Invoice',
				avatar: 'https://via.placeholder.com/40',
			},
			{
				status: 'success',
				title: 'Rent payment successful',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '45m',
				actionText: 'View Invoice',
				avatar: 'https://via.placeholder.com/40',
			},
		],
	},
	{
		date: 'Yesterday',
		items: [
			{
				status: 'info',
				title: 'New inspection assigned',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '20h',
				actionText: '',
				avatar: 'https://via.placeholder.com/40',
			},
			{
				status: 'error',
				title: 'Rent payment unsuccessful',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '10h',
				actionText: 'View payment info',
				avatar: 'https://via.placeholder.com/40',
			},
			{
				status: 'info',
				title: 'Maintenance request',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '23h',
				actionText: '',
				avatar: 'https://via.placeholder.com/40',
			},
		],
	},
	{
		date: 'Last 7 days',
		items: [
			{
				status: 'success',
				title: 'Rent payment successful',
				description: 'Apt 1011 Mayfairs Gardens',
				time: '45m',
				actionText: 'View Invoice',
				avatar: 'https://via.placeholder.com/40',
			},
		],
	},
];

interface NotificationModalProps {
	open: boolean;
	onClose: () => void;
}
const NotificationModal = ({ open, onClose }: NotificationModalProps) => {
	// const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant='h6'>Notification</Typography>
					<IconButton size='small' onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent dividers>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
					<Button variant='text' size='small'>
						Mark all as read
					</Button>
				</Box>
				{notifications.map((section, index) => (
					<Box key={index}>
						<Typography variant='subtitle2' sx={{ mb: 1 }}>
							{section.date}
						</Typography>
						<List dense>
							{section.items.map((item, idx) => (
								<Box key={idx}>
									<ListItem
										alignItems='flex-start'
										sx={{
											bgcolor:
												item.status === 'success'
													? 'rgba(33, 150, 243, 0.1)'
													: 'inherit',
											mb: 1,
											borderRadius: 1,
										}}
									>
										<ListItemAvatar>
											<Avatar src={item.avatar} />
										</ListItemAvatar>
										<ListItemText
											primary={
												<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
													{item.title}
												</Typography>
											}
											secondary={
												<>
													<Typography
														variant='body2'
														sx={{ display: 'block', color: 'text.secondary' }}
													>
														{item.description}
													</Typography>
													<Typography
														variant='caption'
														sx={{ display: 'block', color: 'text.secondary' }}
													>
														{item.time}
													</Typography>
													{item.actionText && (
														<Typography
															variant='body2'
															sx={{
																color:
																	item.status === 'error'
																		? 'error.main'
																		: 'primary.main',
																mt: 1,
															}}
														>
															{item.actionText}
														</Typography>
													)}
												</>
											}
										/>
										<ListItemSecondaryAction>
											<Tooltip title='More options'>
												<IconButton edge='end'>
													<MoreVertIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItem>
									{idx < section.items.length - 1 && <Divider />}
								</Box>
							))}
						</List>
					</Box>
				))}
			</DialogContent>
		</Dialog>
	);
};

export default NotificationModal;
