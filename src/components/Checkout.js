import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
//import { AddressForm, PaymentForm, Review} from './AddressForm';
//import PaymentForm from './PaymentForm';
//import Review from './Review';

const DATA_FORM = {
  projectName: "",
  date: "",
  site: "",
  coordE: "",
  coordN: "",
  unit: "",
  responsibles: "",
  sector: "",
  dimension: "",
  layer: "",
  level: "",
  features: "",
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
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#009e45",
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.mankuk.com/">
        Mankuk
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "Descripción Proyecto",
  "Descripción Matriz",
  "Descripción Materiales",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function handleSubmit() {
    await fetch("https://test-mankuk-api.azurewebsites.net/siteForm", {
      method: "POST",
      body: JSON.stringify(DATA_FORM),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    setActiveStep(activeStep + 1);
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
  );
}

function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Proyecto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required="required"
            id="firstName"
            name="firstName"
            label="Nombre del Proyecto"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => (DATA_FORM.projectName = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="DateTimePicker"
          />
          </LocalizationProvider> */}
          Fecha:
          <input
            type="date"
            name="fecha"
            onChange={(e) => (DATA_FORM.date = e.target.value)}
          />
          <br />
          <br />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Sitio"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => (DATA_FORM.site = e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Coordenadas WGS84 - E"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e) => (DATA_FORM.coordE = e.target.value)}
          />
          <TextField
            id="address2"
            name="address2"
            label="Coordenadas WGS84 - N"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e) => (DATA_FORM.coordN = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Unidad"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => (DATA_FORM.unit = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Responsables"
            fullWidth
            variant="standard"
            onChange={(e) => (DATA_FORM.responsibles = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Emplazamiento / Sector"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(e) => (DATA_FORM.sector = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Dimension"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => (DATA_FORM.dimension = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="capa"
            name="capa"
            label="Capa"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => (DATA_FORM.layer = e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Nivel"
            name="Nivel"
            label="Nivel"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={(e) => (DATA_FORM.level = e.target.value)}
          />
          <Grid>
            <TextField
              required
              id="rasgo"
              select
              label="Rasgo"
              fullWidth
              variant="standard"
              onChange={(e) => (DATA_FORM.features = e.target.value)}
            >
              <MenuItem value={"Si"}>Sí</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.compaction = e.target.value)
            }
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
            id="codigo_munshell"
            label="Código Munshell"
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.inclusionSize = e.target.value)
            }
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.inclusionDensity = e.target.value)
            }
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.organicMatter = e.target.value)
            }
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
            onChange={(e) =>
              (DATA_FORM.matrixDescription.humidity = e.target.value)
            }
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
          name="cerámica"
          label="Cerámica"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          type="number"
          onChange={(e) =>
            (DATA_FORM.materialDescription.ceramics = e.target.value)
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
            <h4>Obersvaciones de los materiales:</h4>
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
