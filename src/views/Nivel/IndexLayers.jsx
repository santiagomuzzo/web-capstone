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
import NoSession from '../../components/NoSession';



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
        console.log(raw)
        raw.forEach((obj) => {
            if (obj.matrixDescription) {
            array.push(obj)
            }
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
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Crear nueva Capa
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
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {layerList.map((layer, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Tipo de sedimento: {layer.matrixDescription.sedimentType}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`./${layer._id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" size="small" color="primary">
                                                Ver/Editar
                                                </Button>
                                            </Link>
                                            <Link to={window.location.reload}  style={{ textDecoration: 'none' }} >
                                            <Button variant="contained" size="small" color='error' onClick={()=> handleDelete(layer._id)}>Archivar</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
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
                <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    


}
export default IndexLayers;