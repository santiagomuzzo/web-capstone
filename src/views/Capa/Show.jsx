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
    setLayer(raw);
    
    console.log("data de layeeeer RAW", raw)
    const layer = raw;
    console.log("data de layeeeer", layer)
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
        status: layer.status,

        matrixDescription: {
          sedimentType: layer.matrixDescription.sedimentType,
          compaction: layer.matrixDescription.compaction,
          munsell: layer.matrixDescription.munsell,
          inclusionType: layer.matrixDescription.inclusionType,
          inclusionSize: layer.matrixDescription.inclusionSize,
          inclusionDensity: layer.matrixDescription.inclusionDensity,
          organicMatter: layer.matrixDescription.organicMatter,
          humidity: layer.matrixDescription.humidity,
          observations: layer.matrixDescription.observations,
        },

        materialDescription: {
          crockery: layer.materialDescription.crockery,
          metal: layer.materialDescription.metal,
          glass: layer.materialDescription.glass,
          ceramic: layer.materialDescription.ceramic,
          lithic: layer.materialDescription.lithic,
          leather: layer.materialDescription.leather,
          textile: layer.materialDescription.textile,
          animalBones: layer.materialDescription.animalBones,
          wood: layer.materialDescription.wood,
          bioAntro: layer.materialDescription.bioAntro,
          archeoBotanical: layer.materialDescription.archeoBotanical,
          malacological: layer.materialDescription.malacological,
          totalNumber: layer.materialDescription.totalNumber,
          observations: layer.materialDescription.observations,
        },
      })
    })
    setActiveStep(activeStep + 1);
    navigate(`/proyects/${project_id}/sites/${site_id}/units/${unit_id}/levels/${level_id}/layers`)
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
              required
              id="rasgo"
              select
              label="Tipo de Sedimiento"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, sedimentType: e.target.value})}
  
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
              required
              id="compactacion"
              select
              label="Compactación"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, compaction: e.target.value})}
  
            >
              <MenuItem value={"muy_compacta"}>Muy Compacta</MenuItem>
              <MenuItem value={"compacta"}>Compacta</MenuItem>
              <MenuItem value={"semi_compacta"}>Semi Compacta</MenuItem>
              <MenuItem value={"no_compacta"}>No Compacta</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="codigo_munsell"
              label="Código Munsell"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, munsell: e.target.value})}
  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="tipo_de_inclusiones"
              select
              label="Tipo de inclusiones"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, inclusionType: e.target.value})}
  
              
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
              required
              id="tamaño_de_inclusiones"
              select
              label="Tamaño de inclusiones"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, inclusionSize: e.target.value})}
  
            >
              <MenuItem value={"grande"}>Grande</MenuItem>
              <MenuItem value={"mediano"}>Mediano</MenuItem>
              <MenuItem value={"pequeño"}>Pequeño</MenuItem>
              <MenuItem value={"muy_pequeño"}>Muy Pequeño</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="densidad_de_inclusiones"
              select
              label="Densidad de inclusiones"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, inclusionDensity: e.target.value})}
  
            >
              <MenuItem value={"alta"}>Alta</MenuItem>
              <MenuItem value={"media"}>Media</MenuItem>
              <MenuItem value={"baja"}>Baja</MenuItem>
              <MenuItem value={"muy_baja"}>Muy Baja</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="contenido_de_materia_organica"
              select
              label="Contenido de materia orgánica"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, organicMatter: e.target.value})}
  
            >
              <MenuItem value={"alto"}>Alto</MenuItem>
              <MenuItem value={"medio"}>Medio</MenuItem>
              <MenuItem value={"bajo"}>Bajo</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="humedad"
              select
              label="Humedad"
              fullWidth
              variant="standard"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, humidity: e.target.value})}
  
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
              name="observaciones_matriz"
              rows="4"
              cols="50"
              value={layer.matrixDescription}
              onChange={(e) => setLayer({...layer.matrixDescription, observations: e.target.value})}
  
              
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
            id="loza"
            name="Loza"
            label="Loza"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={layer.materialDescription}
            onChange={(e) => setLayer({...layer.materialDescription, crockery: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="metal"
            name="metal"
            label="Metal"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={layer.materialDescription}
            onChange={(e) => setLayer({...layer.materialDescription, metal: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="ceramica"
            name="cerámica"
            label="Cerámica"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={layer.materialDescription}
            onChange={(e) => setLayer({...layer.materialDescription, ceramics: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="vidrio"
            name="vidrio"
            label="Vidrio"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={layer.materialDescription}
            onChange={(e) => setLayer({...layer.materialDescription, glass: e.target.value})}
  
          />
          <Grid item xs={12} sm={6}>
            <TextField
              id="litico"
              name="litico"
              label="Lítico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              value={layer.materialDescription}
              onChange={(e) => setLayer({...layer.materialDescription, lithic: e.target.value})}
  
            />
            <Grid item xs={12} sm={6}>
              <TextField
                id="cuero"
                name="cuero"
                label="Cuero"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, leather: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="textil"
                name="textil"
                label="Textil"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, textile: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="osteofauna"
                name="osteofauna"
                label="Osteofauna"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, animalBones: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="madera"
                name="madera"
                label="Madera"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, wood: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="bioantropologico"
                name="bioantropologico"
                label="Bioantropológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, bioAntro: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="arqueobotanico"
                name="arqueobotanico"
                label="Arqueobotánico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, archeoBotanical: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="malacologico"
                name="malacologico"
                label="Malacológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, malacological: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="total"
                name="total"
                label="Numero Total de Materiales"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, totalNumber: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Obersvaciones de los materiales:</h4>
              <textarea
                name="observaciones_materiales"
                rows="4"
                cols="50"
                value={layer.materialDescription}
                onChange={(e) => setLayer({...layer.materialDescription, observations: e.target.value})}
  
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
                    <Button
                      variant="contained"
                      onClick={handleEdit}
                      sx={{ mt: 3, ml: 1 }}
                      color="success"
                    >
                      Editar
                    </Button>
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
            <p>Aún no has iniciado sesión</p>
        </UnauthenticatedTemplate></>  
);

}





export default LayerShow;