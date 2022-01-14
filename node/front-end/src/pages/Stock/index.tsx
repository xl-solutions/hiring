import React, {useEffect, useState} from 'react';
import { Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { getStock, IGetHistoryResponse } from '../../services/getStock';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let mockup: IGetHistoryResponse = {
  name: 'IBM',
  lastPrice: 0,
  pricedAt: new Date(),
};



const Stock: React.FC = () => {
  const [stock, setStock] = useState<IGetHistoryResponse>(mockup);
  const [stockName, setStockName] = useState<string>("");
  const classes = useStyles();


  async function handleSearch(textSearch: string): Promise<void> {
    getStock(textSearch).then(response => {
      if(response) {
        setStock(response); 
      }
      });
  }

  function handleChangeText(value: string) {
    setStockName(value);
  };

  // useEffect(() => {
  //   handleSearch("PETR4.SA");
  // }, [stockName]);



  return (
    <Paper style={{ padding: '30px 30px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <span style={{ fontSize: '36px', color: '#3F51B5', fontWeight: 'bold'}}>Buscar Ação</span>
        <TextField id="outlined-basic" label="Ticket" variant="outlined" value={stockName} onChange={(e) => handleChangeText(e.target.value)}/>
          <Button style={{background:'#3F51B5', color:'white', height: '35px', width: '35px'}} onClick={(e) => {
            e.preventDefault();
            handleSearch(stockName);
          }}>Buscar</Button>
      </div>
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
              {/* <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.lastPrice}</TableCell>
              <TableCell>{stock.pricedAt}</TableCell> */}
            
          </TableRow>
        
      </TableBody>
    </Table>
      {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Valor atual</TableCell>
            <TableCell>Ultima consulta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.lastPrice}</TableCell>
              <TableCell>{stock.pricedAt}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer> */}
    </Paper>
  )
};

export default Stock;
