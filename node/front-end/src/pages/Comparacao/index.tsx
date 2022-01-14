import React, {useEffect, useState } from 'react';
import { Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCompare, IGetHistoryResponse } from '../../services/getStock';

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



const Comparacao: React.FC = () => {
  const [stock, setStock] = useState<IGetHistoryResponse>(mockup);
  const [stocks, setStocks] = useState<Array<string>>([]);
  const [stockName, setStockName] = useState<string>("PETR4.SA");
  const [stockNameSecond, setStockNameSecond] = useState<string>("MGLU3.SA");
  const classes = useStyles();


  async function handleCompare(stockPrimary: string, stockSecondary: Array<string>): Promise<void> {
    getCompare(stockPrimary, stockSecondary).then(response => {
      if(!response) {
        setStock({
          name: response.name,
          lastPrice: response.lastPrice,
          pricedAt: response.pricedAt,
        });

      }
      });
  }

  function handleChangeTextPrimary(value: string) {
    setStockName(value);
  };

  function handleChangeTextSecondary(value: string) {
    setStockName(value);
  };


  useEffect(() => {
    handleCompare("PETR4.SA", ["MGLU3.SA"]);
  }, [stockName]);

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Paper style={{ padding: '30px 30px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <span style={{ fontSize: '36px', color: '#3F51B5', fontWeight: 'bold'}}>Comparar Ações</span>
        <TextField id="outlined-basic" label="Ticket" variant="outlined" value={stockName} onChange={(e) => handleChangeTextPrimary(e.target.value)}/>
        <TextField id="outlined-basic" label="Ticket" variant="outlined" value={stockNameSecond} onChange={(e) => handleChangeTextSecondary(e.target.value)}/>
          <Button style={{background:'#3F51B5', color:'white', height: '35px', width: '35px'}} onClick={(e) => {
            e.preventDefault();
            handleCompare(stockName, [stockNameSecond]);
          }}>Buscar</Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
};

export default Comparacao;
