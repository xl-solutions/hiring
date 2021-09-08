import { IconButton, Paper, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useState } from "react";
import { useSearchBarStyles } from "./styles";

interface CustomSearchBarProps {
  handleSearch: (textSearch?: string) => Promise<void>;
}

export function CustomSearchBar({ handleSearch }: CustomSearchBarProps) {
  const customClasses = useSearchBarStyles();
  const [stockName, setStockName] = useState<string>("");

  function handleSearchTextChange(value: string) {
    setStockName(value);
  }

  function onSearch() {
    handleSearch(stockName);
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
        onChange={(e) => handleSearchTextChange(e.target.value)}
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
