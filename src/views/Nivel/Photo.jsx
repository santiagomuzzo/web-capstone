// Show one photo
import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, 
  useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "react-datepicker/dist/react-datepicker.css";
import NoSession from '../../components/NoSession';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const theme = createTheme({
    palette: {
        primary: {
            main: '#009e45'
        },
    },
});

function LevelPhotoShow() {
    const navigate = useNavigate();
    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    const unit_id = window.location.pathname.split("/")[6];
    const level_id = window.location.pathname.split("/")[8];
    const photo_id = window.location.pathname.split("/")[10];
    const [dataImages, setDataImages] = React.useState({});


    React.useEffect(() => {
        obtainData();
    }
    , []);

    const obtainData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/image/${unit_id}/level/${level_id}/findingsImage/${photo_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json()
        console.log(data)
        setDataImages(data)
      }

      async function handleDelete(id) {
        console.log("handleDelete, id: " + id);
        await fetch(`${process.env.REACT_APP_API_URL}/image/${unit_id}/level/${level_id}/findingsImage/${id}/softDelete`, {
          method: 'PUT',
        })
        navigate("/Proyects/" + proyect_id + "/Sites/" + site_id + "/Units/" + unit_id + "/Levels/" + level_id + "/Photos")
      }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Box my={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <img src={dataImages.url} alt={dataImages.description} />
                                <ImageListItemBar>
                                    <Typography variant="subtitle1">{dataImages.description}</Typography>
                                </ImageListItemBar>
                            </Grid>
                            
                        </Grid>
                        <Button variant="contained" onClick={()=> handleDelete(dataImages._id)} color = "secondary" >
                            Eliminar
                        </Button>
                        <Button variant="contained" onClick={()=> navigate("/Proyects/" + proyect_id + "/Sites/" + site_id + "/Units/" + unit_id + "/Levels/" + level_id + "/Photos")} color = "primary" >
                            Volver
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default LevelPhotoShow;