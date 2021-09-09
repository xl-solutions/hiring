import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: 600,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  customGrid: {
    width: 1200,
  },
  customStockGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
