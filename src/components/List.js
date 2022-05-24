import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      main: '#009e45'
    },
  },
});

export default function List() {

  const [formList, setFormList] = React.useState([])

  React.useEffect(() => {
    obtainData()
  }, [])

  const obtainData = async () => {
    const data = await fetch('https://test-mankuk-api.azurewebsites.net/siteForm')
    const raw = await data.json()
    const forms = raw['form']
    setFormList(forms)
  }

  function handleDelete(_id) {
    // remove item
    window.confirm('Are you sure you wish to delete this item?') ? onConfirm(_id) : onCancel("cancel")
  }

  async function onConfirm(_id) {
    await fetch(`https://test-mankuk-api.azurewebsites.net/siteForm/${_id}`, {
      method: 'DELETE'
    });
    window.location.href = "/Forms";
  }

  const onCancel = (e) => {
    console.log(e)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography component="h1" variant="h4" align="center">
            Forms
          </Typography>
          <Grid container spacing={4}>
            {formList.map((form) => (
              <Grid item key={form._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  // onClick={() => window.location.href = `/FormShow/${form._id}`}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://s1.lanzadigital.com/wp-content/uploads/2018/08/excavacion-alhambra-1-569x427.jpg"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" key="form.id">
                    {form.projectName}
                    </Typography>
                    <Typography>
                      {form.unit}
                    </Typography>
                    <Typography>
                      {form.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href = {`/Forms/${form._id}`}>Ver/Editar</Button>
                    <Button size="small" color='error' onClick={() => handleDelete(form._id)}>Eliminar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}