import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
const Multichart = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const data = {
		labels: ['Occupied', 'Vacant', 'Maintenace'],
		datasets: [
			{
				backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],

				data: [21, 0, 0],
			},

			{
				backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],
				data: [0, 90, 0],
			},
			{
				backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],
				data: [0, 0, 7],
			},
		],
	};

	//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	//     datasets: [
	//       {
	//         label: '# of Votes',
	//         data: [12, 19, 3, 5, 2, 3],
	//         backgroundColor: [
	//           'rgba(255, 99, 132, 0.2)',
	//           'rgba(54, 162, 235, 0.2)',
	//           'rgba(255, 206, 86, 0.2)',
	//           'rgba(75, 192, 192, 0.2)',
	//           'rgba(153, 102, 255, 0.2)',
	//           'rgba(255, 159, 64, 0.2)',
	//         ],
	//         borderColor: [
	//           'rgba(255, 99, 132, 1)',
	//           'rgba(54, 162, 235, 1)',
	//           'rgba(255, 206, 86, 1)',
	//           'rgba(75, 192, 192, 1)',
	//           'rgba(153, 102, 255, 1)',
	//           'rgba(255, 159, 64, 1)',
	//         ],
	//         borderWidth: 1,
	//       },
	//     ],
	//   };

	return (
		<div style={{ maxWidth: '300px' }}>
			<Doughnut
				data={data}
				options={{
					responsive: false,
					plugins: {
						legend: {
							display: true,
							position: 'left',
							labels: {
								boxHeight: 10,
								// fontSize:small,
							},
						},
					},
				}}
				width={250}
				height={120}
			/>
		</div>
	);
};

export default Multichart;
