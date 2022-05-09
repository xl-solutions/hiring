import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import { TableColumn } from 'react-data-table-component';
import moment from 'moment';

import { DataTableComponent } from '../../components/DataTable';
import { Button } from '../../components/Button';

import { api } from '../../api';

import { Col, Container, Content, Row } from './styles';
import { formatValueToCurrency } from '../../utils';

interface IDataRow {
	name: string;
	purchasedAmount: number;
	purchasedAt: string;
	priceAtDate: number;
	lastPrice: number;
	capitalGains: number;
}

const columns: TableColumn<IDataRow>[] = [
	{
		name: 'Nome',
		selector: row => row.name
	},
	{
		name: 'Valor da compra',
		selector: row => formatValueToCurrency(row.purchasedAmount)
	},
	{
		name: 'Data da compra',
		selector: row => moment(row.purchasedAt).format('DD/MM/YYYY')
	},
	{
		name: 'Valor na data da compra',
		selector: row => formatValueToCurrency(row.priceAtDate)
	},
	{
		name: 'Último Fechamento',
		selector: row => formatValueToCurrency(row.lastPrice)
	},
	{
		name: 'Lucro ou perda',
		selector: row =>  formatValueToCurrency(row.capitalGains)
	}
];

export function EarningsProjection() {
	const [earningsProjection, setEarningsProjection] = useState<IDataRow[]>([]);
	const [symbol, setSymbol] = useState('');
	const [purchasedAmount, setPurchasedAmount] = useState(0);
	const [purchasedDate, setPurchasedDate] = useState(new Date());

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		try {
			const { data } = await api.get(
				`${process.env.REACT_APP_API_URL}/${symbol}/gains`,
				{ params: {
					purchasedAmount,
					purchasedAt: moment(purchasedDate).format('YYYY-MM-DD')
				} }
			);

			const dataEarningsProjection: IDataRow[]  = [];
			dataEarningsProjection.push(data);
			setEarningsProjection(dataEarningsProjection);

		} catch (error) {
			console.error(error.response.data);
		}

	}

	return (
		<Container>
			<h2>Projeção de ganhos</h2>
			<form onSubmit={handleSubmit}>
				<Row>
					<Col>
						<label>Simbolo da ação:</label>
						<input
							type="text"
							placeholder='Ex. PETR4.SA'
							onChange={(e) => setSymbol(e.target.value)}
						/>
					</Col>
					<Col>
						<label>Valor comprado R$: </label>
						<input
							type="number"
							placeholder='Ex. R$ 250'
							onChange={(e) => setPurchasedAmount(Number(e.target.value))}

						/>
					</Col>
					<Col>
						<label>Data da compra:</label>
						<DatePicker
							selected={purchasedDate}
							onChange={(date: Date) => setPurchasedDate(date)}
							isClearable
							showYearDropdown
							dateFormat="dd/MM/yyyy"
							filterDate = {(date) => {
								return new Date() > date;
							}}
						/>
					</Col>
					<Col>
						<Button type="submit">
							Projetar ganhos
						</Button>
					</Col>
				</Row>
			</form>
			<Content>
				<DataTableComponent
					columns={columns}
					data={earningsProjection}
				/>
			</Content>
		</Container>
	);
}
