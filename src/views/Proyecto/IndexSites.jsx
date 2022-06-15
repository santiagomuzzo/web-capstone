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
import { Link } from "react-router-dom";
import proyectos from '../../assets/proyectos.jpeg';
import NoSession from '../../components/NoSession';

import { useDomain, defineDomain } from '../../useDomain';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexSitesContent() {
    const {domain, setDomain} = useDomain()
    const [siteList, setSiteList] = React.useState([])

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
    React.useEffect(() => {  
        if (!accessToken && !siteList.length) {
            RequestAccessToken();
            obtainData();    
        } else if(accessToken && !siteList.length){
            obtainData();
        }  
    }, [accessToken]);

    const obtainData = async () => {
        defineDomain("", "site", domain, setDomain);
        const id = window.location.pathname.split("/")[2];
        const bearer = `Bearer ${accessToken}`; 
        const data = await fetch(`${process.env.REACT_APP_API_URL}/project/${id}/excavationSites`,{
            method: "GET",
            headers: {
            Authorization: bearer}
        });
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            if (obj.status === "Activo") {
                array.push(obj)
            }
          })
          setSiteList(array)
    }

    const handleDelete = async (id) => {
        const projectId = window.location.pathname.split("/")[2];
        const bearer = `Bearer ${accessToken}`; 
        await fetch(`${process.env.REACT_APP_API_URL}/project/${projectId}/updateExcavationSite/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
            body: JSON.stringify({
                status: "Inactivo",
                
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
                                            image= {proyectos}
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
                                            <Link to={`./${site._id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant="outlined" size="small" color="primary">
                                                    Ver/Editar
                                                </Button>
                                            </Link>
                                            
                                            
                                            <Link to={`./${site._id}/Units`} style={{ textDecoration: 'none' }}>
                                                <Button  size="small" variant="outlined" color='secondary' onClick={()=> defineDomain(site._id, 'site', domain, setDomain)}>
                                                    Ver Unidades
                                                </Button>
                                            </Link>
                                            <Link to={window.location.reload}  style={{ textDecoration: 'none' }}>
                                                <Button size="small" variant="outlined" color='error' onClick={()=> handleDelete(site._id)}>
                                                    Archivar
                                                </Button>
                                            </Link>
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
                                    style={{"padding-top": "3%"}}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Crear nuevo Sitio
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    <Link to={`./new`} style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" size="small" color="primary">
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
function IndexSites(){
    return(
        <><AuthenticatedTemplate>
            <IndexSitesContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    


}
export default IndexSites;

