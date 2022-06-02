import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "react-datepicker/dist/react-datepicker.css";


function MaterialDescription({ materialDescription, setMaterialDescription, edit}) {
    
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Descripción de Materiales. Tipo y Cantidad
        </Typography>
  
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="loza"
            name="Loza"
            label="Loza"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.crockery}
            onChange={(e) => setMaterialDescription({...materialDescription, crockery: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="metal"
            name="metal"
            label="Metal"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.metal}
            onChange={(e) => setMaterialDescription({...materialDescription, metal: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}
            id="ceramica"
            name="cerámica"
            label="Cerámica"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.ceramic}
            onChange={(e) => setMaterialDescription({...materialDescription, ceramic: e.target.value})}
  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!edit}  
            id="vidrio"
            name="vidrio"
            label="Vidrio"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            type="number"
            value={materialDescription.glass}
            onChange={(e) => setMaterialDescription({...materialDescription, glass: e.target.value})}
  
          />
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!edit}
              id="litico"
              name="litico"
              label="Lítico"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              type="number"
              value={materialDescription.lithic}
              onChange={(e) => setMaterialDescription({...materialDescription, lithic: e.target.value})}
  
            />
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="cuero"
                name="cuero"
                label="Cuero"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.leather}
                onChange={(e) => setMaterialDescription({...materialDescription, leather: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="textil"
                name="textil"
                label="Textil"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.textile}
                onChange={(e) => setMaterialDescription({...materialDescription, textile: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="osteofauna"
                name="osteofauna"
                label="Osteofauna"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.animalBones}
                onChange={(e) => setMaterialDescription({...materialDescription, animalBones: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="madera"
                name="madera"
                label="Madera"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.wood}
                onChange={(e) => setMaterialDescription({...materialDescription, wood: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="bioantropologico"
                name="bioantropologico"
                label="Bioantropológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.bioAntro}
                onChange={(e) => setMaterialDescription({...materialDescription, bioAntro: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="arqueobotanico"
                name="arqueobotanico"
                label="Arqueobotánico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.archeoBotanical}
                onChange={(e) => setMaterialDescription({...materialDescription, archeoBotanical: e.target.value})}
  
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                id="malacologico"
                name="malacologico"
                label="Malacológico"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.malacological}
                onChange={(e) => setMaterialDescription({...materialDescription, malacological: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={!edit}
                required
                id="total"
                name="total"
                label="Numero Total de Materiales"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                type="number"
                value={materialDescription.totalNumber}
                onChange={(e) => setMaterialDescription({...materialDescription, totalNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <h4>Obersvaciones de los materiales:</h4>
              <textarea
                disabled={!edit}
                name="observaciones_materiales"
                rows="4"
                cols="50"
                value={materialDescription.observations}
                onChange={(e) => setMaterialDescription({...materialDescription, observations: e.target.value})}
              ></textarea>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

export default MaterialDescription;