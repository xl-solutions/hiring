import {
	useEffect,
	useState
} from 'react';
import moment from 'moment';
import { TableColumn } from 'react-data-table-component';

import { api } from '../../api';
import { formatValueToCurrency } from '../../utils';

import { Container, Content } from './styles';
import { DataTableComponent } from '../../components/DataTable';
import { ApexChartComponent } from '../../components/ApexChartComponent/index';

interface IDataRow {
	name: string;
	lastPrice: number;
	pricedAt: string;
}

type ILastPrices = Array<{
	name: string;
	lastPrice: number;
	pricedAt: string;
}>

const columns: TableColumn<IDataRow>[] = [
	{
		name: 'Nome',
		selector: row => row.name
	},
	{
		name: 'Último preço',
		selector: row => formatValueToCurrency(row.lastPrice)
	},
	{
		name: 'Data do último preço',
		selector: row => moment(row.pricedAt).format('DD/MM/YYYY')
	}
];

export function Home() {
	const [stocks, setStocks] = useState<ILastPrices>([]);
	const [chartOptions, setChartOptions] = useState<string[]>([]);
	const [chartSeries, setChartSeries] = useState<number[]>([]);

	function mapDataChart(lastPrices: ILastPrices) {

		const categories: string[] = [];
		const dataSeries: number[] = [];

		lastPrices.forEach((v: ILastPrices[0]) => {
			categories.push(v.name);
			dataSeries.push(v.lastPrice);
		});

		setChartOptions(categories);
		setChartSeries(dataSeries);
	}

	useEffect(() => {
		api.post(
			`${process.env.REACT_APP_API_URL}/IBM/compare`, {
				stocks: ['TIMP3.SA', 'VIVT4.SA']
			}
		).then(({ data }) => {
			setStocks(data.lastPrices);
			mapDataChart(data.lastPrices);
		})
			.catch(err => console.log(err.response.data));
	}, []);

	return (
		<Container>
			<h2>Últimas cotações</h2>
			<Content>
				<ApexChartComponent
					categories={chartOptions}
					dataSeries={chartSeries}
				/>
				<DataTableComponent
					columns={columns}
					stocks={stocks}
				/>
			</Content>
		</Container>
	);
}
