import { CustomContainer } from "../../components/CustomContainer";
import { useStyles } from "../../globals/styles";

export function Layout({ children }: any) {
  const { root } = useStyles();

  return (
    <div className={root}>
      <CustomContainer>{children}</CustomContainer>
    </div>
  );
}
