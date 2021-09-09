import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CustomContainer } from "../../components/CustomContainer";
import DateFnsUtils from "@date-io/date-fns";
import { useStyles } from "../../globals/styles";

export function Layout({ children }: any) {
  const { root } = useStyles();

  return (
    <div className={root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CustomContainer>{children}</CustomContainer>
      </MuiPickersUtilsProvider>
    </div>
  );
}
