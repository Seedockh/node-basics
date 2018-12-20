import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { Home as HomeIcon } from '@material-ui/icons';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Snackbar from "./components/Snackbar";

import "./App.css";

class App extends Component {
  state = {
    user: null,
    projects: [],
    projects_loaded: false,
    isConnected: localStorage.getItem('token') ? true : false,
    open_signin: false,
    open_signup: false,
    open_snack_login: false,
    open_snack_logout: false,
    open_snack_register: false,
  };

  handleLogin = user => {
    this.setState({ user, isConnected: true, open_snack_login: true });
    this.getProjects();
  };

  handleRegister = user => {
    this.setState({ user, open_snack_register: true });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isConnected: false, open_snack_logout:true });
  }

  handleOpenSignIn = () => {
    this.setState({ open_signin: true });
  }
  handleOpenSignUp = () => {
    this.setState({ open_signup: true });
  }
  handleClose = () => {
    this.setState({ open_signin: false, open_signup: false });
  }
  handleCloseSnack = () => {
    this.setState({ open_snack_login: false, open_snack_logout: false, open_snack_register: false });
  }

  getProjects = async () => {
    const uuid = localStorage.getItem('uuid');
    const token = localStorage.getItem('token');

    const response = await fetch("http://localhost:4242/api/projects/", {
      headers: {
        "Authorization": 'Bearer '+token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({uuid, token}),
    });

    console.log("response :");
    console.log(response);

    const json = await response;
    console.log(response); return;
    if (json.error) {
      return this.setState({ open_snack: true, variant:"error", msg: json.error });
    } else {
      this.setState({ projects_loaded: true, projects: json.data });
      console.log("update projects : "); console.log(this.state.projects);
      return this.state.projects;
    }
  }

  render() {
    const { isConnected, open_signin, open_signup, projects, projects_loaded,
            open_snack_login, open_snack_logout, open_snack_register } = this.state;
    return (
      <Router>
        <>
          <div className="App-menu">
              <AppBar position="fixed">
                <Toolbar>
                  <IconButton className="menuButton" color="inherit" aria-label="Menu">
                    <Link to="/" className="App-menu"><HomeIcon /></Link>
                  </IconButton>
                  <div className="barbuttons">
                  {!isConnected && (
                  <>
                    <Button color="inherit" onClick={this.handleOpenSignIn}>Login</Button>
                    <Button color="inherit" onClick={this.handleOpenSignUp}>Register</Button>
                  </>
                  )}
                  {isConnected && (
                  <>
                    <Link to="/dashboard" className="App-menu">
                      <Button color="inherit">Dashboard</Button>
                    </Link>
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                  </>
                  )}
                  </div>
                </Toolbar>
              </AppBar>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={() => <Dashboard isConnected={isConnected} getProjects={this.getProjects} changePassword={this.handleLogout} projects={projects} projects_loaded={projects_loaded}/>} />
          </Switch>
            {open_snack_login && (
              <Snackbar variant="success"
                        message="Successfully logged in !"
                        open={open_snack_login}
                        onClose={this.handleCloseSnack}/>
            )}
            {open_snack_logout && (
              <Snackbar variant="warning"
                        message="Logged out"
                        open={open_snack_logout}
                        onClose={this.handleCloseSnack}/>
            )}
            {open_snack_register && (
              <Snackbar variant="success"
                        message="User successfully created."
                        open={open_snack_register}
                        onClose={this.handleCloseSnack}/>
            )}
            {open_signin && (
              <SignIn connect={this.handleLogin} open={open_signin} close={this.handleClose}/>
            )}
            {open_signup && (
              <SignUp register={this.handleRegister} open={open_signup} close={this.handleClose}/>
            )}
        </>
      </Router>
    );
  }
}

export default App;
