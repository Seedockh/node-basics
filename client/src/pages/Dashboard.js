import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Dashboard = ({ nickname }) => (
  <div className="home">
  <Paper className="paper" xs={6}>
    <Grid container direction="column" spacing={16}>
      <Grid item>
        <Typography gutterBottom variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="subtitle1">Hello, {nickname}</Typography>
      </Grid>
    </Grid>
  </Paper>
  </div>
);

export default Dashboard;
