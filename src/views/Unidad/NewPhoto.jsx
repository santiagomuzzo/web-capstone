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
import { es} from 'date-fns/locale'
import NoSession from '../../components/NoSession';

const theme = createTheme({
    palette: {
        primary: {
            main: '#009e45'
        },
    },
});

function UnitNewPhoto() {
  const navigate = useNavigate();
  const proyect_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const unit_id = window.location.pathname.split("/")[6];

  React.useEffect(() => {
    obtainData();
  }, []);


  const obtainData = async () => {
    console.log("obtainData");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/unitImages/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    console.log(data);
  }


  async function handleSubmit() {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/uploadUnitImage`, {
      method: "POST",
      body: formData,
      headers: {
        "contentType": "multipart/form-data"
      }
    });  
    window.location.reload();
  }

  const fileSelected = event => {
    const file = event.target.files[0]
      setFile(file)
    }
  const [file, setFile] = React.useState(null)
  const [fileName, setFileName] = React.useState(null)
  const [description, setDescription] = React.useState("")
  const [images, setImages] = React.useState([])

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Fotos
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <input type="file" accept="image/*" onChange={fileSelected} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Descripción"
                  fullWidth
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
                  color = "success"
                >
                  Subir
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

function UnitPhoto(){
    return(
        <><AuthenticatedTemplate>
            <UnitNewPhoto/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    


}

export default UnitPhoto;