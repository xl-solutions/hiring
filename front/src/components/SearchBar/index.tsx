import { IconButton, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSearchBarStyles } from "./styles";

interface CustomSearchBarProps {
  filterOptions: Array<{ Key: string; Value: string }>;
  dataOptions: Array<{ Name: string; Region: string }>;
  handleSearch: (textSearch?: string) => void;
}

export function CustomSearchBar({ filterOptions, dataOptions, handleSearch }: CustomSearchBarProps) {
  const customClasses = useSearchBarStyles();
  const [stockName, setStockName] = useState<string | null>(null);

  function handleSearchTextChange(value: string | null) {
    setStockName(value);
  }

  function onSearch() {
    handleSearch(stockName ?? "");
  }

  return (
    <Paper component="form" className={customClasses.root}>
      <TextField
        placeholder="Buscar países"
        fullWidth
        value={stockName}
        onKeyPress={(event) => {
          if (event.key.toUpperCase() === "ENTER") {
            event.preventDefault();
            onSearch();
          }
        }}
        onChange={(e) => console.log(e.target.value)}
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
