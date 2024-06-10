import { Box } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export const PropertiesGuage = ({
	data,
	size,
}: {
	data: { [key: string]: number };
	size: number;
	colors: string[];
}) => {
	const { category1, category2, category3 } = data;

	const midSize = size * 0.7;
	const smallSize = size * 0.45;

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			height='500px'
			position='relative'
			width={size}
		>
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
					value={category1}
					cornerRadius='50%'
					size={size}
					sx={{
						position: 'absolute',
						left: `calc(50% - ${size && +size / 2}px)`,
						top: `calc(50% - ${size && +size / 2}px)`,

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

				<>
					<svg width={0} height={0}>
						<defs>
							<linearGradient
								id='gradient-1'
								x1='0%'
								y1='100%'
								x2='10%'
								y2='10%'
							>
								<stop offset='10%' stopColor='rgba(209, 8, 165, 0.2)' />
								<stop offset='90%' stopColor='rgba(209, 8, 165, 1)' />
							</linearGradient>
						</defs>
					</svg>
					<Gauge
						width={midSize}
						height={midSize}
						value={category2}
						cornerRadius='50%'
						size={midSize}
						sx={{
							position: 'absolute',
							left: `calc(50% - ${midSize && +midSize / 2}px)`,
							top: `calc(50% - ${midSize && +midSize / 2}px)`,

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
				</>
				<>
					<svg width={0} height={0}>
						<defs>
							<linearGradient
								id='gradient-2'
								x1='0%'
								y1='100%'
								x2='10%'
								y2='10%'
							>
								<stop offset='10%' stopColor='rgba(0, 136, 240, 0.2)' />
								<stop offset='90%' stopColor='rgba(0, 136, 240, 1)' />
							</linearGradient>
						</defs>
					</svg>
					<Gauge
						width={smallSize}
						height={smallSize}
						value={category3}
						cornerRadius='50%'
						size={smallSize}
						sx={{
							position: 'absolute',
							left: `calc(50% - ${smallSize && +smallSize / 2}px)`,
							top: `calc(50% - ${smallSize && +smallSize / 2}px)`,

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
				</>
			</div>
		</Box>
	);
};
