import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const TableChart = () => {
	return (
		<Box
			padding={{
				xs: '8px  25px',
				sm: '16px 50px',
				md: '32px 100px',
				lg: '32px  100px',
			}}
		>
			<BarChart
				borderRadius={10}
				series={[
					{
						data: [13, 24, 51, 63, 52, 20, 15, 20, 25, 30, 45, 60],
						stack: 'A',
						label: 'Property Sales',
						color: '#002147',
					},
					{
						data: [4, 3, 16, 56, 82, 10, 11, 12, 30, 39, 34, 50],
						stack: 'A',
						label: 'Property Rental',
						color: '#6699CC',
					},
					{
						data: [14, 3, 16, 56, 82, 10, 11, 12, 20, 39, 34, 50],
						stack: 'A',
						color: '#71A6DAB2',
					},
				]}
				xAxis={[
					{
						scaleType: 'band',
						data: [
							'Jan',
							'Feb',
							'Mar',
							'Apr',
							'May',
							'Jun',
							'Jul',
							'Aug',
							'Sep',
							'Oct',
							'Nov',
							'Dec',
						],
						//categoryGapRatio: 0.8,
						// barGapRatio: 7.8
					},
				]}
				// yAxis={[
				// 	{
				// 		scaleType: 'linear',
				// 		data: { min: 0, max: 1000 },
				// 		// valueFormatter: (value) =>
				// 		// 	`${(value / 1000).toLocaleString()}m`,
				// 	},
				// ]}
				yAxis={[{ min: 0, max: 200 }]}
				//maxWidth={900}
				height={360}
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
						padding: 0,
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
