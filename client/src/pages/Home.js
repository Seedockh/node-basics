import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./Home.css";

const Home = () => (
  <div className="home">
  <Paper className="paper">
    <Grid container direction="column" spacing={16}>
      <Grid item>
        <Typography gutterBottom variant="h5">Home</Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="subtitle1">Hello, world</Typography>
      </Grid>
    </Grid>
  </Paper>
  </div>
);

export default Home;
