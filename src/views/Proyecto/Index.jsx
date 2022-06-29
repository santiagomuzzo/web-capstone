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
import { CircularProgress } from '@material-ui/core';
import proyectos_2 from '../../assets/proyectos_2.jpeg';
import NoSession from '../../components/NoSession';

import { useDomain, defineDomain } from '../../useDomain';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });


function ProyectosContent() {

    const {domain, setDomain} = useDomain()
    const [projectList, setProjectList] = React.useState([])
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
        if (!accessToken && !projectList.length) {
            RequestAccessToken();
            obtainData();
        
        } else if(accessToken && !projectList.length){
            obtainData();

        }
    }, [accessToken]);
        
    const obtainData = async () => {
        defineDomain("", "all", domain, setDomain);   
        const bearer = `Bearer ${accessToken}`; 
        const data = await fetch(`${process.env.REACT_APP_API_URL}/project`,{
            method: "GET",
            headers: {
            Authorization: bearer
            }
        });
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            if (obj.status === "Activo") {
                array.push(obj)
            }
          })
        setProjectList(array)
    }
    const handleDelete = async (id) => {
        if(!accessToken) RequestAccessToken();
        const bearer = `Bearer ${accessToken}`;
        await fetch(`${process.env.REACT_APP_API_URL}/project/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer
            },
            body: JSON.stringify({
                status: "Inactivo"
        })
    })
    
        window.location.reload()
    }

    if (!projectList) {
        return <CircularProgress></CircularProgress>
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Proyectos
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {projectList.map((project, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                image= {proyectos_2}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {project.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Sitios: {project.lenExcavationSites}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                
                                                <Link  to={`/Proyects/${project._id}`} style={{ textDecoration: 'none' }}>
                                                    <Button size="small" variant="contained" color="primary">
                                                        Ver/Editar
                                                    </Button>
                                                </Link>
                                                
                                                 <Link to={`/Proyects/${project._id}/Sites`}  style={{ textDecoration: 'none' }}>
                                                    <Button size="small" variant="contained" color='secondary' onClick={()=> defineDomain(project._id, 'project', domain, setDomain)}>
                                                        Ver Sitios
                                                    </Button>
                                                </Link>
                                                <Link to={window.location.reload}  style={{ textDecoration: 'none' }}>
                                                    <Button size="small" color='error' variant="contained" onClick={()=> handleDelete(project._id)}>Archivar</Button>
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
                                    // to={`/Proyects/new`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Crear nuevo Proyecto
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions>
                                    <Link to={`/Proyects/new`} style={{ textDecoration: 'none' }}>
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

function Proyectos(){
    return(
        <><AuthenticatedTemplate>
            <ProyectosContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
            <NoSession/>
        </UnauthenticatedTemplate></>  
    );
    


}

export default Proyectos;

