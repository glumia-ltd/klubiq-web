import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisScaleConfig } from '@mui/x-charts/internals';
import { SeriesDataType } from '../../../shared/type';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { FC, useMemo } from 'react';
import { useScreenSize } from '../../../hooks/useScreenSize';

type xAxisDataType = string[];

const TableChart: FC<{
	seriesData: SeriesDataType | undefined;
	xAxisData: xAxisDataType | undefined;
	maxRevenue: number | undefined;
	currencySymbol: string;
}> = ({ seriesData, xAxisData, maxRevenue, currencySymbol }) => {
	const { width } = useScreenSize();
	const isSmallScreen = width <= 500;
	const chartLayout = 'vertical';
	//isSmallScreen ? 'horizontal' : 'vertical';
	// Add validation
	const validSeriesData = useMemo(() => {
		if (!Array.isArray(seriesData) || seriesData.length === 0) {
			return [
				{
					data: [0],
					label: 'No Data',
					color: '#E0E0E0',
				},
			];
		}
		return seriesData;
	}, [seriesData]);

	const validXAxisData = useMemo(() => {
		if (!Array.isArray(xAxisData) || xAxisData.length === 0) {
			return ['No Data'];
		}
		return xAxisData;
	}, [xAxisData]);

	

	const valueFormatter = (value: number) =>
		`${currencySymbol ?? '₦'}${value / 1000}k`;

	const bandAxis = {
		scaleType: 'band',
		data: validXAxisData,
	};
	
	const valueAxis = {
		min: 0,
		max: Math.max(maxRevenue! * 1.2, 1),
		valueFormatter,
	};

	const xAxisConfig: AxisScaleConfig = {
		band: {
			scaleType: 'band',
			scale: Number,
			categoryGapRatio: 0.8,
			barGapRatio: 0,
		},
		point: {
			scaleType: 'point',
			scale: Number,
		},
		log: {
			scaleType: 'log',
			scale: Number,
		},
		pow: {
			scaleType: 'pow',
			scale: Number,
		},
		sqrt: {
			scaleType: 'sqrt',
			scale: Number,
		},
		time: {
			scaleType: 'time',
			scale: Date,
		},
		utc: {
			scaleType: 'utc',
			scale: String,
		},
		linear: {
			scaleType: 'linear',
			scale: Number,
		},
	};
	const chartContent = (
		<BarChart
			layout={chartLayout}
			margin={
				isSmallScreen
					? { top: 20, right: 20, bottom: 40, left: 60 } // More left margin for y-axis labels
					: { top: 20, right: 20, bottom: 40, left: 60 }
			} // Increase left margin
			sx={{
				padding: '15px',
				[`& .${axisClasses.directionY} .${axisClasses.label}`]: {
					transform: 'translateX(-2.5rem)',
					marginRight: '2rem',
				},
			}}
			borderRadius={8}
			series={validSeriesData}
			// xAxis={isSmallScreen ? [valueAxis] : [{...bandAxis, ...xAxisConfig.band}]}
			// yAxis={isSmallScreen ? [{...bandAxis, ...xAxisConfig.band}] : [valueAxis]}
			xAxis={[{...bandAxis, ...xAxisConfig.band}]}
			yAxis={[valueAxis]}
			height={400}
			bottomAxis={null}
			topAxis={{
				disableTicks: true,
				disableLine: true,
				labelStyle: {
					fontSize: '12px',
				},
			}}
			leftAxis={{
				disableTicks: true,
				disableLine: true,
				labelStyle: {
					fontSize: '12px',
				},
			}}
			slotProps={{
				legend: {
					direction: 'row',
					position: { vertical: 'bottom', horizontal: 'middle' },
					padding: 10,
					itemMarkWidth: 20,
					itemMarkHeight: 11,
					markGap: 5,
					itemGap: 10,
				},
			}}
		/>
	);
	return (
		<Box
			padding={{
				xs: '8px  25px',
				sm: '16px 50px',
				md: '32px 100px',
				lg: '32px  100px',
			}}
		>
			{chartContent}
		</Box>
	);
};

export default TableChart;
