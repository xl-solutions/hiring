import { Paper } from "@material-ui/core";
import React from "react";

const LoopStock = (props) => {
  const { data: { opening, low, high, closing, pricedAt } } = props;

  return (
    <React.Fragment>
      <Paper style={{ padding: "1vh", margin: "2vh", textAlign: "center" }}>
        {pricedAt} Abertura: R${String(opening.toFixed(2)).replace(".", ",")} Menor: R${String(low.toFixed(2)).replace(".", ",")} 
        <p>Maior: R${String(high.toFixed(2)).replace(".", ",")} Fechamento: R${String(closing.toFixed(2)).replace(".", ",")}</p>
      </Paper>
    </React.Fragment>
  );
}

export default LoopStock;