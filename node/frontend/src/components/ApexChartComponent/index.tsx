import Chart from 'react-apexcharts';

interface IChartProps {
	categories: Array<string>;
	dataSeries: number[];
}

export function ApexChartComponent({
	categories,
	dataSeries,
	...rest
}: IChartProps) {
	const optionsChart = {
		options: {
			chart: {
				id: 'basic-bar'
			},
			xaxis: {
				categories: categories
			}
		},
		series: [
			{
				name: 'Valor',
				data: dataSeries
			}
		]
	};

	return (
		<Chart
			options={optionsChart.options}
			series={optionsChart.series}
			type="bar"
			width="400"
			{...rest}
		/>
	);
}
