import * as React from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const DATA_FORM = {
  nombre: '',
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function Copyright() {
return (
    <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://www.mankuk.com/">
        Mankuk
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
);
}


function NewLayer () {
  const navigate = useNavigate();

  async function handleSubmit(){
    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    const unit_id = window.location.pathname.split("/")[6];
    const level_id = window.location.pathname.split("/")[8];
    await fetch(`https://test-mankuk-api.azurewebsites.net/unit/${unit_id}/level/${level_id}/createLayer`, {
      method: 'POST',
      body: JSON.stringify(DATA_FORM),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
  });
  navigate(`/Proyects/${proyect_id}/Sites/${site_id}/Units/${unit_id}/Levels/${level_id}/Layers`)
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Paper sx={{
            padding: '1.5rem',
            margin: '1rem',
            width: '100%',
            maxWidth: '500px',
          }}>
            <Typography component="h1" variant="h5">
              Nueva Capa
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="status"
                    name="status"
                    label="Status"
                    fullWidth
                    autoComplete="status"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => {
                      DATA_FORM.status = e.target.value
                    }}
                  />
                  <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                      color = "success"
                    >
                      Crear
                    </Button>
                </Grid>
              </Grid >
            </form>
          </Paper>
        </Box>
        <Copyright />
      </Container>
      </ThemeProvider>
    </div>

  )
}

export default NewLayer;