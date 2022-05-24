import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

const DATA_FORM = {
    capas: {},
}


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexLayers() {

    const [layerList, setLayerList] = React.useState([])

    React.useEffect(() => {
        obtainData()
        }, [])

    const obtainData = async () => {
        const id = window.location.pathname.split("/")[2];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${id}/level/${id}/layers`)
        const raw = await data.json()
        for (const key in raw) {
            DATA_FORM.niveles[key] = raw[key]
        }
        setLayerList(DATA_FORM.capas)
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Capas
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {Object.keys(DATA_FORM.capas).map(key => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={`https://source.unsplash.com/random?${key}`}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {DATA_FORM.capas[key].name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                            <Link to={`/Levels/${DATA_FORM.capas[key]._id}`}>Ver/Editar</Link>
                                            </Button>
                                            <Button size="small" color='error'>Eliminar</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Crear nueva Capa
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <Link to={`./new`}>Crear</Link>
                                    </Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default IndexLayers;