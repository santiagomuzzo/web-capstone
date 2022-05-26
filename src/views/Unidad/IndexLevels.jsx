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
import { useDomain, defineDomain } from '../../useDomain';


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexLevels() {
    const {domain, setDomain} = useDomain()


    const [levelList, setLevelList] = React.useState([])

    React.useEffect(() => {
        obtainData()
        }, [])

    const obtainData = async () => {
        defineDomain("", "level", domain, setDomain);
        const unit_id = window.location.pathname.split("/")[6];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/levels`)
        const raw = await data.json()
        console.log("hola", raw)
        const array = []
        //raw.forEach((obj) => {
            //if ( obj.status === "Activo") {
            //    array.push(obj)
            //}
        //})
        raw.forEach((obj) => {
            array.push(obj)
        })

        setLevelList(array)
    }

    const handleDelete = async (id) => {
        const unit_id = window.location.pathname.split("/")[6];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/updateLevel/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "Inactivo"
            })
        })
        window.location.reload()
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Niveles
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {levelList.map((level, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={`https://source.unsplash.com/random?${index}`}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {level.index}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Capas: {level.layers.length}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                            <Link to={`./${level._id}`}>Ver/Editar</Link>
                                            </Button>
                                            <Button onClick={()=> defineDomain(level._id, 'level', domain, setDomain)}>
                                                <Link to={`./${level._id}/Layers`}>Ver Capas</Link>
                                            </Button>
                                            <Button size="small" color='error' onClick={()=> handleDelete(level._id)}>Archivar</Button>
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
                                        Crear nuevo Nivel
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

export default IndexLevels;