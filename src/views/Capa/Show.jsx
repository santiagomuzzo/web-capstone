import * as React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function LayerShow() {
  const id = window.location.pathname.split("/")[2];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Capa {id}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Nombre"
                fullWidth
                autoComplete="name"
                value={id}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LayerShow;