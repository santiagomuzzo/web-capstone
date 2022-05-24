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

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function ProyectShow() {

  const project_id = window.location.pathname.split("/")[2];
  const [project, setProject] = React.useState({})
  const navigate = useNavigate();
  

  React.useEffect(() => {
    obtainData()
  }, [])

  const obtainData = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`)
    const raw = await data.json()
    setProject(raw)
    console.log(raw)
  }
  
  const handleEdit = async (id) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${project_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: project.name,
      })
    })
    navigate("/proyects")
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Proyecto {project.name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Nombre:
              <TextField
                required
                helperText="Nombre del Proyecto"
                id="name"
                name="name"
                fullWidth
                autoComplete="name"
                value={project.name}
                onChange={(e) => setProject({...project, name: e.target.value})}
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

export default ProyectShow;