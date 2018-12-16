import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Route, Redirect } from "react-router-dom";

export default class Dashboard extends Component {
  state = {
    isConnected: this.props.isConnected,
    nickname: this.props.nickname,
  }

  render() {
    const { nickname, isConnected } = this.state;
    return (
          <Route
            render={() =>
              isConnected ? (
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
              ) : (
                <Redirect
                  to={{ pathname: "/" }}
                />
              )
            }
          />
    )
  }
}
