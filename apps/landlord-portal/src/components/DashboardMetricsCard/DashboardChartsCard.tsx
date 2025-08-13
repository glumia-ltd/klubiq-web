import React from 'react';
import {
	Card,
	Stack,
	Typography,
	SxProps,
	Theme,
	Skeleton,
	Button,
	useTheme,
	useMediaQuery,
	Chip,
} from '@mui/material';
import {
	generateHueVariants,
	generateLightnessVariants,
} from '../../helpers/colorUtils';
import {
	areaElementClasses,
	axisClasses,
	BarChart,
	labelMarkClasses,
	legendClasses,
	LineChart,
	PieChart,
} from '@mui/x-charts';
import { blue } from '@mui/material/colors';
import { formatCurrencyNumberShort } from '../../helpers/utils';


export type DashboardChartsCardVariant =
	| 'pie'
	| 'bar'
	| 'line'
	| 'area'
	| 'scatter'
	| 'radar'
	| 'polar'
	| 'bubble'
	| 'doughnut';

export interface DataPoint {
	label: string;
	value: number;
	labelMarkType?: any;
	color?: string;
	valuePct?: number;
}

const chartColors = (numberOfColors: number, theme: Theme) => {
	const baseColor = `${theme.palette.primary.main}80`;

	// Use the new color utility to generate better variants
	if (numberOfColors <= 5) {
		// For small number of colors, use hue variants for better distinction
		return generateHueVariants(baseColor, numberOfColors, 60);
	} else {
		// For larger number of colors, combine hue and lightness variants
		// const hueVariants = generateHueVariants(
		// 	baseColor,
		// 	Math.ceil(numberOfColors / 3),
		// 	50,
		// );
		const lightnessVariants = generateLightnessVariants(
			baseColor,
			numberOfColors,
			20,
			90,
		);

		// Combine and return the requested number of colors
		return [...lightnessVariants].slice(0, numberOfColors);
	}
};

export interface DashboardChartsCardProps {
	variant?: DashboardChartsCardVariant;
	data: DataPoint[];
	sx?: SxProps<Theme>;
	/** Show skeletons when loading */
	loading?: boolean;
	caption?: string;
	buttonText?: string;
	buttonIcon?: React.ReactElement;
	buttonOnClick?: () => void;
	title?: string;
	dataSeries?: any[];
	chipText?: string;
	chipIcon?: React.ReactElement;
	chipVariant?: 'upTrend' | 'downTrend' | 'neutralTrend';
	fullWidth?: boolean;
	orgSettings?: any;
	subTitle?: string;
}

export const DashboardChartsCard: React.FC<DashboardChartsCardProps> = ({
	variant = 'pie',
	data,
	sx = {},
	loading = false,
	caption,
	buttonText,
	buttonIcon,
	buttonOnClick,
	title,
	chipText,
	chipIcon,
	chipVariant,
	fullWidth = false,
	orgSettings,
	subTitle,
}) => {
	// Merge all styles into a single object
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const cardStyles = {
		borderRadius: 3,
		p: 3,
		minWidth: 0,
		width: isMobile ? '100%' : fullWidth ? '100%' : '48.5%',
		maxWidth: {
			xs: '100%',
			sm: '100%',
			md: fullWidth ? '100%' : '48.5%',
		},
		maxHeight: 600,
		...(typeof sx === 'object' ? sx : {}),
	};
	if (loading) {
		return (
			<Card elevation={0} sx={cardStyles}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='flex-start'
					spacing={2}
				>
					<Skeleton variant='text' width={40} height={20} />
					<Skeleton variant='text' width={40} height={20} />
				</Stack>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={2}
				>
					<Skeleton variant='rectangular' width='50%' height={100} />
					<Stack
						direction={'column'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={2}
					>
						<Skeleton variant='text' width={50} height={20} />
						<Skeleton variant='text' width={50} height={20} />
						<Skeleton variant='text' width={50} height={20} />
					</Stack>
				</Stack>
			</Card>
		);
	}
	const getPieSeries = () => {
		const total = data.reduce((acc, item) => acc + item.value, 0);
		return [
			{
				innerRadius: 100,
				outerRadius: 120,
				id: 'propertyTypePieChart',
				data: data as DataPoint[] | [],
				valueFormatter: (item: { value: number }) =>
					`${((item.value / total) * 100).toFixed(0)}%`,
				cx: 150,
				cy: 150,
			},
		];
	};

	const getBarSeries = () => {
		const dataSeries = data.map((item) => {
			return item.value;
		});
		return dataSeries;
	};
	const getBarDataSet = () => {
		const dataSet = data.map((item) => ({
			[item.label]: item.value,
			label: item.label,
		}));
		return dataSet;
	};
	const getBarChartSettings = (
		label: string,
		width: number,
		height: number,
	) => {
		return {
			yAxis: [
				{
					label: label,
					width: width,
					valueFormatter: (value: number | null) =>
						formatCurrencyNumberShort(value || 0.0, orgSettings),
				},
			],
			height: height,
			xAxis: [{ dataKey: 'label', tickSize: 7, scaleType: 'band' as const }],
		};
	};
	const noStrokeStyles= {
		[`.${axisClasses.root}`]: {
			[`.${axisClasses.tick}, .${axisClasses.line}`]: {
				stroke: 'text.primary',
				strokeWidth: 0,
			},
			[`.${axisClasses.tickLabel}`]: {
				fill: 'text.primary',
			},
		},
	}
	const renderChartByVariant = () => {
		const width = isMobile ? 25 : 40;
		const height = isMobile ? 400 : 300;
		switch (variant) {
			case 'pie':
				return (
					<PieChart
						loading={loading}
						series={getPieSeries()}
						height={300}
						width={300}
						colors={chartColors(data.length, theme)}
						slotProps={{
							legend: {
								direction: isMobile ? 'horizontal' : 'vertical',
								sx: {
									gap: '5px',
									fontSize: '12px',
									// CSS-in-JS
									[`.${legendClasses.mark}`]: {
										height: 8,
										width: 8,
									},
									// CSS class
									['.MuiChartsLegend-series']: {
										gap: '5px',
									},
									[`.${labelMarkClasses.fill}`]: {
										fill: blue,
									},
									p: isMobile ? 2 : 0,
									textWrap: 'wrap',
									wordBreak: 'break-word',
									// width: isMobile ? 100 : 300,
									// height: isMobile ? 100 : 300,
								},
							},
						}}
					/>
				);
			case 'bar':
				return (
					<BarChart
						loading={loading}
						hideLegend={true}
						dataset={getBarDataSet()}
						series={[{ data: getBarSeries(), color: `${theme.palette.primary.main}` }]}
						{...getBarChartSettings('', width, height)}
						sx={noStrokeStyles}
					/>
				);
			case 'line':
				return (
					<LineChart
						loading={loading}
						dataset={getBarDataSet()}
						grid={{ horizontal: true }}
						series={[
							{
								data: getBarSeries(),
								color: `${theme.palette.success.main}`,
								area: true,
								valueFormatter: (value: number | null) =>
									formatCurrencyNumberShort(value || 0.0, orgSettings),
							},
						]}
						{...getBarChartSettings('', width, height)}
						sx={{...noStrokeStyles,
							[`& .${areaElementClasses.root}`]: {
								fill:`url('#myGradient')`,
								filter: 'none', // Remove the default filtering
							  },
							}}
					>
						<defs>
							<linearGradient id='myGradient' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor={`${theme.palette.success.main}10`} />
								<stop offset='100%' stopColor='#fff' />
							</linearGradient>
						</defs>
					</LineChart>
				);
			default:
				return null;
		}
	};

	return (
		<Card elevation={0} sx={cardStyles}>
			<Stack
				direction={'column'}
				justifyContent={'space-between'}
				alignItems={'flex-start'}
				spacing={2}
				width={'100%'}
				height={'100%'}
			>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'100%'}
				>
					<Typography variant='subtitle2' width={'32%'}>
						{title}
					</Typography>
					<Stack
						direction={'row'}
						width={'32%'}
						justifyContent={'flex-end'}
						alignItems={'center'}
						spacing={2}
					>
						{chipText && (
							<Chip
								label={chipText}
								size='small'
								icon={chipIcon || undefined}
								variant={chipVariant}
								sx={{ height: 25, alignSelf: 'flex-start' }}
							/>
						)}
						{caption && <Typography variant='caption'>{caption}</Typography>}
					</Stack>
					{buttonText && (
						<Stack
							width={'32%'}
							justifyContent={'flex-end'}
							alignItems={'flex-end'}
						>
							<Button
								startIcon={buttonIcon}
								variant='klubiqTextButton'
								onClick={buttonOnClick}
							>
								{buttonText}
							</Button>
						</Stack>
					)}
				</Stack>
				<Stack
					direction={'row'}
					justifyContent={'flex-start'}
					alignItems={'center'}
					width={'100%'}
				>
					{subTitle && (
						<Typography variant='subtitle2' width={'100%'}>
							{subTitle}
						</Typography>
					)}
				</Stack>
				<Stack
					direction={'row'}
					justifyContent={'center'}
					alignItems={'center'}
					width={'100%'}
					height={'100%'}
				>
					{renderChartByVariant()}
				</Stack>
			</Stack>
		</Card>
	);
};

export default DashboardChartsCard;
