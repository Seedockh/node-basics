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
    allProjects: [],
    allProjects_loaded: false,
    isConnected: localStorage.token ? true : false,
    open_signin: false,
    open_signup: false,
    open_snack_login: false,
    open_snack_logout: false,
    open_snack_register: false,
  };

  handleLogin = async user => {
    await this.setState({ user, isConnected: true, open_snack_login: true });
    await this.getAllProjects();
    await this.getProjects();
  };

  handleRegister = user => {
    this.setState({ user, open_snack_register: true });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isConnected: false, open_snack_logout:true, projects_loaded: false, allProjects_loaded: false, projects: [], allProjects: [] });
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
    const { uuid, token } = localStorage;
    if (this.state.isConnected && localStorage.token) {
      const response = await fetch("http://localhost:4242/api/projects/", {
        headers: {
          "Authorization": 'Bearer '+token,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({uuid, token}),
      });

      const json = await response.json();

      if (json.error) {
        return this.setState({ open_snack: true, variant:"error", msg: json.error });
      } else {
        this.setState({ projects_loaded: true, projects: json.data });
        this.getAllProjects();
      }
    }
  }

  getAllProjects = async () => {
    if (this.state.isConnected && localStorage.token) {
      const { token } = localStorage;
      const response = await fetch("http://localhost:4242/api/projects/", {
        headers: {
          "Authorization": 'Bearer '+token,
          "Content-Type": "application/json"
        },
        method: "GET",
      });

      const json = await response.json();
      if (json.error) {
        return this.setState({ open_snack: true, variant:"error", msg: json.error });
      } else {
        this.setState({ allProjects_loaded: true, allProjects: json.data });
      }
    }
  }

  render() {

    const { isConnected, open_signin, open_signup, projects, projects_loaded, allProjects, allProjects_loaded,
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
            <Route exact path="/" component={() => <Home allProjects={allProjects} allProjects_loaded={allProjects_loaded} getAllProjects={this.getAllProjects} isConnected={isConnected}/>} />
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
              <SignIn connect={this.handleLogin} open={open_signin} close={this.handleClose} getProjects/>
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
