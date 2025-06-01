import React from 'react';
import { Stack, Typography, Radio, Card, Box } from '@mui/material';

export type RadioCardOption = {
	value: string;
	label: string;
	description?: string;
};

interface RadioCardGroupProps {
	value: string;
	options: RadioCardOption[];
	onChange: (value: string) => void;
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
	value,
	options,
	onChange,
}) => (
	<Stack spacing={3} direction='column'>
		{options.map((option) => (
			<Card
				key={option.value}
				onClick={() => onChange(option.value)}
				tabIndex={0}
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
					background: 'transparent',
					outline:
						value === option.value
							? '2px solid primary.light'
							: '1px solid primary.contrastText',
				}}
				aria-checked={value === option.value}
				role='radio'
			>
				<Radio
					checked={value === option.value}
					tabIndex={-1}
					value={option.value}
					// sx={{ mt: 0.5 }}
				/>
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
			</Card>
		))}
	</Stack>
);
