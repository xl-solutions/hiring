import { createStyles, makeStyles } from "@material-ui/core";

export const useSearchBarStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
      maxWidth: 500,
      width: "50%",
    },
    iconButton: {
      padding: 10,
      margin: "0 10px",
    },
    select: {
      width: "40%",
    },
  })
);
