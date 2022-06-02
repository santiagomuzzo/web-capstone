import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, 
    useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../styles/Dashboard.css';

import { useDomain, defineDomain } from '../../useDomain';

const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
  });

function DashboardContent() {
    const {domain, setDomain} = useDomain()

    const [unitList, setUnitList] = React.useState([]);
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
        if (!accessToken && !unitList.length) {
            RequestAccessToken();
            obtainData();
        
        } else if(accessToken && !unitList.length){
            obtainData();

        }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    function update(id, val) {
        document.getElementById(id).innerHTML = val;
    }

    const obtainData = async () => {
        defineDomain("", "unit", domain, setDomain);
        let total = 0;
        let activo = 0;
        let proyectada = 0;
        let excavacion = 0;
        let detenida = 0;
        let terminada = 0;
        let cerrada = 0;
        const bearer = `Bearer ${accessToken}`; 
        const data = await fetch(`${process.env.REACT_APP_API_URL}/unit`,{
            method: "GET",
            headers: {
            Authorization: bearer}
        })
        const raw = await data.json()
        const array = []
        raw.forEach((obj) => {
            if (obj.startDate) {
                array.push(obj);
                update("total", ++total);
                if (obj.status === "Activo" || obj.status === "Activa") {
                    update("activa", ++activo);
                } else if (obj.status === "Proyectada") {
                    update("proyectada", ++proyectada);
                } else if (obj.status === "En Excavación") {
                    update("excavacion", ++excavacion);
                } else if (obj.status === "Detenida") {
                    update("detenida", ++detenida);
                } else if (obj.status === "Terminada") {
                    update("terminada", ++terminada);
                } else if (obj.status === "Cerrada") {
                    update("cerrada", ++cerrada);
                }
            }
        })
        setUnitList(array)
        console.log(array)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Resumen de las Unidades
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Total de unidades: </h3> <h3 id="total"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Activas: </h3> <h3 id="activa"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Proyectadas: </h3> <h3 id="proyectada"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>En excavación: </h3> <h3 id="excavacion"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Detenidas: </h3> <h3 id="detenida"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Terminadas: </h3> <h3 id="terminada"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" component="h5" gutterBottom>
                            <div class="total">
                                <h3>Cerradas: </h3> <h3 id="cerrada"> </h3>
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {unitList.map((unit, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card>
                                        
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {unit.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Status: {unit.status}
                                                <br/>
                                                Inicio: {unit.startDate.split("T")[0]}
                                                <br/>
                                                Fin: {unit.endDate.split("T")[0]}
                                            </Typography>
                                        </CardContent>
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
function Dashboard(){
    return(
        <><AuthenticatedTemplate>
            <DashboardContent/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <p>Aún no has iniciado sesión</p>
            </UnauthenticatedTemplate></>  
    );
    


}
export default Dashboard;