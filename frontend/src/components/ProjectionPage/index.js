import React from 'react';
import { Grid, Button, Paper, TextField, Divider } from "@material-ui/core";
import GetData from '../GetData';
import GetDatePicker from '../DatePicker';

const ProjectionPage = () => {
  const [symbol, setSymbol] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  const [error, seterror] = React.useState();
  const [fromDate, setFromDate] = React.useState();
  const [populateArray, setPopulateArray] = React.useState([]);
  const [requestName, setRequestName] = React.useState();
  const [purchasedAmount, setPurchasedAmount] = React.useState();
  const [priceAtDate, setPriceAtDate] = React.useState();
  const [lastPrice, setLastPrice] = React.useState();
  const [capitalGains, setCapitalGains] = React.useState();
  const [purchasedAt, setPurchasedAt] = React.useState();

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  }

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }

  const submit = async () => {
    const query = {
      "purchasedAmount": quantity,
      "purchasedAt": fromDate
    };
    try {
      const result = await GetData("get", `/stocks/${symbol}/gains`, query);
      const { name, purchasedAmount, purchasedAt, priceAtDate, lastPrice, capitalGains } = result;
      setRequestName(name);
      setPurchasedAmount(purchasedAmount);
      setPriceAtDate(String(priceAtDate.toFixed(2)).replace(".", ","));
      setLastPrice(String(lastPrice.toFixed(2)).replace(".", ","));
      setCapitalGains(String(capitalGains.toFixed(2)).replace(".", ","));
      setPurchasedAt(purchasedAt);
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
                  Data Compra
                  <GetDatePicker onDateChange={setFromDate} datesArray={populateArray} />
                </Grid>
                <TextField
                  size="small"
                  id="stock-quantity"
                  style={{ marginTop: "2vh" }}
                  label="Quantidade de Ações"
                  placeholder="ex.: 100"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  required
                  variant="outlined"
                />
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
                  <Paper style={{ padding: "1vh", margin: "2vh", textAlign: "center" }}>
                    <p>Ação: {requestName} Quantidade: {purchasedAmount}</p>
                    <p>Preço: R${priceAtDate} em {purchasedAt}</p>
                    <p>Preço Atual: R${lastPrice} Ganhos: R${capitalGains}</p>                   
                  </Paper>
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

export default ProjectionPage;