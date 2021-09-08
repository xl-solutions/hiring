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
import { useStyles } from "./styles";

export interface IStockContainerProps {
  stock: any;
}

export function StockContainer({ stock }: IStockContainerProps) {
  const { contentPaper, stockGrid, stockHistoryGrid, stockTitle, customTable } = useStyles();
  return (
    <Paper className={contentPaper}>
      <Grid container direction="row">
        <Grid item lg={12} md={12} xs={12} className={stockGrid}>
          <Typography variant="h3" className={stockTitle}>
            {`${stock.name}`}
          </Typography>
        </Grid>
        <Grid item lg={3} md={4} xs={6} className={stockHistoryGrid}>
          <TableContainer component={Paper}>
            <Table className={customTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell align="right">Abertura</TableCell>
                  <TableCell align="right">Alta</TableCell>
                  <TableCell align="right">Baixa</TableCell>
                  <TableCell align="right">Fechamento</TableCell>
                  <TableCell align="right">Fechamento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {stock.prices.map((row: any) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
