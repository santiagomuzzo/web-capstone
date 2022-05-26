import * as React from "react";
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

function LevelShow() {

  const project_id = window.location.pathname.split("/")[2];
  const site_id = window.location.pathname.split("/")[4];
  const unit_id = window.location.pathname.split("/")[6];
  const level_id = window.location.pathname.split("/")[8];
  const [level, setLevel] = React.useState({})
  const [date, setDate] = React.useState(new Date());
  const navigate = useNavigate();

  React.useEffect(() => {
    obtainData()
  }, [])

  const obtainData = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}`)
    const raw = await data.json()
    setLevel(raw)
    if (raw.date){
      setDate(new Date(raw.date))
    }
    
    console.log(raw)
  }

  const handleEdit = async (id) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/updateLevel/${level_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Nivel {level.id}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            Indice:
            <TextField
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
                dateFormat="dd/MM/yyyy"
                locale={es}
                selected={date}
                onChange={(date) => setDate(date)} />

              Características:
              <TextField
                required
                id="feature"
                name="Caracteristica"
                fullWidth
                autoComplete="Caracteristica"
                helperText="Características del nivel"
                value= {level.feature}
                onChange={(e) => setLevel({...level, feature: e.target.value})}
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

export default LevelShow;