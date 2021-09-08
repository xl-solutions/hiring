import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CustomSearchBar } from "../../../components/SearchBar";
import { StockContainer } from "../../../components/StockContainer";
import { useStyles } from "../../../globals/styles";
import { getHistory, getStock, IGetHistoryResponse, IGetStockResponse } from "../../../services/stocks";

export function Stocks() {
  const { customGrid } = useStyles();
  const [stock, setStock] = useState<IGetStockResponse | null>(null);
  const [stockHistory, setStockHistory] = useState<IGetHistoryResponse | null>(null);

  async function handleSearch(textSearch: string): Promise<void> {
    getStock(textSearch).then((response) => {
      if (response !== undefined || response?.erro === "") {
        setStock(response);
      }
    });
  }

  async function handleHistory(textSearch: string, dateFrom: string, dateTo: string) {
    getHistory(textSearch, dateFrom, dateTo).then((response) => {
      if (response !== undefined || response?.erro === "") {
        console.log(response);
      }
    });
  }

  useEffect(() => {
    handleSearch("VALE3.SA");
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={12} lg={12} className={customGrid}>
        <CustomSearchBar handleSearch={handleSearch} handleHistory={handleHistory} />
      </Grid>
      {stock && (
        <Grid item xs={12} md={12} lg={12} className={customGrid}>
          <StockContainer stock={stock} />
        </Grid>
      )}
    </Grid>
  );
}
