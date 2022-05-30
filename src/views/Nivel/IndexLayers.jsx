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
import { useDomain, defineDomain } from '../../useDomain';


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexLayersContent() {
    const {domain, setDomain} = useDomain()

    const [layerList, setLayerList] = React.useState([])

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
        if (!accessToken && !layerList.length) {
            RequestAccessToken();
            obtainData();
        
        } else if(accessToken && !layerList.length){
            obtainData();

        }  
    }, [accessToken]);

    const obtainData = async () => {
        const bearer = `Bearer ${accessToken}`; 
        defineDomain("", "layer", domain, setDomain);
        const unit_id = window.location.pathname.split("/")[6];
        const level_id = window.location.pathname.split("/")[8];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/layers`,{
            method: "GET",
            headers: {
            Authorization: bearer}
        })
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            array.push(obj)
            
          })
        
        setLayerList(array)
    }
    

    const handleDelete = async (id) => {
        const unit_id = window.location.pathname.split("/")[6];
        const level_id = window.location.pathname.split("/")[8];
        const bearer = `Bearer ${accessToken}`; 
        await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/updateLayer/${id}`, {
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
                            {layerList.map((layer, index) => (
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
                                                {layer.matrixDescription.sedimentType}
                                                {layer.status}
                                                {layer._id}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                            <Link to={`./${layer._id}`}>Ver/Editar</Link>
                                            </Button>
                                            <Button size="small" color='error' onClick={()=> handleDelete(layer._id)}>Archivar</Button>
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
function IndexLayers(){
    return(
        <><AuthenticatedTemplate>
            <IndexLayersContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <p>Aún no has iniciado sesión</p>
            </UnauthenticatedTemplate></>  
    );
    


}
export default IndexLayers;