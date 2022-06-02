import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";



function MatrixDescription({matrixDescription, setMatrixDescription, edit}) {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Descripción Matriz
        </Typography>
        <Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="rasgo"
              select
              label="Tipo de Sedimiento"
              fullWidth
              variant="standard"
              value={matrixDescription.sedimentType}
              onChange={(e) => setMatrixDescription({...matrixDescription, sedimentType: e.target.value})}
  
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
              disabled={!edit}
              required
              id="compactacion"
              select
              label="Compactación"
              fullWidth
              variant="standard"
              value={matrixDescription.compaction}
              onChange={(e) => setMatrixDescription({...matrixDescription, compaction: e.target.value})}
  
            >
              <MenuItem value={"muy_compacta"}>Muy Compacta</MenuItem>
              <MenuItem value={"compacta"}>Compacta</MenuItem>
              <MenuItem value={"semi_compacta"}>Semi Compacta</MenuItem>
              <MenuItem value={"no_compacta"}>No Compacta</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!edit}
              required
              id="codigo_munsell"
              label="Código Munsell"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={matrixDescription.munshell}
              onChange={(e) => setMatrixDescription({...matrixDescription, munshell: e.target.value})}
  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="tipo_de_inclusiones"
              select
              label="Tipo de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionType}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionType: e.target.value})}
  
              
            >
              <MenuItem value={"ausentes"}>Ausentes</MenuItem>
              <MenuItem value={"clastos_angulosos"}>Clastos Angulosos</MenuItem>
              <MenuItem value={"clastos_subangulosos"}>
                Clastos Subangulosos
              </MenuItem>
              <MenuItem value={"clastos_rodados"}>Clastos Rodados</MenuItem>
              <MenuItem value={"grava"}>Grava</MenuItem>
              <MenuItem value={"gravilla"}>Gravilla</MenuItem>
              <MenuItem value={"maicillo"}>Maicillo</MenuItem>
              <MenuItem value={"material_constructivo"}>
                Material constructivo
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="tamaño_de_inclusiones"
              select
              label="Tamaño de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionSize}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionSize: e.target.value})}
  
            >
              <MenuItem value={"grande"}>Grande</MenuItem>
              <MenuItem value={"mediano"}>Mediano</MenuItem>
              <MenuItem value={"pequeño"}>Pequeño</MenuItem>
              <MenuItem value={"muy_pequeño"}>Muy Pequeño</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="densidad_de_inclusiones"
              select
              label="Densidad de inclusiones"
              fullWidth
              variant="standard"
              value={matrixDescription.inclusionDensity}
              onChange={(e) => setMatrixDescription({...matrixDescription, inclusionDensity: e.target.value})}
            >
              <MenuItem value={"alta"}>Alta</MenuItem>
              <MenuItem value={"media"}>Media</MenuItem>
              <MenuItem value={"baja"}>Baja</MenuItem>
              <MenuItem value={"muy_baja"}>Muy Baja</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="contenido_de_materia_organica"
              select
              label="Contenido de materia orgánica"
              fullWidth
              variant="standard"
              value={matrixDescription.organicMatter}
              onChange={(e) => setMatrixDescription({...matrixDescription, organicMatter: e.target.value})}
  
            >
              <MenuItem value={"alto"}>Alto</MenuItem>
              <MenuItem value={"medio"}>Medio</MenuItem>
              <MenuItem value={"bajo"}>Bajo</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              required
              id="humedad"
              select
              label="Humedad"
              fullWidth
              variant="standard"
              value={matrixDescription.humidity}
              onChange={(e) => setMatrixDescription({...matrixDescription, humidity: e.target.value})}
  
            >
              <MenuItem value={"muy_humeda"}>Muy Húmeda</MenuItem>
              <MenuItem value={"humeda"}>Húmeda</MenuItem>
              <MenuItem value={"ligeramente"}>Ligeramente</MenuItem>
              <MenuItem value={"sin_humedad"}>Sin Humedad</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <h4>Obersvaciones de la Matriz / Descripción del Rasgo:</h4>
            <textarea
              disabled={!edit}
              name="observaciones_matriz"
              rows="4"
              cols="50"
              value={matrixDescription.observations}
              onChange={(e) => setMatrixDescription({...matrixDescription, observations: e.target.value})}
  
              
            ></textarea>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default MatrixDescription;

