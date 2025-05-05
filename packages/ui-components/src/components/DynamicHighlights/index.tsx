import { FC, ReactNode } from 'react';
import { Stack, Paper, Typography, Box } from '@mui/material';

type HighlightItem = {
	icon: ReactNode;
	label: string;
	value?: string | number;
};

type HighlightsProps = {
	items: HighlightItem[];
	title?: string;
};

export const Highlights: FC<HighlightsProps> = ({
	items,
	title = 'Highlights',
}) => (
	<Box width='100%'>
		{title && (
			<Typography variant='h5' fontWeight={700} mb={2}>
				{title}
			</Typography>
		)}
		<Stack direction='row' spacing={2} role='list'>
			{items.map((item, idx) => (
				<Paper
					key={idx}
					elevation={0}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						px: 2,
						py: 1,
						bgcolor: 'grey.100',
						borderRadius: 2,
						minWidth: 120,
					}}
					tabIndex={0}
					aria-label={`${item.value ? item.value + ' ' : ''}${item.label}`}
					role='listitem'
				>
					<Box color='text.secondary' fontSize={20}>
						{item.icon}
					</Box>
					<Typography variant='body1' color='text.secondary' fontWeight={500}>
						{item.value ? <>{item.value} </> : null}
						{item.label}
					</Typography>
				</Paper>
			))}
		</Stack>
	</Box>
);
