import React from 'react';
import { Table, Spinner } from 'reactstrap';

export default function DataTable({ columns, data, loading }) {

  if (loading) {
    return (
      <div
        style={{
          padding: 24,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    )
  }

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          return (
            <tr key={i}>
              {columns.map((column) => <td key={column.key}>{row[column.key]}</td>)}
            </tr>
          );
        })}
      </tbody>
    </Table >
  );
}
