import DataTable, { TableColumn } from 'react-data-table-component';

import { customDataTableStyle } from './styles';

interface IDataRow {
	name: string;
	lastPrice: number;
	pricedAt: string;
}

interface IDataTableProps {
	columns: TableColumn<IDataRow>[];
	stocks: Array<{
		name: string;
		lastPrice: number;
		pricedAt: string;
	}>;
}

export function DataTableComponent ({
	columns,
	stocks,
	...rest
}: IDataTableProps) {
	return(
		<DataTable
			columns={columns}
			data={stocks}
			customStyles={customDataTableStyle}
			noDataComponent="Não há dados para exibir"
			{...rest}
		/>
	);
}
