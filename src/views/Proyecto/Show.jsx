import * as React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, 
  useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function ProyectShowContent() {

  const project_id = window.location.pathname.split("/")[2];
  const [project, setProject] = React.useState({})
  const navigate = useNavigate();

  //Codigo para obtener el Token
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
  }
  //

  React.useEffect(() => {
  
    if (!accessToken && !project._id) {
      RequestAccessToken();
      obtainData();
    } else if(accessToken && !project._id) {
      obtainData();
    }  
  });

  const obtainData = async () => {
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`,{
      method: "GET",
      headers: {
      Authorization: bearer
      }
    })
    const raw = await data.json()
    setProject(raw)
  }
  
  const handleEdit = async (id) => {
    if(!accessToken) RequestAccessToken();
    const bearer = `Bearer ${accessToken}`; 
    await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify({
        name: project.name,
      })
    })
    navigate("/proyects")
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Proyecto {project.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Nombre:
              <TextField
                required
                helperText="Nombre del Proyecto"
                id="name"
                name="name"
                fullWidth
                autoComplete="name"
                value={project.name}
                onChange={(e) => setProject({...project, name: e.target.value})}
              />
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{ mt: 3, ml: 1 }}
                color = "success"
              >
                Editar
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

function ProyectShow(){
  return(
    <><AuthenticatedTemplate>
        <ProyectShowContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
            <p>Aún no has iniciado sesión</p>
        </UnauthenticatedTemplate></>  
);

}

export default ProyectShow;