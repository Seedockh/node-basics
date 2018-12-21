import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
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
    nickname: localStorage.username,
    email: localStorage.usermail,
  }

  listenStorage = () => {
    this.setState({ nickname: localStorage.username, email: localStorage.usermail});
  }

  changePassword = () => {
    this.setState({ isConnected: false });
    this.props.changePassword();
  }

  deleteUser = async () => {
    const { uuid, token } = await localStorage;
    const response = await fetch("http://localhost:4242/api/users/delete/"+uuid, {
      headers: {
        "Authorization": 'Bearer '+token,
        "Content-Type": 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({token}),
    });

    const json = await response.json();
    if(json.error) {
      console.log(json.error);
      return this.setState({ open_snack: true, variant:"error", msg: json.error});
    } else {
      localStorage.clear();
      this.setState({ open_snack: true, variant:"success", msg: "User deleted successfully."});
      this.props.changePassword();
    }
  }

  render() {
    const { isConnected, nickname } = this.state;
    const { getProjects, projects, projects_loaded } = this.props;
    return (
      <>
      {!isConnected && (
        <Redirect to="/" />
      )}
      {isConnected && (
        <Paper className="home">
        <Grid container direction="column" spacing={16}>
          <Grid item className="dashboard">
            <Typography variant="overline" gutterBottom className="title">
              DASHBOARD ~ {nickname.toUpperCase()}
            </Typography>
            <Grid className="panelsgrid">
              <div className={this.props.classes.root+" categories"}>Projects Panel</div>
              <Grid item className="panels">
                <Panels type="projects" getProjects={getProjects} projects={projects} projects_loaded={projects_loaded}/>
              </Grid>
              <div className={this.props.classes.root+" categories"}>User Panel</div>
              <Grid item className="panels">
                <Panels type="user" userupdate={this.listenStorage} changePassword={this.changePassword} deleteUser={this.deleteUser}/>
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
