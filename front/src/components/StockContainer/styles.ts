import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  contentPaper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 500,
    minHeight: 600,
    margin: 8,
  },
  stockGrid: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" },
  stockTitle: { fontWeight: "bold", margin: "1.5rem 0" },
  stockHistoryGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2rem",
  },
  customTable: {
    minWidth: 650,
  },
}));
