import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
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
    const { isConnected } = this.state;
    return (
      <>
      {isConnected && (
        <Paper className="home">
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <h2 className="title">Welcome to your dashboard, {localStorage.getItem('username')}</h2>
            <Grid className="panelsgrid">
              <div className={this.props.classes.root+" categories"}>User Panel</div>
              <Grid item className="panels">
                <Panels type="user"/>
              </Grid>
              <div className={this.props.classes.root+" categories"}>Projects Panel</div>
              <Grid item className="panels">
                <Panels type="projects"/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Paper>
      )}
      </>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
