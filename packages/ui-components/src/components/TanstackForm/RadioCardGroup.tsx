import React from 'react';
import { Stack, Typography, Radio, Card, Box, Skeleton } from '@mui/material';

export type RadioCardOption = {
	value: string;
	label: React.ReactNode;
	description?: string;
	tag?: React.ReactNode; // Add tag property
};

interface RadioCardGroupProps {
	value: string;
	options: RadioCardOption[];
	onChange: (value: string) => void;
	isLoading?: boolean;
	skeletonCount?: number;
	radioPosition?: 'left' | 'right';
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
	value,
	options,
	onChange,
	isLoading = false,
	skeletonCount = 3,
	radioPosition = 'left',
}) => {
	if (isLoading) {
		return (
			<Stack spacing={3} direction='column'>
				{Array.from({ length: skeletonCount }).map((_, index) => (
					<Card
						key={`skeleton-${index}`}
						sx={{
							border: '1px solid',
							boxShadow: 'none',
							borderColor: 'primary.contrastText',
							borderRadius: 2,
							p: 2,
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							background: 'transparent',
						}}
					>
						<Skeleton variant='circular' width={24} height={24} />
						<Stack direction='column' sx={{ flex: 1 }}>
							<Skeleton variant='text' width='40%' />
							<Skeleton variant='text' width='60%' sx={{ mt: 1 }} />
						</Stack>
					</Card>
				))}
			</Stack>
		);
	}

	return (
		<Stack spacing={3} direction='column'>
			{options.map((option) => (
				<Card
					key={option.value}
					onClick={() => onChange(option.value)}
					tabIndex={0}
					data-active={value === option.value ? 'true' : 'false'}
					onKeyDown={(e) =>
						(e.key === 'Enter' || e.key === ' ') && onChange(option.value)
					}
					sx={{
						cursor: 'pointer',
						border: value === option.value ? '2.5px solid' : '1px solid',
						boxShadow: 'none',
						borderColor:
							value === option.value ? 'primary.light' : 'primary.contrastText',
						borderRadius: 2,
						p: 2,
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						'&[data-active="true"]': {
							backgroundColor: 'action.selected',
							'&:hover': {
								backgroundColor: 'action.hover',
							},
						},
						outline:
							value === option.value
								? '2px solid primary.light'
								: '1px solid primary.contrastText',
					}}
					aria-checked={value === option.value}
					role='radio'
				>
					{radioPosition === 'left' && (
						<Radio
							checked={value === option.value}
							tabIndex={-1}
							value={option.value}
						/>
					)}
					<Stack direction='column' sx={{ flex: 1, justifyContent: 'center' }}>
						<Typography variant='h6' fontWeight={600}>
							{option.label}
						</Typography>
						{option.description && (
							<Typography variant='caption' fontWeight={500} mt={1}>
								{option.description}
							</Typography>
						)}
					</Stack>
					{/* Render tag if provided, always as a Chip */}
					{option.tag && (
						<Box ml={2} display='flex' alignItems='center'>
							{option.tag}
						</Box>
					)}
					{radioPosition === 'right' && (
						<Radio
							checked={value === option.value}
							tabIndex={-1}
							value={option.value}
						/>
					)}
				</Card>
			))}
		</Stack>
	);
};
