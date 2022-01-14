import React, { useState } from 'react';
import { IconButton, Paper, TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { format, compareAsc } from 'date-fns'
import { getProjection, IStockGains } from '../../services/getStock';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

let mockup: IStockGains = {
  name: 'PETR4.SA',
  priceNow: 0,
  pricePurchased: 0,
  purchasedAmount: 0,
  purchasedAt: '',
  gains: 0
};

const Projecao: React.FC = () => {
  const [stock, setStock] = useState<IStockGains>(mockup);
  const [stockName, setStockName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>("");

  function handleProjection() {
    // call the service to get the projection
    getProjection(stockName, fromDate, amount).then(response => {
      if (response) {
        setStock(response);
      }
    }
    );
  }

  return (
      <>
    <Paper component="form">

      <IconButton
        type="submit"
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          handleProjection();
        }}
      >
        <Search />
      </IconButton> 
        <TextField
          id="outlined-basic"
          label="Ticket"
          variant="outlined"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Qtd de Compra"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TextField
          id="outlined-basic"
          label="Data de compra"
          variant="outlined"
          value={fromDate}
          onChange={(e) => setFromDate(format(new Date("07-02-2021"), "yyyy-MM-dd"))}
        />
        <Button style={{background:'#3F51B5', color:'white', height: '35px', width: '35px'}} onClick={(e) => {
            e.preventDefault();
            handleProjection();
          }}>Buscar</Button>
    </Paper>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Ticket</TableCell>
          <TableCell>Quantidade de ações</TableCell>
          <TableCell>Data de compra</TableCell>
          <TableCell>Preço pago</TableCell>
          <TableCell>Preço atual</TableCell>
          <TableCell>Lucro / Prejuizo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell>{stock.name}</TableCell>
            <TableCell>{stock.purchasedAmount}</TableCell>
            <TableCell>{stock.purchasedAt}</TableCell>
            <TableCell>{stock.pricePurchased}</TableCell>
            <TableCell>{stock.priceNow}</TableCell>
            <TableCell>{stock.gains}</TableCell>
            
          </TableRow>
        
      </TableBody>
    </Table>
  </>
  );
};

export default Projecao;
