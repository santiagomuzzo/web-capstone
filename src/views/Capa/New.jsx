/* eslint-disable no-unused-vars */
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
import { es} from 'date-fns/locale';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MenuItem from "@mui/material/MenuItem";
import NoSession from '../../components/NoSession';

const DATA_FORM = {
  status: 'Activo',
  matrixDescription: {
    sedimentType: "",
    compaction: "",
    munshell: "",
    inclusionType: "",
    inclusionSize: "",
    inclusionDensity: "",
    organicMatter: "",
    humidity: "",
    observations: "",
  },
  materialDescription: {
    crockery: 0,
    metal: 0,
    glass: 0,
    ceramic: 0,
    lithic: 0,
    leather: 0,
    textile: 0,
    animalBones: 0,
    wood: 0,
    bioAntro: 0,
    archeoBotanical: 0,
    malacological: 0,
    totalNumber: 1,
    observations: "",
  },
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

function NewLayerContent () {
  const [activeStep, setActiveStep] = React.useState(0);
  const { instance, accounts} = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = React.useState(null);
  React.useEffect(() => {  
    if (!accessToken){
      RequestAccessToken();
    } 
}, [accessToken]);
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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const navigate = useNavigate();

  async function handleSubmit(){
    const bearer = `Bearer ${accessToken}`;
    console.log("data form:", DATA_FORM)
    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    const unit_id = window.location.pathname.split("/")[6];
    const level_id = window.location.pathname.split("/")[8];
    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/createLayer`, {
      method: 'POST',
      body: JSON.stringify(DATA_FORM),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: bearer,
    },
  });
  setActiveStep(activeStep + 1);
  navigate(`/Proyects/${proyect_id}/Sites/${site_id}/Units/${unit_id}/Levels/${level_id}/Layers`)
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
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                      color="success"
                    >
                      Crear
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
  )
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.sedimentType = e.target.value)
            }
          >
            <MenuItem value={"Arena"}>Arena</MenuItem>
            <MenuItem value={"Arena Arcillosa"}>Arena Arcillosa</MenuItem>
            <MenuItem value={"Arena Limosa"}>Arena Limosa</MenuItem>
            <MenuItem value={"Arcilla"}>Arcilla</MenuItem>
            <MenuItem value={"Arcilla Limosa"}>Arcilla Limosa</MenuItem>
            <MenuItem value={"Arcilla Arenosa"}>Arcilla Arenosa</MenuItem>
            <MenuItem value={"Limo"}>Limo</MenuItem>
            <MenuItem value={"Limo Arenoso"}>Limo Arenoso</MenuItem>
            <MenuItem value={"Limo Arcilloso"}>Limo Arcilloso</MenuItem>
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.compaction = e.target.value)
            }
          >
            <MenuItem value={"Muy Compacta"}>Muy Compacta</MenuItem>
            <MenuItem value={"Compacta"}>Compacta</MenuItem>
            <MenuItem value={"Semi Compacta"}>Semi Compacta</MenuItem>
            <MenuItem value={"No Compacta"}>No Compacta</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="color"
            select
            label="Color"
            fullWidth
            variant="standard"
            onChange={(e) =>
              (DATA_FORM.matrixDescription.color = e.target.value)
            }
          >
            <MenuItem value={"Blanco"}>Blanco</MenuItem>
            <MenuItem value={"Gris"}>Gris</MenuItem>
            <MenuItem value={"Gris osucro"}>Gris Oscuro</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="codigo_munshell"
            label="Código Munsell"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e) =>
              (DATA_FORM.matrixDescription.munshell = e.target.value)
            }
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.inclusionType = e.target.value)
            }
          >
            <MenuItem value={"Ausentes"}>Ausentes</MenuItem>
            <MenuItem value={"Clastos Angulosos"}>Clastos Angulosos</MenuItem>
            <MenuItem value={"Clastos Subangulosos"}>Clastos Subangulosos</MenuItem>
            <MenuItem value={"Clastos Rodados"}>Clastos Rodados</MenuItem>
            <MenuItem value={"Grava"}>Grava</MenuItem>
            <MenuItem value={"Gravilla"}>Gravilla</MenuItem>
            <MenuItem value={"Maicillo"}>Maicillo</MenuItem>
            <MenuItem value={"Material Constructivo"}>Material constructivo</MenuItem>
            <MenuItem value={"Otro"}>Otro</MenuItem>
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.inclusionSize = e.target.value)
            }
          >
            <MenuItem value={"Grandes"}>Grandes</MenuItem>
            <MenuItem value={"Medianos"}>Medianos</MenuItem>
            <MenuItem value={"Pequeños"}>Pequeños</MenuItem>
            <MenuItem value={"Muy Pequeños"}>Muy Pequeños</MenuItem>
            <MenuItem value={"No Aplica"}>No Aplica</MenuItem>
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.inclusionDensity = e.target.value)
            }
          >
            <MenuItem value={"Alta"}>Alta</MenuItem>
            <MenuItem value={"Media"}>Media</MenuItem>
            <MenuItem value={"Baja"}>Baja</MenuItem>
            <MenuItem value={"Muy Baja"}>Muy Baja</MenuItem>
            <MenuItem value={"No Aplica"}>No Aplica</MenuItem>
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.organicMatter = e.target.value)
            }
          >
            <MenuItem value={"Alto"}>Alto</MenuItem>
            <MenuItem value={"Medio"}>Medio</MenuItem>
            <MenuItem value={"Bajo"}>Bajo</MenuItem>
            <MenuItem value={"No Se Encuentra"}>No Se Encuentra</MenuItem>
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.humidity = e.target.value)
            }
          >
            <MenuItem value={"Muy Humeda"}>Muy Húmeda</MenuItem>
            <MenuItem value={"Humeda"}>Húmeda</MenuItem>
            <MenuItem value={"Ligeramente"}>Ligeramente</MenuItem>
            <MenuItem value={"Sin Humedad"}>Sin Humedad</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <h4>Observaciones de la Matriz / Descripción del Rasgo:</h4>
          <textarea
            name="observaciones_matriz"
            rows="4"
            cols="50"
            onChange={(e) =>
              (DATA_FORM.matrixDescription.observations = e.target.value)
            }
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
          onChange={(e) =>
            (DATA_FORM.materialDescription.crockery = e.target.value)
          }
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
          onChange={(e) =>
            (DATA_FORM.materialDescription.metal = e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="ceramica"
          name="ceramica"
          label="Cerámica"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          type="number"
          onChange={(e) =>
            (DATA_FORM.materialDescription.ceramic = e.target.value)
          }
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
          onChange={(e) =>
            (DATA_FORM.materialDescription.glass = e.target.value)
          }
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
            onChange={(e) =>
              (DATA_FORM.materialDescription.lithic = e.target.value)
            }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.leather = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.textile = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.animalBones = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.wood = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.bioAntro = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.archeoBotanical = e.target.value)
              }
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
              onChange={(e) =>
                (DATA_FORM.materialDescription.malacological = e.target.value)
              }
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
                onChange={(e) =>
                  (DATA_FORM.materialDescription.totalNumber = e.target.value)
                }
                
                
              />
            </Grid>
          <Grid item xs={12}>
            <h4>Observaciones de los materiales:</h4>
            <textarea
              name="observaciones_materiales"
              rows="4"
              cols="50"
              onChange={(e) =>
                (DATA_FORM.materialDescription.observations = e.target.value)
              }
            ></textarea>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
function NewLayer(){
  return(
    <><AuthenticatedTemplate>
        <NewLayerContent/>
    </AuthenticatedTemplate><UnauthenticatedTemplate>
    <NoSession/>
    </UnauthenticatedTemplate></>  
);

}
export default NewLayer;

