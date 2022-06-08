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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line no-unused-vars
import { es} from 'date-fns/locale';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MenuItem from "@mui/material/MenuItem";
import NoSession from '../../components/NoSession';

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



function LayerShowContent() {
  const steps = [
    "Descripción Matriz",
    "Descripción Materiales",
  ];
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm />;
      case 1:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const project_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const unit_id = window.location.pathname.split("/")[6];
  const level_id = window.location.pathname.split("/")[8];
  const layer_id = window.location.pathname.split("/")[10];

  const [layer, setLayer] = React.useState({});
  const [matrixDescription, setMatrixDescription] = React.useState({});
  const [materialDescription, setMaterialDescription] = React.useState({});
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
  
    if (!accessToken && !layer._id) {
      RequestAccessToken();
      obtainData();
    } else if(accessToken && !layer._id) {
      obtainData();
    }  
  }, [accessToken]);
  
  const obtainData = async () => {
    const bearer = `Bearer ${accessToken}`; 
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/layer/${layer_id}`,{
      method: "GET",
      headers: {
      Authorization: bearer
      }
    })
    const raw = await data.json()
    setMatrixDescription(raw.matrixDescription);
    setMaterialDescription(raw.materialDescription);
    
    //console.log("data de layeeeer RAW", raw)
    //const layer = raw;
    //console.log("data de layeeeer", layer)
  }

  const handleEdit = async (id) => {
    const bearer = `Bearer ${accessToken}`; 
    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/updateLayer/${layer_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer
      },
      body: JSON.stringify({

        matrixDescription: matrixDescription,

        materialDescription: materialDescription,
      })
    })
    setActiveStep(activeStep + 1);
    navigate(`/proyects/${project_id}/sites/${site_id}/units/${unit_id}/levels/${level_id}/layers`)
  }

  const handleTextfield = () => {
    if (edit){
      setColor("success")
      navigate(`/proyects/${project_id}/sites/${site_id}/units/${unit_id}/levels/${level_id}/layers`)
    }
    else{
      setColor("error")
      setEdit(!edit)
      setText("Cancelar")
    }
    
  }


  function PaymentForm() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Descripción Matriz
        </Typography>
        <Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="rasgo"
              select
              label="Tipo de Sedimiento"
              fullWidth
              variant="standard"
              value={matrixDescription.sedimentType}
              onChange={(e) => setMatrixDescription({...matrixDescription, sedimentType: e.target.value})}
  
            >
              <MenuItem value={"arena"}>Arena</MenuItem>
              <MenuItem value={"arena_arcillosa"}>Arena Arcillosa</MenuItem>
              <MenuItem value={"arena_limosa"}>Arena Limosa</MenuItem>
              <MenuItem value={"arcilla"}>Arcilla</MenuItem>
              <MenuItem value={"arcilla_limosa"}>Arcilla Limosa</MenuItem>
              <MenuItem value={"arcilla_arenosa"}>Arcilla Arenosa</MenuItem>
              <MenuItem value={"limo"}>Limo</MenuItem>
              <MenuItem value={"limo_arenoso"}>Limo Arenoso</MenuItem>
              <MenuItem value={"limo_arcilloso"}>Limo Arcilloso</MenuItem>
            </TextField>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="compactacion"
              select
              label="Compactación"
              fullWidth
              variant="standard"
              value={matrixDescription.compaction}
              onChange={(e) => setMatrixDescription({...matrixDescription, compaction: e.target.value})}
  
            >
              <MenuItem value={"muy_compacta"}>Muy Compacta</MenuItem>
              <MenuItem value={"compacta"}>Compacta</MenuItem>
              <MenuItem value={"semi_compacta"}>Semi Compacta</MenuItem>
              <MenuItem value={"no_compacta"}>No Compacta</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!edit}
              required
              id="codigo_munsell"
              label="Código Munsell"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={matrixDescription.munshell}
              onChange={(e) => setMatrixDescription({...matrixDescription, munshell: e.target.value})}
  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="tipo_de_inclusiones"
              select
              label="Tipo de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionType}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionType: e.target.value})}
  
              
            >
              <MenuItem value={"ausentes"}>Ausentes</MenuItem>
              <MenuItem value={"clastos_angulosos"}>Clastos Angulosos</MenuItem>
              <MenuItem value={"clastos_subangulosos"}>
                Clastos Subangulosos
              </MenuItem>
              <MenuItem value={"clastos_rodados"}>Clastos Rodados</MenuItem>
              <MenuItem value={"grava"}>Grava</MenuItem>
              <MenuItem value={"gravilla"}>Gravilla</MenuItem>
              <MenuItem value={"maicillo"}>Maicillo</MenuItem>
              <MenuItem value={"material_constructivo"}>
                Material constructivo
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="tamaño_de_inclusiones"
              select
              label="Tamaño de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionSize}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionSize: e.target.value})}
  
            >
              <MenuItem value={"grande"}>Grande</MenuItem>
              <MenuItem value={"mediano"}>Mediano</MenuItem>
              <MenuItem value={"pequeño"}>Pequeño</MenuItem>
              <MenuItem value={"muy_pequeño"}>Muy Pequeño</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="densidad_de_inclusiones"
              select
              label="Densidad de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionDensity}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionDensity: e.target.value})}
            >
              <MenuItem value={"alta"}>Alta</MenuItem>
              <MenuItem value={"media"}>Media</MenuItem>
              <MenuItem value={"baja"}>Baja</MenuItem>
              <MenuItem value={"muy_baja"}>Muy Baja</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="contenido_de_materia_organica"
              select
              label="Contenido de materia orgánica"
              fullWidth
              variant="standard"
              value={matrixDescription.organicMatter}
              onChange={(e) => setMatrixDescription({...matrixDescription, organicMatter: e.target.value})}
  
            >
              <MenuItem value={"alto"}>Alto</MenuItem>
              <MenuItem value={"medio"}>Medio</MenuItem>
              <MenuItem value={"bajo"}>Bajo</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="humedad"
              select
              label="Humedad"
              fullWidth
              variant="standard"
              value={matrixDescription.humidity}
              onChange={(e) => setMatrixDescription({...matrixDescription, humidity: e.target.value})}
  
            >
              <MenuItem value={"muy_humeda"}>Muy Húmeda</MenuItem>
              <MenuItem value={"humeda"}>Húmeda</MenuItem>
              <MenuItem value={"ligeramente"}>Ligeramente</MenuItem>
              <MenuItem value={"sin_humedad"}>Sin Humedad</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <h4>Obersvaciones de la Matriz / Descripción del Rasgo:</h4>
            <textarea
              disabled={!edit}
              name="observaciones_matriz"
              rows="4"
              cols="50"
              value={matrixDescription.observations}
              onChange={(e) => setMatrixDescription({...matrixDescription, observations: e.target.value})}
  
              
            ></textarea>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
  function Review() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Descripción de Materiales. Tipo y Cantidad
        </Typography>
  
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="loza"
            name="Loza"
            label="Loza"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.crockery}
            onChange={(e) => setMaterialDescription({...materialDescription, crockery: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="metal"
            name="metal"
            label="Metal"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.metal}
            onChange={(e) => setMaterialDescription({...materialDescription, metal: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="ceramica"
            name="cerámica"
            label="Cerámica"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.ceramic}
            onChange={(e) => setMaterialDescription({...materialDescription, ceramic: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}  
            id="vidrio"
            name="vidrio"
            label="Vidrio"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.glass}
            onChange={(e) => setMaterialDescription({...materialDescription, glass: e.target.value})}
  
          />
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              id="litico"
              name="litico"
              label="Lítico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              value={materialDescription.lithic}
              onChange={(e) => setMaterialDescription({...materialDescription, lithic: e.target.value})}
  
            />
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="cuero"
                name="cuero"
                label="Cuero"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.leather}
                onChange={(e) => setMaterialDescription({...materialDescription, leather: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="textil"
                name="textil"
                label="Textil"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.textile}
                onChange={(e) => setMaterialDescription({...materialDescription, textile: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="osteofauna"
                name="osteofauna"
                label="Osteofauna"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.animalBones}
                onChange={(e) => setMaterialDescription({...materialDescription, animalBones: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="madera"
                name="madera"
                label="Madera"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.wood}
                onChange={(e) => setMaterialDescription({...materialDescription, wood: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="bioantropologico"
                name="bioantropologico"
                label="Bioantropológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.bioAntro}
                onChange={(e) => setMaterialDescription({...materialDescription, bioAntro: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="arqueobotanico"
                name="arqueobotanico"
                label="Arqueobotánico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.archeoBotanical}
                onChange={(e) => setMaterialDescription({...materialDescription, archeoBotanical: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="malacologico"
                name="malacologico"
                label="Malacológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.malacological}
                onChange={(e) => setMaterialDescription({...materialDescription, malacological: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                required
                id="total"
                name="total"
                label="Numero Total de Materiales"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.totalNumber}
                onChange={(e) => setMaterialDescription({...materialDescription, totalNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Obersvaciones de los materiales:</h4>
              <textarea
                disabled={!edit}
                name="observaciones_materiales"
                rows="4"
                cols="50"
                value={materialDescription.observations}
                onChange={(e) => setMaterialDescription({...materialDescription, observations: e.target.value})}
              ></textarea>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }



  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Ficha de Excavación Arqueológica
          </Typography>
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
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por llenar tu Ficha de Excavación.
                </Typography>
                <Typography variant="subtitle1">
                  Tu ficha esta siendo procesada para obtener pronto una
                  respuesta. Lo contacteremos a la brevedad.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1 }}
                      color="success"
                    >
                      Atrás
                    </Button>
                  )}
                  {activeStep !== steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      color="success"
                    >
                      {activeStep === steps.length - 1 ? "Crear" : "Siguiente"}
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    edit && (<Button
                      variant="contained"
                      onClick={handleEdit}
                      sx={{ mt: 3, ml: 1 }}
                      color="success"
                    >
                      Guardar cambios
                    </Button>)
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
function LayerShow(){
  return(
    <><AuthenticatedTemplate>
        <LayerShowContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
            <NoSession/>
        </UnauthenticatedTemplate></>  
);

}





export default LayerShow;