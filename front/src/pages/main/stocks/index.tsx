import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CustomSearchBar } from "../../../components/SearchBar";
import { StockContainer } from "../../../components/StockContainer";
import { useStyles } from "../../../globals/styles";
import { getHistory, getStock, IGetHistoryResponse } from "../../../services/stocks";

let mockup: IGetHistoryResponse = {
  name: "VALE3.SA",
  prices: [],
  lastPrice: 0,
  pricedAt: new Date(),
};

export function Stocks() {
  const { customGrid, customStockGrid } = useStyles();
  const [stock, setStock] = useState<IGetHistoryResponse>(mockup);
  const [stocks, setStocks] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  async function handleSearch(textSearch: string): Promise<void> {
    setLoading(true);
    getStock(textSearch).then((response) => {
      if (response !== undefined || response?.erro === "") {
        setStock({
          name: response.name,
          lastPrice: response.lastPrice,
          pricedAt: response.pricedAt,
          prices: [...stock.prices],
        });
        setLoading(false);
        if (!stocks.includes(response.name)) {
          setStocks([...stocks, response.name]);
        }
      }
    });
  }

  async function handleHistory(textSearch: string, dateFrom: string, dateTo: string) {
    setHistoryLoading(true);
    getHistory(textSearch, dateFrom, dateTo).then((response) => {
      if (response !== undefined || response?.erro === "") {
        setStock({ ...stock, prices: response.prices });
        setHistoryLoading(false);
      }
    });
  }

  useEffect(() => {
    handleSearch("VALE3.SA");
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={12} lg={12} className={customGrid}>
        <CustomSearchBar handleSearch={handleSearch} handleHistory={handleHistory} stocks={stocks} />
      </Grid>
      <>
        <Grid item xs={12} md={12} lg={12} className={customStockGrid}>
          {loading ? <CircularProgress /> : <StockContainer historyLoading={historyLoading} stock={stock} />}
        </Grid>
      </>
    </Grid>
  );
}
