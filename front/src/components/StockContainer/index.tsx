import {
  Paper,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  TablePagination,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { getGains, IGetHistoryResponse, IStockGains, IStockPriceHistory } from "../../services/stocks";
import { useStyles } from "./styles";

export interface IStockContainerProps {
  stock: IGetHistoryResponse;
  historyLoading: boolean;
}

export function StockContainer({ stock, historyLoading }: IStockContainerProps) {
  const { contentPaper, stockGrid, stockHistoryGrid, stockTitle, customTable } = useStyles();
  const [stockGains, setStockGains] = useState<IStockGains | null>(null);
  const [purchasedAmount, setPurchasedAmount] = useState<number>(100);
  const [purchasedAt, setPurchasedAt] = useState<Date | null>(new Date());
  const [page, setPage] = useState<number>(0);

  function onChangeAmount(amount: number) {
    setPurchasedAmount(amount);
  }

  function onChangePurchaseDate(date: Date) {
    setPurchasedAt(date);
  }

  async function handleGains() {
    if (purchasedAmount >= 100 && purchasedAt !== null) {
      getGains(stock.name, purchasedAmount, purchasedAt.toISOString().split("T")[0]).then((response) => {
        if (response !== undefined || response?.erro === "") {
          setStockGains({
            capitalGains: response.capitalGains,
            purchasedAmount: response.purchasedAmount,
            purchasedAt: response.purchasedAt,
          });
        }
      });
    }
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  return (
    <Paper className={contentPaper}>
      <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12} className={stockGrid}>
          <Typography variant="h4" className={stockTitle}>
            {`${stock?.name} - Último Preço: R$ ${stock?.lastPrice} - Data: ${stock?.pricedAt}`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12} className={stockHistoryGrid}>
          {historyLoading ? (
            <CircularProgress />
          ) : stock.prices && stock.prices.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table className={customTable} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Data</TableCell>
                      <TableCell align="center">Abertura</TableCell>
                      <TableCell align="center">Alta</TableCell>
                      <TableCell align="center">Baixa</TableCell>
                      <TableCell align="center">Fechamento</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stock.prices.slice(page * 10, page * 10 + 10).map((price: IStockPriceHistory, index) => (
                      <TableRow key={index}>
                        {console.log(stock.prices)}
                        <TableCell align="center" component="th" scope="row">
                          {price.pricedAt}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {price.opening}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {price.high}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {price.low}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {price.closing}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={stock.prices.length}
                rowsPerPage={10}
                page={page}
                labelRowsPerPage="Linhas por página:"
                onPageChange={handleChangePage}
              />
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item lg={3} md={3} xs={12} className={stockHistoryGrid}>
          <TextField
            type="number"
            label="Quantidade de compra"
            fullWidth
            value={purchasedAmount}
            onChange={(e) => onChangeAmount(Number(e.target.value))}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12} className={stockHistoryGrid}>
          <DatePicker
            format="yyyy-MM-dd"
            label="Data de compra"
            fullWidth
            onChange={(e) => {
              if (e !== null) {
                onChangePurchaseDate(e);
              }
            }}
            value={purchasedAt}
            maxDate={new Date()}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12} className={stockHistoryGrid}>
          <Button onClick={() => handleGains()} color="primary" fullWidth variant="contained">
            Simular
          </Button>
        </Grid>
        {stockGains && (
          <Grid item lg={12} md={12} xs={12} className={stockHistoryGrid}>
            <Typography variant="h5" className={stockTitle}>
              {`${stockGains.capitalGains <= 0 ? "Prejuizo" : "Lucro"}: R$ ${
                stockGains.capitalGains
              } - Quantidade Comprada: ${stockGains.purchasedAmount} - Comprado em: ${stockGains.purchasedAt}`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
