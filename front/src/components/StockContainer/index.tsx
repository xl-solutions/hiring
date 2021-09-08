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
} from "@material-ui/core";
import { IGetHistoryResponse, IStockPriceHistory } from "../../services/stocks";
import { useStyles } from "./styles";

export interface IStockContainerProps {
  stock: IGetHistoryResponse;
}

export function StockContainer({ stock }: IStockContainerProps) {
  const { contentPaper, stockGrid, stockHistoryGrid, stockTitle, customTable } = useStyles();
  return (
    <Paper className={contentPaper}>
      <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12} className={stockGrid}>
          <Typography variant="h4" className={stockTitle}>
            {`${stock.name} - Último Preço: R$ ${stock.lastPrice} - Data: ${stock.pricedAt}`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12} className={stockHistoryGrid}>
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
                {stock &&
                  stock.prices.map((stock: IStockPriceHistory, index) => (
                    <TableRow key={index}>
                      <TableCell align='center' component="th" scope="row">
                        {stock.pricedAt}
                      </TableCell>
                      <TableCell align='center' component="th" scope="row">
                        {stock.opening}
                      </TableCell>
                      <TableCell align='center' component="th" scope="row">
                        {stock.high}
                      </TableCell>
                      <TableCell align='center' component="th" scope="row">
                        {stock.low}
                      </TableCell>
                      <TableCell align='center' component="th" scope="row">
                        {stock.closing}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
