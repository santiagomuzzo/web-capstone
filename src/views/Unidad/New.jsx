import * as React from 'react';
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


const DATA_FORM = {
  name: '',
  status: 'Activo',
  UTMNorth: "",
  UTMEast: "",
  startDate: "",
  endDate: "",
  maxDepth: 0,
  section: "",
  
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



function NewUnit () {
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  async function handleSubmit(){

    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    DATA_FORM.excavationSite = site_id;
    DATA_FORM.startDate = startDate;
    DATA_FORM.endDate = endDate;
    await fetch(`${process.env.REACT_APP_API_URL}/project/${proyect_id}/excavationSite/${site_id}/createUnit`, {
      method: 'POST',
      body: JSON.stringify(DATA_FORM),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });
    navigate(`/Proyects/${proyect_id}/Sites/${site_id}/Units`)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Paper sx={{
            padding: '1.5rem',
            margin: '1rem',
            width: '100%',
            maxWidth: '500px',
          }}>
            <Typography component="h1" variant="h5">
              Nueva Unidad
            </Typography>
            <br></br>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nombre de la Unidad"
                    fullWidth
                    autoComplete="nombre"
                    autoFocus
                    onChange={(e) => {DATA_FORM.name = e.target.value}}
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
                    
                    onChange={(e) => {DATA_FORM.UTMNorth = e.target.value}}
                  />
                  UTM Este:
                  <TextField
                    
                    helperText="UTM Este de la Unidad"
                    id="UTMEast"
                    name="UTMEast"
                    fullWidth
                    autoComplete="UTMEast"
                    
                    onChange={(e) => {DATA_FORM.UTMEast = e.target.value}}
                  />
                  Profundidad Máxima:
                  <TextField
                    
                    type = "number"
                    helperText="Profundidad Máxima de la unidad"
                    id="maxDepth"
                    name="maxDepth"
                    fullWidth
                    autoComplete="maxDepth"
                    
                    onChange={(e) => {DATA_FORM.maxDepth = e.target.value}}
                  />
                  Seccion:
                  <TextField
                    
                    helperText="Seccion de la unidad"
                    id="section"
                    name="section"
                    fullWidth
                    autoComplete="section"
                    
                    onChange={(e) => {DATA_FORM.section = e.target.value}}
                  />
                  <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                      color = "success"
                    >
                      Crear
                    </Button>
                </Grid>
              </Grid >
            </form>
          </Paper>
        </Box>
        <Copyright />
      </Container>
      </ThemeProvider>
    </div>

  )
}

export default NewUnit;