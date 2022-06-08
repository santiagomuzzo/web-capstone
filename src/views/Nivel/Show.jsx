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
import NoSession from '../../components/NoSession';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function LevelShowContent() {

  const project_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const unit_id = window.location.pathname.split("/")[6];
  const level_id = window.location.pathname.split("/")[8];
  const [level, setLevel] = React.useState({})
  const [date, setDate] = React.useState(new Date());
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
  
    if (!accessToken && !level._id) {
      RequestAccessToken();
      obtainData();
    } else if(accessToken && !level._id) {
      obtainData();
    }  
  }, [accessToken]);

  const obtainData = async () => {
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}`,{
      method: "GET",
      headers: {
      Authorization: bearer
      }
    })
    const raw = await data.json()
    setLevel(raw)
    console.log("LEVEL RAW", raw)
    console.log("LEVEL LEVEL", level)
    if (raw.date){
      setDate(new Date(raw.date))
    }
  }

  const handleEdit = async () => {
    const bearer = `Bearer ${accessToken}`; 
    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/updateLevel/${level_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify({
        startDepth: level.startDepth,
        endDepth: level.endDepth,
        index: level.index,
        date: date,
        feature: level.feature,
       })
    })
    navigate(`/proyects/${project_id}/sites/${site_id}/units/${unit_id}/levels`)
  }

  const handleTextfield = () => {
    if (edit){
      setColor("success")
      navigate(`/proyects/${project_id}/sites/${site_id}/units/${unit_id}/levels`)
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
            Nivel {level.id}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    floated="right"
                    onClick={handleTextfield}
                    sx={{ mt: 3, ml: 1 }}
                    color = {color}
                  >
                    {text}
                  </Button>
                </Grid>
            <Grid item xs={12}>
            Indice:
            <TextField
                disabled={!edit}
                type="number"
                required
                id="index"
                name="Indice"
                fullWidth
                autoComplete="Indice"
                helperText="Indice del nivel"
                value= {level.index}
                onChange={(e) => setLevel({...level, index: e.target.value})}

              />
              Profundidad Inicial:
              <TextField
                disabled={!edit}
                type="number"
                required
                id="start_depth"
                name="Profundidad inicial"
                fullWidth
                autoComplete="Profundidad inicial"
                helperText="Profundidad inicial del nivel"
                value= {level.startDepth}
                onChange={(e) => setLevel({...level, startDepth: e.target.value})}
              />
              Profundidad Final:
              <TextField
                disabled={!edit}
                type="number"
                required
                id="end_depth"
                name="Profundidad final"
                fullWidth
                autoComplete="Profundidad final"
                helperText="Profundidad final del nivel"
                value= {level.endDepth}
                onChange={(e) => setLevel({...level, endDepth: e.target.value})}
              />
              Fecha:
              <DatePicker
                disabled={!edit}
                dateFormat="dd/MM/yyyy"
                locale={es}
                selected={date}
                onChange={(date) => setDate(date)} />

              Características:
              <TextField
                disabled={!edit}
                required
                id="feature"
                name="Caracteristica"
                fullWidth
                autoComplete="Caracteristica"
                helperText="Características del nivel"
                value= {level.feature}
                onChange={(e) => setLevel({...level, feature: e.target.value})}
                />
              {edit && (<Button
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
function LevelShow(){
  return(
    <><AuthenticatedTemplate>
        <LevelShowContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
            <NoSession/>
        </UnauthenticatedTemplate></>  
);

}

export default LevelShow;