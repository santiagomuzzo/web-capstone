import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, 
  useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es} from 'date-fns/locale'
import NoSession from '../../components/NoSession';

const DATA_FORM = {
  status:"Activo",
  startDepth: 0,
  endDepth: 0,
  index: 0,
  date: "",
  feature: "",
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



function NewLevelContent() {
   const navigate = useNavigate();
   const [date, setDate] = React.useState(new Date());
   const { instance, accounts} = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = React.useState(null);

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: account
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
      });
    });
  };
  React.useEffect(() => {  
    if (!accessToken){
      RequestAccessToken();
    } 
  }, [accessToken]);

   async function handleSubmit() {
    const bearer = `Bearer ${accessToken}`;
    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    const unit_id = window.location.pathname.split("/")[6];
    DATA_FORM.date = date;

    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/createLevel`, {
      method: 'POST',
      body: JSON.stringify(DATA_FORM),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: bearer,
    },
  });
  navigate(`/Proyects/${proyect_id}/Sites/${site_id}/Units/${unit_id}/Levels`)
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
              Nuevo Nivel
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                
                <TextField
                    type="number"
                    required
                    id="index"
                    name="Indice"
                    label="Indice"
                    fullWidth
                    autoComplete="Indice"
                    helperText="Indice del nivel"
                    autoFocus
                    onChange={(e) => {DATA_FORM.index = e.target.value}}
                  />
                  Profundidad Inicial:
                  <TextField
                    type="number"
                    required
                    id="start_depth"
                    name="Profundidad inicial"
                    fullWidth
                    autoComplete="Profundidad inicial"
                    helperText="Profundidad inicial del nivel"
                    InputProps={{
                      inputProps: { 
                          min: 0,
                          step: 5
                      }
                  }}
                    onChange={(e) => {DATA_FORM.startDepth = e.target.value}}
                  />
                  Profundidad Final:
                  <TextField
                    type="number"
                    required
                    id="end_depth"
                    name="Profundidad final"
                    fullWidth
                    autoComplete="Profundidad final"
                    helperText="Profundidad final del nivel"
                    InputProps={{
                      inputProps: { 
                          min: 0,
                          step: 5 
                      }
                  }}
                    onChange={(e) => {DATA_FORM.endDepth = e.target.value}}
                  />
                  Fecha:
                  <DatePicker
                  dateFormat="dd/MM/yyyy"
                  locale={es}
                  selected={date}
                  onChange={(date) => setDate(date)} />

                  Características:
                  <TextField
                    required
                    id="feature"
                    name="Caracteristica"
                    fullWidth
                    autoComplete="Caracteristica"
                    helperText="Características del nivel"

                    onChange={(e) => {DATA_FORM.feature = e.target.value}}
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
function NewLevel(){
  return(
      <><AuthenticatedTemplate>
          <NewLevelContent/>
      </AuthenticatedTemplate><UnauthenticatedTemplate>
              <NoSession/>
          </UnauthenticatedTemplate></>  
  );
  


}

export default NewLevel;