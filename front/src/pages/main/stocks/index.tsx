import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CustomSearchBar } from "../../../components/SearchBar";
import { getStock } from "../../../services/stocks";

export function Stocks() {
  async function handleSearch(textSearch?: string): Promise<void> {
    if (textSearch) {
      getStock(textSearch).then((response) => {
        console.log(response);
      });
    }
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <CustomSearchBar handleSearch={handleSearch} />
      </Grid>
    </Grid>
  );
}
