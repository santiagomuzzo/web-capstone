import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, 
    useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
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
import { Link, Navigate } from "react-router-dom";
import proyectos from '../../assets/proyectos.jpeg';
import NoSession from '../../components/NoSession';
import { useNavigate } from "react-router-dom";

import { useDomain, defineDomain } from '../../useDomain';
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexUnitsContent() {
    const {domain, setDomain} = useDomain()

    const [unitList, setUnitList] = React.useState([]);
    const { instance, accounts} = useMsal();
    const account = useAccount(accounts[0] || {});
    const [accessToken, setAccessToken] = React.useState(null);
    const navigate = useNavigate();
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
    React.useEffect(() => {  
        if (!accessToken && !unitList.length) {
            RequestAccessToken();
            obtainData();
        
        } else if(accessToken && !unitList.length){
            obtainData();

        }  
    }, [accessToken]);

    const obtainData = async () => {
        defineDomain("", "unit", domain, setDomain);
        const site_id = window.location.pathname.split("/")[4];
        const bearer = `Bearer ${accessToken}`; 
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/excavationSite/${site_id}`,{
            method: "GET",
            headers: {
            Authorization: bearer}
        })
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            if (obj.status === "Activo") {
                array.push(obj)
            }
          })
        setUnitList(array)
    }

    const handleDelete = async (id) => {
        const bearer = `Bearer ${accessToken}`; 
        await fetch(`${process.env.REACT_APP_API_URL}/unit/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: bearer,
            },
            body: JSON.stringify({
                status: "Inactivo"
      
            })
          })
        window.location.reload()
    }
    const handleRedirect =  (id) => {
        const projectId = window.location.pathname.split("/")[2];
        const siteId = window.location.pathname.split("/")[4];
        defineDomain(id, 'unit', domain, setDomain)
        navigate(`/Proyects/${projectId}/Sites/${siteId}/Units/${id}/Levels`);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Unidades
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {unitList.map((unit, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image= {proyectos}
                                            title="Contemplative Reptile"
                                            onClick={() => handleRedirect(unit._id)}
                                        />
                                        <CardContent onClick={() => handleRedirect(unit._id)}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {unit.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Niveles: {unit.lenLevels}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`./${unit._id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" size="small" color="primary">
                                                    Ver/Editar
                                                </Button>
                                            </Link>
                                            <Link to={`./${unit._id}/Levels`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" color='secondary' variant="contained" onClick={()=> defineDomain(unit._id, 'unit', domain, setDomain)}>
                                                Ver Niveles
                                                </Button>
                                            </Link>
                                            <Link to={window.location.reload}  style={{ textDecoration: 'none' }} >
                                                <Button size="small" variant="contained" color='error' onClick={()=> handleDelete(unit._id)}>
                                                    Archivar
                                                </Button>
                                            </Link>
                                        </CardActions>
                                        <CardActions>
                                        <Link to={`./${unit._id}/Photos`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" color='secondary' variant="outlined">
                                                    Ver Fotos de la Unidad
                                                </Button>
                                        </Link>
                                        </CardActions>
                                        <CardActions>
                                        <Link to={`./${unit._id}/LevelsPhotos`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" color='secondary' variant="outlined">
                                                    Ver Fotos de los niveles
                                                </Button>
                                        </Link>
                                        </CardActions>

                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    onClick={() => navigate(`./new`)}
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png"
                                    title="Contemplative Reptile"
                                    style={{"padding-top": "3%"}}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Crear nueva Unidad
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    
                                    <Link to={`./new`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" size="small" color="primary">
                                            Crear
                                        </Button>
                                    </Link>
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
function IndexUnits(){
    return(
        <><AuthenticatedTemplate>
            <IndexUnitsContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
            <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    


}
export default IndexUnits;