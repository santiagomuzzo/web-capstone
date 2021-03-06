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
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function IndexLevelsContent() {
    const {domain, setDomain} = useDomain()
    const [levelList, setLevelList] = React.useState([]);
    
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
        if (!accessToken && !levelList.length) {
            RequestAccessToken();
            obtainData();
        
        } else if(accessToken && !levelList.length){
            obtainData();

        }  
    }, [accessToken]);


    const obtainData = async () => {
        defineDomain("", "level", domain, setDomain);
        const bearer = `Bearer ${accessToken}`; 
        const unit_id = window.location.pathname.split("/")[6];
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/levels`,{
            method: "GET",
            headers: {
            Authorization: bearer}
        })
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            if ( obj.status === "Activo") {
               array.push(obj)
            }
        })

        setLevelList(array)
    }

    const handleDelete = async (id) => {
        const unit_id = window.location.pathname.split("/")[6];
        const bearer = `Bearer ${accessToken}`; 
        await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/updateLevel/${id}`, {
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
        const unitId = window.location.pathname.split("/")[6];
        defineDomain(id, 'level', domain, setDomain)
        navigate(`/Proyects/${projectId}/Sites/${siteId}/Units/${unitId}/Levels/${id}/Layers`);
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
                        <Card onClick={() => navigate(`./new`)}>
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    Crear nuevo Nivel
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
                            {levelList.map((level, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardContent onClick={() => handleRedirect(level._id)}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {level.index}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Link to={`./${level._id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" size="small" color="primary">
                                                Ver/Editar
                                                </Button>
                                            </Link>
                                            <Link to={`./${level._id}/Layers`} style={{ textDecoration: 'none' }}>
                                                <Button size='small'  color='secondary' variant="contained" onClick={()=> defineDomain(level._id, 'level', domain, setDomain)}>
                                                Ver Capas
                                                </Button>
                                            </Link>
                                            <Link to={`./${level._id}/Photos`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" color='secondary' variant="outlined">
                                                Ver Fotos de los hallazgos
                                                </Button>
                                            </Link>
                                            <Link to={window.location.reload}  style={{ textDecoration: 'none' }} >
                                                <Button size="small"  variant="contained" color='error' onClick={()=> handleDelete(level._id)}>Archivar</Button>
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
function IndexLevels(){
    return(
        <><AuthenticatedTemplate>
            <IndexLevelsContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    


}
export default IndexLevels;