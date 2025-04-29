import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisScaleConfig } from '@mui/x-charts/internals';
import { SeriesDataType } from '../../shared/type';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { FC } from 'react';
import { useScreenSize } from '../../hooks/useScreenSize';

type xAxisDataType = string[];

const TableChart: FC<{
	seriesData: SeriesDataType | undefined;
	xAxisData: xAxisDataType | undefined;
	maxRevenue: number | undefined;
	currencySymbol: string;
}> = ({ seriesData, xAxisData, maxRevenue, currencySymbol }) => {
	const { width } = useScreenSize();

	const valueFormatter = (value: number) =>
		`${currencySymbol ? currencySymbol : '₦'}${value / 1000}k`;

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
	return (
		<Box
			padding={{
				xs: '8px  25px',
				sm: '16px 50px',
				md: '32px 100px',
				lg: '32px  100px',
			}}
		>
			{width > 500 ? (
				<BarChart
					sx={{
						padding: '15px',
						[`& .${axisClasses.directionY} .${axisClasses.label}`]: {
							transform: 'translateX(-2.5rem)',
							marginRight: '2rem',
						},
					}}
					borderRadius={8}
					series={seriesData!}
					xAxis={[
						{
							...xAxisConfig.band,
							scaleType: 'band',
							data: xAxisData,
						},
					]}
					yAxis={[
						{
							min: 0,
							max: maxRevenue! + maxRevenue! * 0.2,

							valueFormatter,
						},
					]}
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
						loadingOverlay: { message: 'Data should be available soon.' },
					}}
				/>
			) : (
				<BarChart
					sx={{
						padding: '15px',
						[`& .${axisClasses.directionY} .${axisClasses.label}`]: {
							transform: 'translateX(-2.5rem)',
							marginRight: '2rem',
						},
					}}
					borderRadius={8}
					series={seriesData!}
					xAxis={[
						{
							...xAxisConfig.band,
							scaleType: 'band',
							data: xAxisData,
						},
					]}
					yAxis={[
						{
							min: 0,
							max: maxRevenue! + maxRevenue! * 0.2,

							valueFormatter,
						},
					]}
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
						loadingOverlay: { message: 'Data should be available soon.' },
					}}
				/>
			)}
		</Box>
	);
};

export default TableChart;
