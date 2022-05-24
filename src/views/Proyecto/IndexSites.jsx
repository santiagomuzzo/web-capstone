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

function IndexSites() {

    const {domain, setDomain} = useDomain()
    const [siteList, setSiteList] = React.useState([])

    React.useEffect(() => {
        obtainData()
        }, [])

    const obtainData = async () => {
        defineDomain("", "site", domain, setDomain);
        const id = window.location.pathname.split("/")[2];
        const id2 = window.location.pathname.split("/")[4];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${id}/excavationSites`)
        const raw = await data.json()
        const array = []
        console.log(raw)
        raw.forEach((obj) => {
            if (obj.status === "Activo") {
                array.push(obj)
            }
          })
          setSiteList(array)
    }

    const handleDelete = async (id) => {
        const projectId = window.location.pathname.split("/")[2];
        await fetch(`${process.env.REACT_APP_API_URL}/project/${projectId}/updateExcavationSite/${id}`, {
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

    const id1 = window.location.pathname.split("/")[1];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Sitios
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {siteList.map((site, index) => (
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
                                                {site.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Unidades: {site.units.length}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                            <Link to={`./${site._id}`}>Ver/Editar</Link>
                                            </Button>
                                            <Button onClick={()=> defineDomain(site._id, 'site', domain, setDomain)}>
                                                <Link to={`./${site._id}/Units`}>Ver Unidades</Link>
                                            </Button>
                                            <Button size="small" color='error' onClick={()=> handleDelete(site._id)}>Archivar</Button>
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
                                        Crear nuevo Sitio
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

export default IndexSites;

