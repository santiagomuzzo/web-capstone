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

// eslint-disable-next-line no-unused-vars
import { useDomain, defineDomain } from '../../useDomain';

const DATA_FORM = {
  name: '',
  status: 'Activo',
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




function NewSiteContent() {

  // eslint-disable-next-line no-unused-vars
  const {domain, setDomain} = useDomain()
  const navigate = useNavigate();

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
    } });
  
  async function handleSubmit(domain){
    const bearer = `Bearer ${accessToken}`;
    const id = domain.projectId
    await fetch(`${process.env.REACT_APP_API_URL}/project/${id}/createExcavationSite`, {
      method: 'POST',
      body: JSON.stringify(DATA_FORM),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: bearer,
    },
  });
    navigate(`/Proyects/${id}/Sites`)
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
              Nuevo Sitio
            </Typography>
            <br></br>
            <form onSubmit={() => handleSubmit(domain)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nombre del Sitio"
                    fullWidth
                    autoComplete="name"
                    autoFocus
                    onChange={(e) => {DATA_FORM.name = e.target.value}}
                  />
                  <Button
                      variant="contained"
                      onClick={() => handleSubmit(domain)}
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
function NewSite(){
  return(
      <><AuthenticatedTemplate>
          <NewSiteContent/>
      </AuthenticatedTemplate><UnauthenticatedTemplate>
              <p>Aún no has iniciado sesión</p>
          </UnauthenticatedTemplate></>  
  );
}

export default NewSite;