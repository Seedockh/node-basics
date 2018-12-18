import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { Home as HomeIcon } from '@material-ui/icons';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Snackbar from "./pages/Snackbar";

import "./App.css";

class App extends Component {
  state = {
    user: null,
    isConnected: localStorage.getItem('token') ? true : false,
    open_signin: false,
    open_signup: false,
    open_snack_login: false,
    open_snack_logout: false,
    open_snack_register: false,
  };

  handleLogin = user => {
    this.setState({ user, isConnected: true, open_snack_login: true });
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

  render() {
    const { isConnected, open_signin, open_signup,
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
          <Route exact path="/" component={Home} />
          {isConnected && (
              <Route
                path="/dashboard"
                component={() => <Dashboard isConnected={isConnected}/>}
              />
          )}
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
