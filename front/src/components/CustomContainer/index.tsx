import { Container, Grid, Paper } from "@material-ui/core";
import { useStyles } from "../../globals/styles";

export function CustomContainer({ children }: any) {
  const { content, container, paper } = useStyles();

  return (
    <main className={content}>
      <Container maxWidth="lg" className={container}>
        <Grid container spacing={2} direction="row" justify="center">
          <Paper className={paper}>{children}</Paper>
        </Grid>
      </Container>
    </main>
  );
}
