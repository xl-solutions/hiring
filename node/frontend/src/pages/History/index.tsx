import moment from 'moment';
import { FormEvent, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import DatePicker from 'react-datepicker';

import { api } from '../../api';
import { Button } from '../../components/Button';
import { DataTableComponent } from '../../components/DataTable';
import { formatValueToCurrency } from '../../utils';

import { Col, Container, Content, Row } from './styles';

interface IDataRow {
	name: string;
	opening: number;
	high: number;
	low: number;
	closing: number;
	pricedAt: string;
}

const columns: TableColumn<IDataRow>[] = [
	{
		name: 'Nome',
		selector: row => row.name
	},
	{
		name: 'Alta',
		selector: row => formatValueToCurrency(row.high)
	},
	{
		name: 'Baixa',
		selector: row => formatValueToCurrency(row.low)
	},
	{
		name: 'Fechamento',
		selector: row => formatValueToCurrency(row.closing)
	},
	{
		name: 'Data',
		selector: row => moment(row.pricedAt).format('DD/MM/YYYY')
	}
];

export function History() {
	const [symbol, setSymbol] = useState('');
	const [historyPrices, SetHistoryPrices] = useState([]);
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());

	async function handleSubmitHistory (event: FormEvent) {
		event.preventDefault();

		try {
			const { data } = await api.get(
				`${process.env.REACT_APP_API_URL}/${symbol}/history`,
				{ params: { to: toDate, from: fromDate } }
			);

			const historyMapped = data.prices.map((v: IDataRow) => ({
				name: symbol,
				opening: v.opening,
				low: v.low,
				high: v.high,
				closing: v.closing,
				pricedAt: v.pricedAt
			}));

			SetHistoryPrices(historyMapped);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Container>
			<h2>Últimas cotações</h2>
			<form onSubmit={handleSubmitHistory}>
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
						<label>De:</label>
						<DatePicker
							selected={fromDate}
							onChange={(date: Date) => setFromDate(date)}
							isClearable
							showYearDropdown
							dateFormat="dd/MM/yyyy"
							filterDate = {(date) => {
								return new Date() > date;
							}}
						/>
					</Col>
					<Col>
						<label>Até</label>
						<DatePicker
							selected={toDate}
							onChange={(date: Date) => setToDate(date)}
							isClearable
							showYearDropdown
							dateFormat="dd/MM/yyyy"
							filterDate = {(date) => {
								return new Date() > date;
							}}
						/>
					</Col>
					<Col>
						{
							symbol && <Button type="submit">
								Pesquisar
							</Button>
						}
					</Col>
				</Row>
			</form>
			<Content>
				<DataTableComponent
					columns={columns}
					data={historyPrices}
				/>
			</Content>
		</Container>
	);
}
