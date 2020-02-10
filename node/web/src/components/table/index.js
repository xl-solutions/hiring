import React from 'react';
import { Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useTable, usePagination } from 'react-table'

export default function DataTable({ columns, data, loading }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

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
    <>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {!!data.length && (
        <div className="pagination" style={{ alignItems: 'center' }}>
          <Pagination style={{ marginRight: 10 }}>
            <PaginationItem>
              <PaginationLink first onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => previousPage()} disabled={!canPreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next onClick={() => nextPage()} disabled={!canNextPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
            </PaginationItem>
          </Pagination>

          <span>
            <span style={{ marginRight: 5 }}>Página</span>
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>
          </span>
        </div>
      )}
    </>
  );
}
