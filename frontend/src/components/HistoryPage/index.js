import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, TextField, Divider } from "@material-ui/core";
import GetData from '../GetData';
import GetDatePicker from '../DatePicker';
import LoopStock from './LoopStock';

const useStyles = makeStyles({
  paperResult: {
    margin: "1vh",
    padding: "1vh",
    textAlign: "center",
  },
});

const HistoryPage = () => {
  const classes = useStyles();
  const [symbol, setSymbol] = React.useState([]);
  const [error, seterror] = React.useState();
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const [populateArray, setPopulateArray] = React.useState([]);
  const [requestName, setRequestName] = React.useState();
  const [requestPrices, setRequestPrices] = React.useState();
  const [requestPricedAt, setRequestPricedAt] = React.useState();

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  }

  const submit = async () => {
    const query = {
      "from": fromDate,
      "to": toDate
    };
    try {
      const result = await GetData("get", `/stocks/${symbol}/history`, query);
      const { name, prices } = result;
      setRequestName(name);
      setRequestPrices(prices);
    } catch (err) {
      seterror(err);
    }
  }

  const getDates = async () => {
    try {
      const result = await GetData("get", `/stocks/${symbol}/populate`);
      setPopulateArray(result);
    } catch (err) {
      seterror(err);
    }
  }


  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6} >
        <Paper elevation={4} style={{ padding: "5vh", textAlign: "center" }}>
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item xs={6}>
              <TextField
                size="small"
                id="stock-quote"
                style={{ marginTop: "2vh" }}
                label="Código Ação"
                placeholder="ex.: PETR4.SAO"
                value={symbol}
                onChange={handleChangeSymbol}
                required
                variant="outlined"
              />
              <Button
                style={{ margin: "2vh" }}
                size="medium"
                type="submit"
                color="primary"
                variant="outlined"
                onClick={() => getDates()}
              >Datas</Button>
            </Grid>
          </Grid>
          {(populateArray.length
            ? <React.Fragment>
              <Grid container justifyContent="center" alignItems="center" >
                <Grid item xs={4}>
                  Data Inicial
                  <GetDatePicker onDateChange={setFromDate} datesArray={populateArray} />
                </Grid>
                <Grid item xs={4}>
                  Data Final
                  <GetDatePicker onDateChange={setToDate} datesArray={populateArray} />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" alignItems="flex-end" >
                <Button
                  style={{ margin: "2vh" }}
                  size="medium"
                  type="submit"
                  color="primary"
                  variant="outlined"
                  onClick={() => submit()}
                >
                  Buscar
                </Button>
              </Grid>
            </React.Fragment>
            : null)}
          {(requestName
            ? (<React.Fragment>
              <Divider />
              <Grid container justifyContent="center" alignItems="center" >
                <Grid item xs={12} >
                  {requestPrices?.map((data) => (
                    <LoopStock key={data.pricedAt} data={data} />
                  ))}
                </Grid>
              </Grid>
            </React.Fragment>)
            : error
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HistoryPage;