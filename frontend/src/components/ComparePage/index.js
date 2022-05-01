import React from 'react';
import { Grid, Button, Paper, TextField, Divider } from "@material-ui/core";
import GetData from '../GetData';
import LoopCompare from './LoopCompare';

const ComparePage = () => {
  const [symbol, setSymbol] = React.useState([]);
  const [error, seterror] = React.useState();
  const [requestLastPrices, setRequestLastPrices] = React.useState();

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  }

  const submit = async () => {
    try {
      const symbolArray = symbol.split(",");
      const stockSymbol = symbolArray[0];
      symbolArray.shift();
      const body = {
        "stocks": symbolArray
      }
      const result = await GetData("post", `/stocks/${stockSymbol}/compare`, "", body);
      setRequestLastPrices(result.lastPrices);
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
            <TextField
              id="stock-quote"
              style={{ marginTop: "2vh" }}
              label="Código Ação"
              placeholder="ex.: PETR4.SAO, VALE3.SA"
              value={symbol}
              onChange={handleChangeSymbol}
              required
              variant="outlined"
            />
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="flex-end" >
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
          {(requestLastPrices
            ? (<React.Fragment>
              <Divider />
              <Grid container justifyContent="center" alignItems="center" >
                <Grid item xs={12} >
                  {requestLastPrices?.map((data) => (
                    <LoopCompare key={data.name} data={data} />
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

export default ComparePage;