import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisScaleConfig } from '@mui/x-charts/internals';
import { SeriesDataType } from '../../type';
import { FC } from 'react';

type xAxisDataType = string[];

const TableChart: FC<{
	seriesData: SeriesDataType;
	xAxisData: xAxisDataType;
	maxRevenue?: number;
}> = ({ seriesData, xAxisData, maxRevenue }) => {
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
			sx={{ border: '2px solid green' }}
			padding={{
				xs: '8px  25px',
				sm: '16px 50px',
				md: '32px 100px',
				lg: '32px  100px',
			}}
		>
			<BarChart
				borderRadius={8}
				series={seriesData}
				xAxis={[
					{
						...xAxisConfig.band,
						scaleType: 'band',
						data: xAxisData,
					},
				]}
				yAxis={[{ min: 0, max: maxRevenue, scaleType: 'linear' }]}
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
						padding: '25px',
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
		</Box>
	);
};

export default TableChart;
