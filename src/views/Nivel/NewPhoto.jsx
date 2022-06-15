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

function LevelNewPhoto() {
    const navigate = useNavigate();
    const proyect_id = window.location.pathname.split("/")[2];
    const site_id = window.location.pathname.split("/")[4];
    const unit_id = window.location.pathname.split("/")[6];
    const level_id = window.location.pathname.split("/")[8];

    const [file, setFile] = React.useState(null)
    const [description, setDescription] = React.useState("")
    const [dataImages, setDataImages] = React.useState([])

    React.useEffect(() => {
        obtainData();
      }, []);

    const obtainData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/findingsImages/active`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        setDataImages(data)
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);
        await fetch(`${process.env.REACT_APP_API_URL}/unit/${unit_id}/level/${level_id}/uploadFindingsImage`, {
          method: "POST",
          body: formData,
          headers: {
            "contentType": "multipart/form-data"
          }
        });  
        window.location.reload();
      }

    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Fotos
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <input type="file" accept="image/*" onChange={fileSelected} />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Descripción"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Subir
                        </Button>
                        </Grid>
                    </Grid>
                    </Box>
                    <ImageList sx={{ width: 1150, height: 450 }} cols={3}>
          {dataImages.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.url}`}
                srcSet={`${item.url}`}
                alt={item.url}
                loading="lazy"
              />
              <Link to={`./${item._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="small" color="secondary">
                      Ver
                  </Button>
              </Link>
              <ImageListItemBar
                title={item.description}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
        </Container>
      </ThemeProvider>
    </div>
  )
}

function LevelPhoto() {
    return(
        <><AuthenticatedTemplate>
            <LevelNewPhoto/>
        </AuthenticatedTemplate><UnauthenticatedTemplate>
                <NoSession/>
            </UnauthenticatedTemplate></>  
    );
    
}

export default LevelPhoto;