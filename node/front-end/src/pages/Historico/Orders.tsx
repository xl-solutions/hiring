import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

interface Order {
  date: string,
  name: string,
  opening: number,
  low: number,
  high: number,
  closing: number
}

// Generate Order Data
function createData(
  date: string,
  name: string,
  opening: number,
  low: number,
  high: number,
  closing: number
): Order {
  return { date, name, opening, low, high, closing };
}

const rows = [
  createData('2020-08-20', 'IBM', 90, 91, 90.5, 90.34),
  createData('2020-08-20', 'AAPL', 543, 544, 541.5, 543.21),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Title>Historico recente da ação</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Abertura</TableCell>
            <TableCell>baixa</TableCell>
            <TableCell>Alta</TableCell>
            <TableCell>Fechamento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.opening}</TableCell>
              <TableCell>{row.low}</TableCell>
              <TableCell>{row.high}</TableCell>
              <TableCell align="right">{row.closing}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;
