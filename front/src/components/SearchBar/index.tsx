import { IconButton, Paper, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import { isValid } from "date-fns";
import { useState } from "react";
import { useSearchBarStyles } from "./styles";

interface CustomSearchBarProps {
  stocks: Array<string>;
  handleSearch: (textSearch: string) => Promise<void>;
  handleHistory: (textSearch: string, dateFrom: string, dateTo: string) => Promise<void>;
}

export function CustomSearchBar({ handleSearch, handleHistory, stocks }: CustomSearchBarProps) {
  const customClasses = useSearchBarStyles();
  const [stockName, setStockName] = useState<string>("VALE3.SA");
  const [dateFrom, setDateFrom] = useState<Date | null>(new Date());
  const [dateTo, setDateTo] = useState<Date | null>(new Date());

  function handleSearchTextChange(value: string) {
    setStockName(value);
  }

  function getHistory() {
    if (stockName !== "" && dateFrom !== null && isValid(dateFrom) && dateTo !== null && isValid(dateTo)) {
      handleHistory(stockName, dateFrom.toISOString().split("T")[0], dateTo.toISOString().split("T")[0]);
    }
  }

  function onSearch() {
    if (stockName !== "") {
      handleSearch(stockName);
      getHistory();
    }
  }

  return (
    <Paper component="form" className={customClasses.root}>
      <Autocomplete
        className={customClasses.searchStock}
        value={stockName}
        onChange={(e, value) => {
          if (value) handleSearchTextChange(value);
        }}
        fullWidth
        placeholder="Buscar ativo"
        options={stocks}
        renderInput={(params) => (
          <TextField {...params} fullWidth onChange={(e) => handleSearchTextChange(e.target.value)} />
        )}
      />
      <DatePicker
        format="yyyy-MM-dd"
        label="Data inicial"
        className={customClasses.datePicker}
        fullWidth
        onChange={(e) => setDateFrom(e)}
        value={dateFrom}
        maxDate={new Date()}
      />
      <DatePicker
        label="Data Final"
        format="yyyy-MM-dd"
        className={customClasses.datePicker}
        fullWidth
        onChange={(e) => setDateTo(e)}
        value={dateTo}
        maxDate={new Date()}
      />
      <IconButton
        type="submit"
        className={customClasses.iconButton}
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
}
