import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import Panels from './Panels';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
    nickname: localStorage.getItem('username'),
    email: localStorage.getItem('usermail'),
  }

  listenStorage = () => {
    this.setState({ nickname: localStorage.getItem('username'), email: localStorage.getItem('usermail')});
    /*&& (window.location.href!=="http://localhost:3000/")*/
  }

  render() {
    const { isConnected, nickname } = this.state;
    return (
      <>
      {!isConnected && (
        <Redirect to="/" />
      )}
      {isConnected && (
        <Paper className="home">
        <Grid container direction="column" spacing={16}>
          <Grid item className="dashboard">
            <h2 className="title">Welcome to your dashboard, {nickname}</h2>
            <Grid className="panelsgrid">
              <div className={this.props.classes.root+" categories"}>User Panel</div>
              <Grid item className="panels">
                <Panels type="user" userupdate={this.listenStorage}/>
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
