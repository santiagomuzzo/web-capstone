import * as React from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginRequest } from "../authConfig";
import { Dropdown} from "react-bootstrap";
import '../styles/NoSession.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";


const theme = createTheme({
    palette: {
      primary: {
        main: '#009e45'
      },
    },
});

export default function NoSession() {
    const { instance } = useMsal();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                <div class = "container">
                    <h1>Porfavor Inicia Sesión para poder acceder a la información!</h1>
                    <br></br>
                    <Dropdown.Item className= "boton" as="button" onClick={() => instance.loginRedirect(loginRequest)}>Iniciar Sesión</Dropdown.Item>
                </div>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}