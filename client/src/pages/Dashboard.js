import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Panels from './Panels';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Dashboard.css';

const styles = theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.teal,
    padding: theme.spacing.unit,
  },
});

class Dashboard extends Component {
  state = {
    isConnected: this.props.isConnected,
    nickname: localStorage.getItem("username"),
  }

  render() {
    const { nickname, isConnected } = this.state;
    return (
        <div className="home">
          <Grid container direction="column" spacing={16}>
            <Grid item>
              <Typography className="title" gutterBottom variant="h4">Dashboard</Typography>
              <Grid className="panelsgrid">
                <div className={this.props.classes.root+" categories"}>User Panel</div>
                <Grid item className="panels">
                  <Panels />
                </Grid>
                <div className={this.props.classes.root+" categories"}>Projects Panel</div>
                <Grid item className="panels">
                  <Panels />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
