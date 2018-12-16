import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

class App extends Component {
  state = {
    user: localStorage.getItem('user')||null,
    isConnected: localStorage.getItem('token') ? true : false,
    open_signin: false,
    open_signup: false,
  };

  handleUser = user => {
    this.setState({ user, isConnected: true });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ isConnected: false });
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

  render() {
    const { isConnected, open_signin, open_signup } = this.state;
    console.log("isConnected : "+isConnected);
    return (
      <Router>
        <>
          <div className="App-menu">
              <AppBar position="static">
                <Toolbar>
                  <IconButton className="menuButton" color="inherit" aria-label="Menu">
                    <Link to="/" className="App-menu"><MenuIcon /></Link>
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
              component={() => <Dashboard nickname={localStorage.getItem("username")} isConnected={isConnected}/>}
            />
          )}
          {!isConnected && (window.location.href!=="http://localhost:3000/") && (
            <Redirect to="/" />
          )}
          {open_signin && (
            <SignIn connect={this.handleUser} open={open_signin} close={this.handleClose}/>
          )}
          {open_signup && (
            <SignUp open={open_signup} close={this.handleClose}/>
          )}
        </>
      </Router>
    );
  }
}

export default App;
