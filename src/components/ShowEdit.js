import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';



const theme = createTheme({
  palette: {
    primary: {
      main: '#009e45'
    },
  },
});

const DATA_FORM = {
  projectName: '',
  date: '',
  site: '',
  coordE: '',
  coordN: '',
  unit: '',
  responsibles: '',
  sector: '',
  dimension: '',
  layer: '',
  level: '',
  features: '',
  matrixDescription: {
    sedimentType: '',
    compaction: '',
    munshell: '',
    inclusionType: '',
    inclusionSize: '',
    inclusionDensity: '',
    organicMatter: '',
    humidity: '',
    observations: ''
  },
  materialDescription: {
    crockery: 0,
    metal: 0,
    glass: 0,
    ceramic: 0,
    lithic: 0,
    leather: 0,
    textile: 0,
    animalBones: 0,
    wood: 0,
    bioAntro: 0,
    archeoBotanical: 0,
    malacological: 0,
    totalNumber: 1,
    observations: ''
  }
}
  
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.mankuk.com/">
          Mankuk
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

  
  export default function ShowEdit(props) {
  
    async function handleSubmit(){
      await fetch(`https://test-mankuk-api.azurewebsites.net/siteForm/${props.data}`, {
        method: 'PUT',
        body: JSON.stringify(formList),
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
      },
    });
    window.location.href = "/Forms";
    }

    const [formList, setFormList] = React.useState([])

    React.useEffect(() => {
        obtainData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const obtainData = async () => {
        const response = await fetch(`https://test-mankuk-api.azurewebsites.net/siteForm/${props.data}`);
        const raw = await response.json();
        const forms = raw['form']
        setFormList(forms);
    }
      
  
    return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Ficha de Excavación Arqueológica
            </Typography>
            <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Proyecto
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              helperText="Nombre del Proyecto"
              value={formList.projectName}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => setFormList({...formList, projectName: e.target.value})}
              
              //isPreviewFocusable={true}
              //selectAllOnFocus={false}
              //onChange={(e) => DATA_FORM.projectName= e.target.value}   
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            Fecha:
            <input type="date" name="fecha" onChange={(e) => setFormList({...formList, date: e.target.value})} value={formList.date}/><br /><br/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              helperText="Sitio"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={formList.site}
              onChange={(e) => setFormList({...formList, site: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              helperText="Coordenadas WGS84 - E"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={formList.coordE}
              onChange={(e) => setFormList({...formList, coordE: e.target.value})}

  
            />
            <TextField
              id="address2"
              name="address2"
              helperText="Coordenadas WGS84 - N"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={formList.coordN}
              onChange={(e) => setFormList({...formList, coordN: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              helperText="Unidad"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formList.unit}
              onChange={(e) => setFormList({...formList, unit: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              helperText="Responsables"
              fullWidth
              variant="standard"
              value={formList.responsibles}
              onChange={(e) => setFormList({...formList, responsibles: e.target.value})}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              helperText="Emplazamiento / Sector"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={formList.sector}
              onChange={(e) => setFormList({...formList, sector: e.target.value})}
  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              helperText="Dimension"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formList.dimension}
              onChange={(e) => setFormList({...formList, dimension: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="capa"
              name="capa"
              helperText="Capa"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formList.layer}
              onChange={(e) => setFormList({...formList, layer: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Nivel"
              name="Nivel"
              helperText="Nivel"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={formList.level}
              onChange={(e) => setFormList({...formList, level: e.target.value})}
            />
          <Grid>
          <TextField
            required
            id="rasgo"
            select
            label={formList.features}
            helperText="Rasgo"
            fullWidth
            variant="standard"
            Value={formList.features}
            onChange={(e) => setFormList({...formList, features: e.target.value})}
          >
            <MenuItem value={"Si"}>Si</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </TextField>
          </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlhelperText
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              helperText="Use this address for payment details"
            />
          </Grid> */}
        </Grid>

        <Typography variant="h6" gutterBottom>
          Descripción Matriz
        </Typography>
        <Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="rasgo"
          select
          label={formList.sedimentType}
          helperText="Tipo de Sedimiento"
          fullWidth
          variant="standard"
          //onChange={(e) => setFormList({...formList, sedimentType: e.target.value})}
          >
              <MenuItem value={"arena"}>Arena</MenuItem>
              <MenuItem value={"arena_arcillosa"}>Arena Arcillosa</MenuItem>
              <MenuItem value={"arena_limosa"}>Arena Limosa</MenuItem>
              <MenuItem value={"arcilla"}>Arcilla</MenuItem>
              <MenuItem value={"arcilla_limosa"}>Arcilla Limosa</MenuItem>
              <MenuItem value={"arcilla_arenosa"}>Arcilla Arenosa</MenuItem>
              <MenuItem value={"limo"}>Limo</MenuItem>
              <MenuItem value={"limo_arenoso"}>Limo Arenoso</MenuItem>
              <MenuItem value={"limo_arcilloso"}>Limo Arcilloso</MenuItem>
          </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="compactacion"
          select
          helperText="Compactación"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.compaction= e.target.value}
          
          >
              <MenuItem value={"muy_compacta"}>Muy Compacta</MenuItem>
              <MenuItem value={"compacta"}>Compacta</MenuItem>
              <MenuItem value={"semi_compacta"}>Semi Compacta</MenuItem>
              <MenuItem value={"no_compacta"}>No Compacta</MenuItem>
              
          </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="codigo_munshell"
              helperText="Código Munshell"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={(e) => DATA_FORM.matrixDescription.munshell= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="tipo_de_inclusiones"
          select
          helperText="Tipo de inclusiones"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.inclusionType= e.target.value}
          >
              <MenuItem value={"ausentes"}>Ausentes</MenuItem>
              <MenuItem value={"clastos_angulosos"}>Clastos Angulosos</MenuItem>
              <MenuItem value={"clastos_subangulosos"}>Clastos Subangulosos</MenuItem>
              <MenuItem value={"clastos_rodados"}>Clastos Rodados</MenuItem>
              <MenuItem value={"grava"}>Grava</MenuItem>
              <MenuItem value={"gravilla"}>Gravilla</MenuItem>
              <MenuItem value={"maicillo"}>Maicillo</MenuItem>
              <MenuItem value={"material_constructivo"}>Material constructivo</MenuItem>
              
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="tamaño_de_inclusiones"
          select
          helperText="Tamaño de inclusiones"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.inclusionSize= e.target.value}
          >
              <MenuItem value={"grande"}>Grande</MenuItem>
              <MenuItem value={"mediano"}>Mediano</MenuItem>
              <MenuItem value={"pequeño"}>Pequeño</MenuItem>
              <MenuItem value={"muy_pequeño"}>Muy Pequeño</MenuItem>
  
              
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="densidad_de_inclusiones"
          select
          helperText="Densidad de inclusiones"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.inclusionDensity= e.target.value}
          >
              <MenuItem value={"alta"}>Alta</MenuItem>
              <MenuItem value={"media"}>Media</MenuItem>
              <MenuItem value={"baja"}>Baja</MenuItem>
              <MenuItem value={"muy_baja"}>Muy Baja</MenuItem>
  
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="contenido_de_materia_organica"
          select
          helperText="Contenido de materia orgánica"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.organicMatter= e.target.value}
          >
              <MenuItem value={"alto"}>Alto</MenuItem>
              <MenuItem value={"medio"}>Medio</MenuItem>
              <MenuItem value={"bajo"}>Bajo</MenuItem>
  
              
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          required
          id="humedad"
          select
          helperText="Humedad"
          fullWidth
          variant="standard"
          onChange={(e) => DATA_FORM.matrixDescription.humidity= e.target.value}
          >
              <MenuItem value={"muy_humeda"}>Muy Húmeda</MenuItem>
              <MenuItem value={"humeda"}>Húmeda</MenuItem>
              <MenuItem value={"ligeramente"}>Ligeramente</MenuItem>
              <MenuItem value={"sin_humedad"}>Sin Humedad</MenuItem>
  
              
          </TextField>
          </Grid>
          <Grid item xs={12}>
          <h4>Obersvaciones de la Matriz / Descripción del Rasgo:</h4>
            <textarea name="observaciones_matriz" rows="4" cols="50" onChange={(e) => DATA_FORM.matrixDescription.observations= e.target.value}></textarea>
          </Grid>
        </Grid>


        <Typography variant="h6" gutterBottom>
        Descripción de Materiales. Tipo y Cantidad
        </Typography>
      
              <Grid item xs={12} sm={6}>
                <TextField
                  id="loza"
                  name="Loza"
                  helperText="Loza"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  type="number"
                  onChange={(e) => DATA_FORM.materialDescription.crockery= e.target.value}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="metal"
                  name="metal"
                  helperText="Metal"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  type="number"
                  onChange={(e) => DATA_FORM.materialDescription.metal= e.target.value}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="ceramica"
                  name="cerámica"
                  helperText="Cerámica"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  type="number"
                  onChange={(e) => DATA_FORM.materialDescription.ceramics= e.target.value}
                /> */}
              <Grid item xs={12} sm={6}>
              <TextField
                id="vidrio"
                name="vidrio"
                helperText="Vidrio"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                onChange={(e) => DATA_FORM.materialDescription.glass= e.target.value}
              />
          <Grid item xs={12} sm={6}>
            <TextField
              id="litico"
              name="litico"
              helperText="Lítico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.lithic= e.target.value}
            />
          <Grid item xs={12} sm={6}>
            <TextField
              id="cuero"
              name="cuero"
              helperText="Cuero"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.leather= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="textil"
              name="textil"
              helperText="Textil"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.textile= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="osteofauna"
              name="osteofauna"
              helperText="Osteofauna"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.animalBones= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="madera"
              name="madera"
              helperText="Madera"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.wood= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bioantropologico"
              name="bioantropologico"
              helperText="Bioantropológico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.bioAntro= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="arqueobotanico"
              name="arqueobotanico"
              helperText="Arqueobotánico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.archeoBotanical= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="malacologico"
              name="malacologico"
              helperText="Malacológico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.malacological= e.target.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="total"
              name="total"
              helperText="Numero Total de Materiales"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              onChange={(e) => DATA_FORM.materialDescription.totalNumber= e.target.value}
            />
          </Grid>
          <Grid item xs={12}>
          <h4>Obersvaciones de los materiales:</h4>
            <textarea name="observaciones_materiales" rows="4" cols="50" onChange={(e) => DATA_FORM.materialDescription.observations= e.target.value}></textarea>
          </Grid>
          </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
                >
                Actualizar
                </Button>
                    
            </Box>
      </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }