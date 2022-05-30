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

function SiteShowContent() {

  const project_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const [site, setSite] = React.useState({})
  const [edit, setEdit] = React.useState(false);
  const [color, setColor] = React.useState('success');
  const [text, setText] = React.useState('Editar');
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
  
    if (!accessToken && !site._id) {
      RequestAccessToken();
      obtainData();
    } else if(accessToken && !site._id) {
      obtainData();
    }  
  }, [accessToken]);

  const obtainData = async () => {
    const bearer = `Bearer ${accessToken}`;
    const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}/excavationSite/${site_id}`,{
      method: "GET",
      headers: {
      Authorization: bearer
      }
    })
    const raw = await data.json()
    setSite(raw)
    console.log(raw)
  }
  
  const handleEdit = async (id) => {
     const bearer = `Bearer ${accessToken}`;
      await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}/updateExcavationSite/${site_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify({
        name: site.name,
        status: site.status
      })
    })
    navigate(`/proyects/${project_id}/sites`)
  }

  const handleTextfield = () => {
    if (edit){
      setColor("success")
      navigate(`/proyects/${project_id}/sites`)
    }
    else{
      setColor("error")
      setEdit(!edit)
      setText("Cancelar")
    }
    
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sitio {site.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
                <Button
                  variant="outlined"
                  floated="right"
                  onClick={handleTextfield}
                  sx={{ mt: 3, ml: 1 }}
                  color = {color}
                  value="EDITAR"
                >
                  {text}
                </Button>
              </Grid>

            <Grid item xs={12}>
              Nombre:
              <TextField
                disabled={!edit}
                required
                helperText="Nombre del Sitio"
                id="name"
                name="name"
                fullWidth
                autoComplete="name"
                value={site.name}
                onChange={(e) => setSite({...site, name: e.target.value})}
              />
              {edit &&(<Button
                variant="contained"
                onClick={handleEdit}
                sx={{ mt: 3, ml: 1 }}
                color = "success"
              >
                Guardar Cambios
                </Button>)}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
function SiteShow(){
  return(
    <><AuthenticatedTemplate>
        <SiteShowContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
            <p>Aún no has iniciado sesión</p>
        </UnauthenticatedTemplate></>  
);

}
export default SiteShow;