import { Box, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export const PropertiesGuage = ({
	data,
	width,
	height,
	colors,
	legend,
	legendPosition,
}: {
	data: { [key: string]: number };
	width: number | null;
	height: number;
	colors: string[];
	legend?: boolean;
	legendPosition?: 'top' | 'bottom' | 'left' | 'right';
}) => {
	const { occupied, vacant, maintenance } = data;
	const total = occupied! + vacant! + maintenance!;
	const convertToPercentage = (value = 0) => (value! / total) * 100;

	const size = Math.min(width ?? 300, height);
	const midSize = size * 0.7;
	const smallSize = size * 0.45;

	const categories = [
		{ label: 'Occupied', value: occupied, color: colors[0] },
		{ label: 'Vacant', value: vacant, color: colors[1] },
		{ label: 'Maintenance', value: maintenance, color: colors[2] },
	];

	const legendComponent = legend && (
		<Box mt={2}>
			{categories.map((category, index) => (
				<Box key={index} display='flex' alignItems='center' mb={1}>
					<Box
						sx={{
							width: { xs: 16, sm: 12, md: 14, lg: 16 },
							height: { xs: 16, sm: 12, md: 14, lg: 16 },
							backgroundColor: category.color,
							borderRadius: '50%',
							mr: 1,
						}}
					/>
					<Typography
						sx={{ fontSize: { xs: '14', sm: '10px', md: '10px', lg: '14px' } }}
					>
						{category.label}{' '}
						<span
							style={{
								fontWeight: 600,
								color: 'primary.main',
							}}
						>
							{category.value}
						</span>
					</Typography>
				</Box>
			))}
		</Box>
	);

	const gaugeComponent = (
		<div style={{ position: 'relative', width: size, height: size }}>
			<svg width={0} height={0}>
				<defs>
					<linearGradient id='gradient-0' x1='0%' y1='100%' x2='10%' y2='10%'>
						<stop offset='10%' stopColor='rgba(110, 192, 60, 0.2)' />
						<stop offset='90%' stopColor='rgba(110, 192, 60, 1)' />
					</linearGradient>
				</defs>
			</svg>
			<Gauge
				width={size}
				height={size}
				value={convertToPercentage(occupied)}
				cornerRadius='50%'
				size={size}
				sx={{
					position: 'absolute',
					left: `calc(50% - ${size / 2 - 10}px)`,
					top: `calc(50% - ${size / 2}px)`,
					[`& .${gaugeClasses.valueText}`]: {
						fontSize: 0,
					},
					[`& .${gaugeClasses.valueArc}`]: {
						fill: 'url(#gradient-0)',
					},
					[`& .${gaugeClasses.referenceArc}`]: {
						fill: '#EDEBF0',
					},
				}}
			/>

			<svg width={0} height={0}>
				<defs>
					<linearGradient id='gradient-1' x1='0%' y1='100%' x2='10%' y2='10%'>
						<stop offset='10%' stopColor='rgba(209, 8, 165, 0.2)' />
						<stop offset='90%' stopColor='rgba(209, 8, 165, 1)' />
					</linearGradient>
				</defs>
			</svg>
			<Gauge
				width={midSize}
				height={midSize}
				value={convertToPercentage(vacant)}
				cornerRadius='50%'
				size={midSize}
				sx={{
					position: 'absolute',
					left: `calc(50% - ${midSize / 2 - 10}px)`,
					top: `calc(50% - ${midSize / 2}px)`,
					[`& .${gaugeClasses.valueText}`]: {
						fontSize: 0,
					},
					[`& .${gaugeClasses.valueArc}`]: {
						fill: 'url(#gradient-1)',
					},
					[`& .${gaugeClasses.referenceArc}`]: {
						fill: '#EDEBF0',
					},
				}}
			/>

			<svg width={0} height={0}>
				<defs>
					<linearGradient id='gradient-2' x1='0%' y1='100%' x2='10%' y2='10%'>
						<stop offset='10%' stopColor='rgba(0, 136, 240, 0.2)' />
						<stop offset='90%' stopColor='rgba(0, 136, 240, 1)' />
					</linearGradient>
				</defs>
			</svg>
			<Gauge
				width={smallSize}
				height={smallSize}
				value={convertToPercentage(maintenance)}
				cornerRadius='50%'
				size={smallSize}
				sx={{
					position: 'absolute',
					left: `calc(50% - ${smallSize / 2 - 10}px)`,
					top: `calc(50% - ${smallSize / 2}px)`,
					[`& .${gaugeClasses.valueText}`]: {
						fontSize: 0,
					},
					[`& .${gaugeClasses.valueArc}`]: {
						fill: 'url(#gradient-2)',
					},
					[`& .${gaugeClasses.referenceArc}`]: {
						fill: '#EDEBF0',
					},
				}}
			/>
		</div>
	);

	return (
		<Box
			display='flex'
			flexDirection={
				legendPosition === 'left' || legendPosition === 'right'
					? 'row'
					: 'column'
			}
			alignItems='center'
			justifyContent='space-between'
			height={height}
			width={width ? width : 'inherit'}
			position='relative'
		>
			{legendPosition === 'top' && legendComponent}
			{legendPosition === 'left' && legendComponent}
			{gaugeComponent}
			{legendPosition === 'right' && legendComponent}
			{legendPosition === 'bottom' && legendComponent}
		</Box>
	);
};
