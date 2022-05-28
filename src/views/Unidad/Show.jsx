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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es} from 'date-fns/locale'

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function UnitShowContent() {

  const project_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const unit_id = window.location.pathname.split("/")[6];
  const [unit, setUnit] = React.useState({})
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
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
  
    if (!accessToken && !unit._id) {
      RequestAccessToken();
      obtainData();
    } else if(accessToken && !unit._id) {
      obtainData();
    }  
  });

 

  const obtainData = async () => {
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}`,{
      method: "GET",
      headers: {
      Authorization: bearer
      }
    })
    const raw = await data.json()
    setUnit(raw)
    if (raw.startDate){
      setStartDate(new Date(raw.startDate))
    }
    if (raw.endDate)
    {
      setEndDate(new Date(raw.endDate))
    }

  }
  
  const handleEdit = async (id) => {
    const bearer = `Bearer ${accessToken}`; 
    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer
      },
      body: JSON.stringify({
        name: unit.name,
        status: unit.status,
        UTMNorth: unit.UTMNorth,
        UTMEast: unit.UTMEast,
        startDate: startDate,
        endDate: endDate,
        maxDepth: unit.maxDepth,
        section: unit.section

      })
    })
    navigate(`/proyects/${project_id}/sites/${site_id}/units`)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Unidad {unit.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Nombre:
              <TextField
                required
                helperText="Nombre del Sitio"
                id="name"
                name="name"
                fullWidth
                autoComplete="name"
                value={unit.name}
                onChange={(e) => setUnit({...unit, name: e.target.value})}
              />
              Fecha Inicio:
              <DatePicker
               dateFormat="dd/MM/yyyy"
               locale={es}
               selected={startDate}
               onChange={(date) => setStartDate(date)} />
              Fecha Fin:
              <DatePicker
               dateFormat="dd/MM/yyyy"
               locale={es}
               selected={endDate}
               onChange={(date_end) => setEndDate(date_end)} />
              UTM Norte:
              <TextField
                
                helperText="UTM Norte de la Unidad"
                id="UTMNorth"
                name="UTMNorth"
                fullWidth
                autoComplete="UTMNorth"
                value={unit.UTMNorth}
                onChange={(e) => setUnit({...unit, UTMNorth: e.target.value})}
              />
              UTM Este:
              <TextField
                
                helperText="UTM Este de la Unidad"
                id="UTMEast"
                name="UTMEast"
                fullWidth
                autoComplete="UTMEast"
                value={unit.UTMEast}
                onChange={(e) => setUnit({...unit, UTMEast: e.target.value})}
              />
              Profundidad Máxima:
              <TextField
                
                type = "number"
                helperText="Profundidad Máxima de la unidad"
                id="maxDepth"
                name="maxDepth"
                fullWidth
                autoComplete="maxDepth"
                value={unit.maxDepth}
                onChange={(e) => setUnit({...unit, maxDepth: e.target.value})}
              />
              Seccion:
              <TextField
                
                helperText="Seccion de la unidad"
                id="section"
                name="section"
                fullWidth
                autoComplete="section"
                value={unit.section}
                onChange={(e) => setUnit({...unit, section: e.target.value})}
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
function UnitShow(){
  return(
    <><AuthenticatedTemplate>
        <UnitShowContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
            <p>Aún no has iniciado sesión</p>
        </UnauthenticatedTemplate></>  
);

}
export default UnitShow;