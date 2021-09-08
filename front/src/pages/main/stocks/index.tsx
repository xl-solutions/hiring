import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CustomSearchBar } from "../../../components/SearchBar";
import { StockContainer } from "../../../components/StockContainer";
import { useStyles } from "../../../globals/styles";
import { getHistory, getStock, IGetHistoryResponse } from "../../../services/stocks";

let mockup: IGetHistoryResponse = {
  name: "VALE3.SA",
  prices: [
    { opening: 100.09, low: 98.55, high: 100.46, closing: 99.5, pricedAt: "2021-08-25" },
    { opening: 99.49, low: 98.23, high: 99.8, closing: 98.23, pricedAt: "2021-08-26" },
    { opening: 99.01, low: 98.9, high: 101, closing: 100.69, pricedAt: "2021-08-27" },
    { opening: 100.82, low: 99.95, high: 101.64, closing: 100.05, pricedAt: "2021-08-30" },
    { opening: 99, low: 97.7, high: 99.26, closing: 98.68, pricedAt: "2021-08-31" },
    { opening: 97.36, low: 95.72, high: 99.59, closing: 98.85, pricedAt: "2021-09-01" },
    { opening: 98.77, low: 97.91, high: 100, closing: 98.54, pricedAt: "2021-09-02" },
    { opening: 100.16, low: 98.51, high: 100.88, closing: 98.61, pricedAt: "2021-09-03" },
    { opening: 96.89, low: 96.16, high: 97.55, closing: 97.06, pricedAt: "2021-09-06" },
  ],
  lastPrice: 0,
  pricedAt: new Date(),
};

export function Stocks() {
  const { customGrid } = useStyles();
  const [stock, setStock] = useState<IGetHistoryResponse>(mockup);

  async function handleSearch(textSearch: string): Promise<void> {
    getStock(textSearch).then((response) => {
      if (response !== undefined || response?.erro === "") {
        setStock({
          prices: [...stock.prices],
          name: response.name,
          lastPrice: response.lastPrice,
          pricedAt: response.pricedAt,
        });
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
