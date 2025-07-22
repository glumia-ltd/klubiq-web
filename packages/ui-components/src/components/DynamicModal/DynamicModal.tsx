// File: packages/ui/components/DynamicModal.tsx

import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
	Box,
	Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export type ModalAction = {
	label: string;
	onClick: () => void;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	[key: string]: any; // for extra Button props
};

export type DynamicModalProps = {
	open: boolean;
	onClose: () => void;
	header?: React.ReactNode;
	headerText?: string;
	subHeader?: React.ReactNode;
	headerAlign?: 'left' | 'center' | 'right';
	children: React.ReactNode;
	contentAlign?: 'left' | 'center' | 'right';
	contentDirection?: 'row' | 'column';
	footer?: React.ReactNode;
	actions?: ModalAction[];
	footerAlign?: 'left' | 'center' | 'right';
	borderRadius?: number | string;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
	fullScreenOnMobile?: boolean;
	sx?: object;
};

export const DynamicModal: React.FC<DynamicModalProps> = ({
	open,
	onClose,
	header,
	headerText,
	subHeader,
	headerAlign = 'left',
	children,
	contentAlign = 'left',
	contentDirection = 'column',
	footer,
	actions,
	footerAlign = 'right',
	borderRadius = 16,
	maxWidth = 'md',
	fullScreenOnMobile = true,
	sx = {},
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	// Responsive dialog style
	const dialogSx = {
		'& .MuiDialog-paper': {
			borderRadius,
			width: isMobile ? '100%' : '50vw',
			maxWidth: isMobile ? '100vw' : '50vw',
			height: isMobile ? '100dvh' : 'calc(100dvh - 48px)',
			margin: isMobile ? 1 : 4,
			p: 0,
			...sx,
		},
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth
			fullScreen={fullScreenOnMobile && isMobile}
			sx={dialogSx}
			aria-labelledby='dynamic-modal-title'
			aria-describedby='dynamic-modal-description'
		>
			{/* Header */}
			<DialogTitle
				sx={{
					p: 0,
					m: 0,
					borderBottom: '1px solid #eee',
					display: 'flex',
					alignItems: 'center',
					justifyContent: headerAlign,
					minHeight: 56,
				}}
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent={headerAlign}
					width='100%'
					spacing={2}
					sx={{ px: 3, py: 2, position: 'relative' }}
				>
					{/* Custom header or default */}
					{header ? (
						header
					) : (
						<Stack flex={1} spacing={subHeader ? 0.5 : 0}>
							{headerText && (
								<Typography
									id='dynamic-modal-title'
									variant='h6'
									component='div'
									fontWeight={600}
								>
									{headerText}
								</Typography>
							)}
							{subHeader && (
								<Typography
									variant='subtitle2'
									color='text.secondary'
									fontWeight={400}
								>
									{subHeader}
								</Typography>
							)}
						</Stack>
					)}
					{/* Always show close button at top right */}
					<IconButton
						aria-label='close'
						onClick={onClose}
						sx={{
							// position: 'absolute',
							// right: 8,
							// top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
						size='large'
					>
						<Close />
					</IconButton>
				</Stack>
			</DialogTitle>

			{/* Main Content */}
			<DialogContent
				id='dynamic-modal-description'
				sx={{
					p: 0,
					m: 0,
					minHeight: 120,
					display: 'flex',
					flexDirection: contentDirection,
					alignItems: contentAlign,
					justifyContent: contentAlign,
					px: 3,
					py: 2,
				}}
			>
				{children}
			</DialogContent>

			{/* Footer */}
			{(footer || (actions && actions.length > 0)) && (
				<DialogActions
					sx={{
						p: 0,
						m: 0,
						borderTop: '1px solid #eee',
						display: 'flex',
						justifyContent: footerAlign,
						alignItems: 'center',
						px: 3,
						py: 2,
						gap: 1,
					}}
				>
					{footer}
					{actions &&
						actions.map((action, idx) => {
							const {
								label,
								onClick,
								variant,
								color,
								startIcon,
								endIcon,
								...rest
							} = action;
							return (
								<Box key={idx} component='span'>
									<Button
										variant={variant || 'contained'}
										color={color || 'primary'}
										onClick={onClick}
										startIcon={startIcon}
										endIcon={endIcon}
										{...rest}
									>
										{label}
									</Button>
								</Box>
							);
						})}
				</DialogActions>
			)}
		</Dialog>
	);
};

