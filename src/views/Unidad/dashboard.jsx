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
    }, [accessToken]);

    const obtainData = async () => {
        defineDomain("", "unit", domain, setDomain);
        const site_id = window.location.pathname.split("/")[4];
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
                            Unidades
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
                                                Niveles: {unit.levels.length}
                                                <br/>
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