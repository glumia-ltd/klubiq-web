import React from 'react';
import { Card, Typography, Box, Chip, useTheme, Link } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export interface PaymentMethodCardProps {
	last4: string;
	brand: string;
	isPrimary?: boolean;
	onEdit?: () => void;
	variant?: 'default' | 'compact';
	children?: React.ReactNode;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
	last4,
	brand,
	isPrimary,
	onEdit,
	variant = 'default',
	children,
}) => {
	const theme = useTheme();

	return (
		<Card
			variant='outlined'
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				alignItems: { xs: 'stretch', sm: 'center' },
				justifyContent: 'space-between',
				p: { xs: 2, sm: 3 },
				borderRadius: '12px',
				borderColor: theme.palette.divider || theme.palette.secondary.dark,
				boxShadow: 'none',
				bgcolor: theme.palette.background.paper,
				width: '100%',
				gap: { xs: 2, sm: 3 },
				minHeight: { xs: 100, sm: 80 },
			}}
		>
			<Box
				display='flex'
				alignItems='center'
				gap={{ xs: 1.5, sm: 2 }}
				flex={1}
				minWidth={0}
			>
				<CreditCardIcon
					sx={{
						color: theme.palette.primary.light,
						fontSize: { xs: 24, sm: 28 },
						flexShrink: 0,
					}}
				/>
				<Box minWidth={0}>
					<Typography
						sx={{
							fontSize: { xs: 16, sm: 20 },
							fontWeight: 700,
							color: theme.palette.primary.main,
							letterSpacing: 1,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						•••• •••• •••• {last4}
					</Typography>
					<Typography
						sx={{
							fontSize: { xs: 14, sm: 16 },
							fontWeight: 400,
							color: theme.palette.textColors?.greyText,
							mt: 0.5,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{brand} ending in {last4}
					</Typography>
				</Box>
				{children}
			</Box>
			<Box
				display='flex'
				alignItems='center'
				justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
				gap={2}
				mt={{ xs: 2, sm: 0 }}
				flexShrink={0}
				flexWrap='wrap'
			>
				{isPrimary && (
					<Chip
						label='Primary'
						variant='greenChip'
						sx={{
							fontWeight: 600,
							fontSize: 16,
						}}
					/>
				)}
				<Link
					component='button'
					onClick={onEdit}
					underline='none'
					sx={{
						color: theme.palette.primary.light,
						fontWeight: 500,
						fontSize: { xs: 12, sm: 16 },
						ml: 1,
						'&:hover': { textDecoration: 'underline' },
						whiteSpace: 'nowrap',
					}}
				>
					Edit
				</Link>
			</Box>
		</Card>
	);
};

export default PaymentMethodCard;
