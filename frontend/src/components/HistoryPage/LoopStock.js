import { Paper } from "@material-ui/core";
import React from "react";

const LoopStock = (props) => {
  const { data: { opening, low, high, closing, pricedAt } } = props;

  return (
    <React.Fragment>
      <Paper>
        {pricedAt} Abertura: {opening} Menor: {low} Maior: {high} Fechamento: {closing}
      </Paper>
    </React.Fragment>
  );
}

export default LoopStock;