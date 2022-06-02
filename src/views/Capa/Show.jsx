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
import MatrixDescription from '../../components/MatrixDescription';
import MaterialDescription from '../../components/MaterialDescription';

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

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MatrixDescription matrixDescription={matrixDescription} setMatrixDescription={setMatrixDescription} edit={edit}/>;
      case 1:
        return <MaterialDescription materialDescription={materialDescription} setMaterialDescription={setMaterialDescription} edit={edit}/>;
      default:
        throw new Error("Unknown step");
    }
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
            <p>Aún no has iniciado sesión</p>
        </UnauthenticatedTemplate></>  
);

}





export default LayerShow;