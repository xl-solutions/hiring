/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable, { TableColumn } from 'react-data-table-component';

import { customDataTableStyle } from './styles';

interface IDataTableProps {
	columns: TableColumn<any>[];
	data: Array<{[key: string]: any}>;
}

export function DataTableComponent ({
	columns,
	data,
	...rest
}: IDataTableProps) {
	return(
		<DataTable
			columns={columns}
			data={data}
			customStyles={customDataTableStyle}
			noDataComponent="Não há dados para exibir"
			{...rest}
		/>
	);
}
