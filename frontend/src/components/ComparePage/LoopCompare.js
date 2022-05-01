import { Paper } from "@material-ui/core";
import React from "react";

const LoopCompare = (props) => {
  const { data: { lastPrice, name, pricedAt } } = props;

  return (
    <React.Fragment>
      <Paper style={{ padding: "1vh", margin: "2vh", textAlign: "center" }}>
        {pricedAt} Ação: {name} Ultimo Preço: R${String(lastPrice.toFixed(2)).replace(".", ",")} 
      </Paper>
    </React.Fragment>
  );
}

export default LoopCompare;