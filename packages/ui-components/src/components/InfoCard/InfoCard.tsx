import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Stack,
	Box,
	useTheme,
} from '@mui/material';
import { InfoCardProps } from './types';

export const InfoCard: React.FC<InfoCardProps> = ({
	title,
	items,
	elevation = 0,
}) => {
	const theme = useTheme();

	return (
		<Card
			elevation={elevation}
			sx={{
				borderRadius: 2,
				...(elevation === 0 && {
					backgroundColor: theme.palette.background.default,
				}),
			}}
		>
			<CardContent>
				<Typography variant='h6' fontWeight={600} mb={2}>
					{title}
				</Typography>
				<Stack spacing={2}>
					{items.map((item) => (
						<Stack
							direction='row'
							key={item.id}
							justifyContent='space-between'
							alignItems='center'
						>
							<Stack direction='row' justifyContent='flex-start' width='50%' alignItems='center' spacing={1.5}>
								{item.icon && (
									<Box sx={{ color: 'text.secondary', display: 'flex' }}>
										{item.icon}
									</Box>
								)}
								<Typography variant='body1' color='text.secondary'>
									{item.label}
								</Typography>
							</Stack>
							<Box
								sx={{
									width: '50%',
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								{item.value}
							</Box>
						</Stack>
					))}
				</Stack>
			</CardContent>
		</Card>
	);
};
